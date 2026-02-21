/**
 * POST /api/stripe/create-checkout
 * 
 * Create Stripe Checkout session for subscription
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { requireAuth } from '../lib/auth';
import { queryOne, query } from '../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

interface CheckoutRequest {
  priceId: string; // Stripe Price ID (e.g., 'price_pro_monthly')
  successUrl: string;
  cancelUrl: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await requireAuth(req, res);
    if (!user) return;
    
    const { priceId, successUrl, cancelUrl }: CheckoutRequest = req.body;
    
    if (!priceId) {
      return res.status(400).json({ error: 'Price ID required' });
    }
    
    // Get or create Stripe customer
    const subscription = await queryOne(`
      SELECT stripe_customer_id
      FROM subscriptions
      WHERE user_id = $1
    `, [user.userId]);
    
    let customerId = subscription?.stripe_customer_id;
    
    if (!customerId) {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.userId,
        },
      });
      
      customerId = customer.id;
      
      // Save customer ID
      await query(`
        UPDATE subscriptions
        SET stripe_customer_id = $1
        WHERE user_id = $2
      `, [customerId, user.userId]);
    }
    
    // Create Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.headers.origin}/dashboard?success=true`,
      cancel_url: cancelUrl || `${req.headers.origin}/pricing?canceled=true`,
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        metadata: {
          userId: user.userId,
        },
      },
      allow_promotion_codes: true,
    });
    
    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
    
  } catch (error) {
    console.error('Checkout creation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
