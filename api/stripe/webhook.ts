/**
 * POST /api/stripe/webhook
 * 
 * Handle Stripe webhook events for subscription lifecycle
 * 
 * Events handled:
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.payment_succeeded
 * - invoice.payment_failed
 * 
 * IMPORTANT: Configure webhook in Stripe dashboard:
 * https://dashboard.stripe.com/webhooks
 * 
 * Endpoint URL: https://your-app.vercel.app/api/stripe/webhook
 * 
 * Required env vars:
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { query, queryOne } from '../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to get raw body for signature verification
  },
};

/**
 * Read raw body as buffer
 */
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  
  return new Promise((resolve, reject) => {
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'] as string;
    
    if (!sig) {
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }
    
    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
        
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return 200 to acknowledge receipt
    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Handle subscription created/updated
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;
  
  // Determine tier from price ID
  const tier = getTierFromPriceId(priceId);
  
  // Find user by Stripe customer ID
  const user = await queryOne(`
    SELECT u.id
    FROM users u
    JOIN subscriptions s ON s.user_id = u.id
    WHERE s.stripe_customer_id = $1
  `, [customerId]);
  
  if (!user) {
    console.error('User not found for customer:', customerId);
    return;
  }
  
  // Upsert subscription
  await query(`
    INSERT INTO subscriptions (
      user_id, tier, status, stripe_customer_id, 
      stripe_subscription_id, stripe_price_id,
      current_period_start, current_period_end,
      cancel_at_period_end, trial_ends_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (user_id)
    DO UPDATE SET
      tier = $2,
      status = $3,
      stripe_subscription_id = $5,
      stripe_price_id = $6,
      current_period_start = $7,
      current_period_end = $8,
      cancel_at_period_end = $9,
      trial_ends_at = $10,
      updated_at = NOW()
  `, [
    user.id,
    tier,
    status,
    customerId,
    subscriptionId,
    priceId,
    new Date(subscription.current_period_start * 1000),
    new Date(subscription.current_period_end * 1000),
    subscription.cancel_at_period_end,
    subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
  ]);
  
  console.log(`Subscription ${subscriptionId} updated for user ${user.id}: ${tier} - ${status}`);
}

/**
 * Handle subscription deleted (canceled)
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Update subscription status to canceled
  await query(`
    UPDATE subscriptions
    SET status = 'canceled', tier = 'free', updated_at = NOW()
    WHERE stripe_customer_id = $1
  `, [customerId]);
  
  console.log(`Subscription canceled for customer ${customerId}`);
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;
  
  // Update subscription status to active
  await query(`
    UPDATE subscriptions
    SET status = 'active', updated_at = NOW()
    WHERE stripe_customer_id = $1 AND stripe_subscription_id = $2
  `, [customerId, subscriptionId]);
  
  console.log(`Payment succeeded for customer ${customerId}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;
  
  // Update subscription status to past_due
  await query(`
    UPDATE subscriptions
    SET status = 'past_due', updated_at = NOW()
    WHERE stripe_customer_id = $1 AND stripe_subscription_id = $2
  `, [customerId, subscriptionId]);
  
  console.log(`Payment failed for customer ${customerId}`);
  
  // TODO: Send email notification to user about failed payment
}

/**
 * Map Stripe price ID to subscription tier
 */
function getTierFromPriceId(priceId: string): 'free' | 'pro' | 'team' {
  // Match against your actual Stripe price IDs
  if (priceId.includes('pro')) {
    return 'pro';
  }
  if (priceId.includes('team')) {
    return 'team';
  }
  return 'free';
}
