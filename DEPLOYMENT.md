# BetterMe - Vercel Deployment Guide

## Architecture Overview

**Frontend**: Vite + React SPA  
**Backend**: Vercel Serverless Functions  
**Database**: Neon Postgres (or Supabase/PlanetScale)  
**Payments**: Stripe  
**Hosting**: Vercel

---

## Built With

### Core Technologies

**React + TypeScript**
- Modern React 18 with hooks
- Full TypeScript type safety
- Vite for blazing-fast development
- React Router for client-side routing
- Tailwind CSS v4 for styling

### Custom Engines

**Nutrition Timing Engine**
- Smart shake timing based on training schedule
- Pre-workout, intra-workout, post-workout optimization
- Rest day vs training day macro adjustments
- Protein distribution across 24-hour period

**Workout Programming Logic**
- Training split presets (3-Day, 4-Day, 6-Day PPL)
- Progressive overload tracking
- Volume and frequency calculations
- Recovery period optimization

**Structured Meal Planner**
- Weekly meal prep automation
- Ingredient aggregation and categorization
- Shopping list generation with quantities
- Macro tracking per day/meal
- Training schedule integration

### Backend Infrastructure

**Vercel Serverless Functions**
- RESTful API design
- JWT authentication
- PostgreSQL database integration
- Stripe payment processing
- Webhook event handling

**Database Design**
- Relational schema with 8+ tables
- JSONB for flexible data storage
- Optimized indexes for performance
- Automatic timestamps and triggers

---

## 1. Database Setup (Neon)

### Create Database

1. Go to [neon.tech](https://neon.tech)
2. Sign up for free tier
3. Create new project: **"betterme-db"**
4. Copy connection string (looks like):
   ```
   postgresql://user:password@ep-...-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Run Schema Migration

```bash
# Install Postgres client (if needed)
brew install postgresql  # macOS
# or
sudo apt-get install postgresql-client  # Ubuntu

# Connect to database
psql "postgresql://user:password@host/database?sslmode=require"

# Run schema
\i api/lib/schema.sql

# Verify tables
\dt
```

**Alternative: Using a migration tool**

```bash
# Install node-pg-migrate
pnpm add -D node-pg-migrate

# Create migration
pnpm run migrate create init-schema

# Run migrations
pnpm run migrate up
```

---

## 2. Stripe Setup

### Create Stripe Account

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get API keys from **Developers → API Keys**
3. Copy:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Create Products & Prices

**Via Dashboard:**

1. Go to **Products → Add Product**
2. Create:

   **Pro Plan**
   - Name: `Pro`
   - Monthly price: `$12/month`
   - Annual price: `$120/year`
   - Copy Price IDs: `price_pro_monthly`, `price_pro_annual`

   **Team Plan**
   - Name: `Team`
   - Monthly price: `$39/month`
   - Annual price: `$390/year`
   - Copy Price IDs: `price_team_monthly`, `price_team_annual`

**Via API (recommended):**

```bash
# Create products programmatically
curl https://api.stripe.com/v1/products \
  -u sk_test_...: \
  -d name="Pro" \
  -d description="Pro plan for serious athletes"

# Create monthly price
curl https://api.stripe.com/v1/prices \
  -u sk_test_...: \
  -d product=prod_... \
  -d unit_amount=1200 \
  -d currency=usd \
  -d "recurring[interval]"=month
```

### Configure Webhooks

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy **Signing secret**: `whsec_...`

---

## 3. Environment Variables

### Local Development (`.env.local`)

```bash
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key-min-32-chars-long

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend needs this
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Vercel Production

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Add environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
```

**Or via Vercel Dashboard:**

1. Go to project settings
2. Navigate to **Environment Variables**
3. Add each variable for:
   - Production
   - Preview
   - Development

---

## 4. Deploy to Vercel

### Option 1: CLI Deployment

```bash
# Install dependencies
pnpm install

# Build locally (test)
pnpm run build

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
5. Add environment variables
6. Click **Deploy**

**Automatic Deployments:**
- Push to `main` → Production deployment
- Push to feature branch → Preview deployment
- Pull request → Automatic preview URL

---

## 5. Required Dependencies

```bash
# Install all dependencies
pnpm install

# Backend dependencies (for /api functions)
pnpm add pg @vercel/node stripe jose bcryptjs

# TypeScript types
pnpm add -D @types/pg @types/bcryptjs
```

Update `package.json`:

```json
{
  "dependencies": {
    "pg": "^8.11.3",
    "stripe": "^14.10.0",
    "jose": "^5.2.0",
    "bcryptjs": "^2.4.3",
    "@vercel/node": "^3.0.12"
  },
  "devDependencies": {
    "@types/pg": "^8.10.9",
    "@types/bcryptjs": "^2.4.6"
  }
}
```

---

## 6. API Endpoints Reference

### Authentication

```bash
# Register
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Macro Calculator

```bash
# Calculate macros
POST /api/macros/calculate
Authorization: Bearer <token>
{
  "profile": {
    "age": 28,
    "gender": "male",
    "weight_lbs": 185,
    "height_inches": 72,
    "activity_level": "moderately_active",
    "goal": "bulking"
  },
  "saveProfile": true,
  "profileName": "My Profile"
}
```

### Weekly Plans

```bash
# List plans
GET /api/plans/weekly
Authorization: Bearer <token>

# Create plan
POST /api/plans/weekly
Authorization: Bearer <token>
{
  "name": "My 3-Day Plan",
  "trainingSchedule": "classic_3day",
  "trainingDays": ["monday", "wednesday", "friday"]
}

# Get specific plan
GET /api/plans/weekly?id=<plan_id>
Authorization: Bearer <token>

# Update plan
PUT /api/plans/weekly?id=<plan_id>
Authorization: Bearer <token>
{
  "name": "Updated Plan",
  "trainingDays": ["monday", "tuesday", "thursday"]
}

# Delete plan
DELETE /api/plans/weekly?id=<plan_id>
Authorization: Bearer <token>
```

### Stripe

```bash
# Create checkout session
POST /api/stripe/create-checkout
Authorization: Bearer <token>
{
  "priceId": "price_pro_monthly",
  "successUrl": "https://app.com/dashboard?success=true",
  "cancelUrl": "https://app.com/pricing?canceled=true"
}

# Webhook (handled by Stripe)
POST /api/stripe/webhook
Stripe-Signature: <signature>
<Stripe event payload>
```

---

## 7. Testing Webhooks Locally

### Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login
stripe login
```

### Forward Webhooks

```bash
# Forward Stripe webhooks to local dev server
stripe listen --forward-to localhost:5173/api/stripe/webhook

# Copy webhook secret (whsec_...) to .env.local
```

### Trigger Test Events

```bash
# Test subscription created
stripe trigger customer.subscription.created

# Test payment succeeded
stripe trigger invoice.payment_succeeded

# Test payment failed
stripe trigger invoice.payment_failed
```

---

## 8. Database Migrations

### Using node-pg-migrate

Create `migrations/` folder and add to `package.json`:

```json
{
  "scripts": {
    "migrate:create": "node-pg-migrate create",
    "migrate:up": "node-pg-migrate up",
    "migrate:down": "node-pg-migrate down"
  }
}
```

**Create migration:**

```bash
pnpm run migrate:create add-user-profiles-table
```

**Run migrations:**

```bash
DATABASE_URL="postgresql://..." pnpm run migrate:up
```

---

## 9. Frontend Integration

### Update API calls in components

```tsx
import { apiClient } from '@/lib/api-client';

// Login
const user = await apiClient.login('user@example.com', 'password');

// Calculate macros (with save)
const result = await apiClient.calculateMacros(
  { age: 28, gender: 'male', ... },
  true,  // saveProfile
  'My Profile'
);

// Create weekly plan
const plan = await apiClient.createWeeklyPlan({
  name: 'My Plan',
  trainingSchedule: 'classic_3day',
  trainingDays: ['monday', 'wednesday', 'friday'],
});

// Stripe checkout
const { url } = await apiClient.createCheckoutSession('price_pro_monthly');
window.location.href = url;
```

---

## 10. Production Checklist

- [ ] Database created and schema applied
- [ ] Stripe products and prices created
- [ ] Stripe webhook endpoint configured
- [ ] All environment variables set in Vercel
- [ ] JWT secret is strong (32+ chars)
- [ ] CORS headers configured
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Vercel Analytics)
- [ ] Email service configured (Resend/SendGrid)
- [ ] Rate limiting on auth endpoints
- [ ] SQL injection protection (parameterized queries ✅)
- [ ] XSS protection (React ✅)
- [ ] HTTPS only (Vercel ✅)

---

## 11. Monitoring & Logs

### Vercel Logs

```bash
# View real-time logs
vercel logs --follow

# Filter by function
vercel logs --function api/stripe/webhook
```

### Database Monitoring

```bash
# Neon dashboard
https://console.neon.tech/app/projects/<project-id>

# View active queries
SELECT * FROM pg_stat_activity;

# Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 12. Troubleshooting

### "Database connection failed"

- Check `DATABASE_URL` is correct
- Verify SSL mode: `?sslmode=require`
- Neon requires pooling: use `-pooler` hostname

### "Webhook signature verification failed"

- Check `STRIPE_WEBHOOK_SECRET` is correct
- Use different secrets for local vs production
- Ensure raw body is passed to webhook handler

### "Function timeout"

- Vercel free tier: 10s timeout
- Optimize database queries with indexes
- Use connection pooling (max: 1 for serverless)

### "CORS errors"

- Check `Access-Control-Allow-Origin` headers
- Use `vercel.json` for global CORS config
- Handle OPTIONS preflight requests

---

## 13. Cost Breakdown (Free Tier)

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| **Vercel** | 100GB bandwidth/mo | $20/mo Pro |
| **Neon** | 10GB storage, 100hrs compute | $19/mo |
| **Stripe** | Unlimited test mode | 2.9% + $0.30 per transaction |
| **Resend** | 3,000 emails/mo | $20/mo |

**Total free tier**: $0/mo  
**Total after scaling**: ~$40/mo + transaction fees

---

## Future Enhancements

### Planned Features

**Personalized Macro Calculator**
- Body composition analysis integration
- Adaptive calorie cycling based on progress
- Macro periodization for training phases
- Metabolic adaptation algorithms
- Custom macro ratios for unique goals

**AI Training Program Builder**
- GPT-powered workout generation
- Exercise selection based on equipment availability
- Auto-progression algorithms
- Volume landmarks and deload scheduling
- Injury prevention and mobility work recommendations
- Exercise video library integration

**Wearable Integration**
- Apple Health / Google Fit sync
- Whoop / Oura Ring recovery data
- Sleep quality tracking
- Heart rate variability (HRV) analysis
- Daily readiness scores
- Auto-adjust training intensity based on recovery

**Progress Tracking Dashboard**
- Weight and body composition trends
- Strength progression graphs (1RM estimates)
- Macro adherence charts
- Before/after photo timeline
- Measurement tracking (waist, arms, chest, etc.)
- Weekly/monthly progress reports
- Goal achievement milestones
- Data export (CSV, PDF)

### Technical Roadmap

**Phase 1: Core Enhancement** (Q2 2026)
- Advanced macro calculator with metabolic adaptation
- Progress dashboard with charts (Recharts)
- Photo upload and comparison tool
- Email notifications (Resend)

**Phase 2: Intelligence** (Q3 2026)
- OpenAI integration for AI training programs
- Natural language workout input
- Smart exercise substitutions
- Conversational nutrition coaching

**Phase 3: Integration** (Q4 2026)
- Apple Health Kit / Google Fit APIs
- Wearable device sync (Whoop, Oura, Garmin)
- Real-time recovery metrics
- Automated training adjustments

**Phase 4: Mobile** (2027)
- React Native mobile app
- Offline workout logging
- Push notifications for meal/supplement timing
- Barcode scanner for food tracking
- Apple Watch / Wear OS companion app

### Community Features

**Social & Accountability**
- Client progress sharing (coaches)
- Community challenges and leaderboards
- Workout check-ins with photos
- Forum and Q&A section
- Coach marketplace
- Referral program

**Content & Education**
- Exercise video library
- Nutrition guides and articles
- Training program templates
- Meal prep video tutorials
- Supplement education database
- Scientific research summaries

---

## Next Steps

1. Deploy to Vercel
2. Test Stripe checkout flow
3. Verify webhook handling
4. Add email notifications (Resend)
5. Set up error tracking (Sentry)
6. Enable Vercel Analytics
7. Add rate limiting (Upstash Redis)
8. Implement caching (Vercel KV)

**You now have a production-ready SaaS backend! 🚀**