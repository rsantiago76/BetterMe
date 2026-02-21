# BetterMe - Complete User Journey

## 🎯 User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOMEPAGE (/)                             │
│                                                                  │
│  ┌──────────┐                              ┌──────────────────┐ │
│  │  LOGO    │    Training | Nutrition...   │ Sign In | Start │ │
│  └──────────┘                              └──────────────────┘ │
│                                                       ▼          │
│                                        ┌─────────────────────┐  │
│                                        │  Not Logged In?     │  │
│                                        │  Click "Sign In"    │  │
│                                        └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       LOGIN PAGE (/login)                        │
│                                                                  │
│     ┌────────────────────────────────────────────────┐         │
│     │  Email:    [user@example.com          ]       │         │
│     │  Password: [••••••••••                ]       │         │
│     │                                               │         │
│     │         [ Sign In ]                           │         │
│     │                                               │         │
│     │  Don't have account? → Create Account        │         │
│     └────────────────────────────────────────────────┘         │
│                                                                  │
│  ⚠️ Demo Mode: Backend APIs not connected yet                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD (/dashboard)                        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Welcome back, John Doe!                             │   │
│  │     john@example.com                   [FREE] [Upgrade] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │ 🧮 Macro     │  │ 📅 Weekly    │  │ 📈 Daily         │     │
│  │ Calculator   │  │ Meal Prep    │  │ Planner          │     │
│  │              │  │              │  │                  │     │
│  │ ⚠️ Pro req'd │  │ ⚠️ 1 plan    │  │                  │     │
│  │ to save      │  │ limit (Free) │  │                  │     │
│  └──────────────┘  └──────────────┘  └──────────────────┘     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📋 Your Weekly Plans                     [+ New Plan]  │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                          │   │
│  │  No weekly plans yet                                    │   │
│  │        [ Create Your First Plan ]                       │   │
│  │                                                          │   │
│  │  ⚠️ Free tier limit: You've created 1 plan. Upgrade    │   │
│  │     to Pro for unlimited plans.  [View Pricing]         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PRICING PAGE (/pricing)                      │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │    FREE      │  │     PRO ⭐   │  │     TEAM 👥         │  │
│  │                                                              │
│  │    $0/mo     │  │   $12/mo     │  │     $39/mo           │  │
│  │              │  │              │  │                      │  │
│  │ ✓ Basic      │  │ ✓ Everything │  │ ✓ Everything in Pro │  │
│  │   recipes    │  │   in Free    │  │ ✓ Manage 25 clients │  │
│  │ ✓ Macro      │  │ ✓ Saved      │  │ ✓ Plan assignments  │  │
│  │   estimates  │  │   profiles   │  │ ✓ Client tracking   │  │
│  │ ✓ 1 meal     │  │ ✓ Unlimited  │  │ ✓ Team dashboard    │  │
│  │   plan       │  │   plans      │  │                      │  │
│  │              │  │ ✓ Progress   │  │                      │  │
│  │ [Current]    │  │   tracking   │  │ [Start 14-Day Trial] │  │
│  │              │  │              │  │                      │  │
│  │              │  │ [Start 14-   │  │                      │  │
│  │              │  │  Day Trial]  │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                              │                                  │
│                              │ Click "Start 14-Day Trial"      │
│                              ▼                                  │
│                    ┌─────────────────────┐                     │
│                    │ Loading...          │                     │
│                    │ Creating checkout   │                     │
│                    └─────────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STRIPE CHECKOUT                               │
│                   (stripe.com/checkout)                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  BetterMe Pro Subscription          $12.00/month       │   │
│  │                                                          │   │
│  │  💳 Card Number:  [4242 4242 4242 4242    ]           │   │
│  │     Expiry:       [12/34] CVV: [123]                   │   │
│  │                                                          │   │
│  │  📧 Email:        [john@example.com        ]           │   │
│  │                                                          │   │
│  │  ✓ 14-day free trial                                    │   │
│  │  ✓ Cancel anytime                                       │   │
│  │                                                          │   │
│  │              [ Complete Purchase ]                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       WEBHOOK FIRED                              │
│           (stripe → /api/stripe/webhook)                         │
│                                                                  │
│  1. Stripe sends: customer.subscription.created                 │
│  2. Backend verifies signature                                  │
│  3. Database updated:                                           │
│     - subscription.tier = 'pro'                                 │
│     - subscription.status = 'trialing'                          │
│     - subscription.trial_ends_at = +14 days                     │
│  4. User redirected to: /dashboard?success=true                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              DASHBOARD (NOW WITH PRO ACCESS)                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Welcome back, John Doe!                             │   │
│  │     john@example.com                   [PRO ⭐]         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │ 🧮 Macro     │  │ 📅 Weekly    │  │ 📈 Daily         │     │
│  │ Calculator   │  │ Meal Prep    │  │ Planner          │     │
│  │              │  │              │  │                  │     │
│  │ ✓ Save       │  │ ✓ Unlimited  │  │                  │     │
│  │   profiles   │  │   plans      │  │                  │     │
│  └──────────────┘  └──────────────┘  └──────────────────┘     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📋 Your Weekly Plans                     [+ New Plan]  │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                          │   │
│  │  ✓ 3-Day Push/Pull/Legs         Feb 20, 2026  21 shakes│   │
│  │     [View Details]  [⚙️]                                │   │
│  │                                                          │   │
│  │  ✓ Bulking Phase Week 1         Feb 15, 2026  18 shakes│   │
│  │     [View Details]  [⚙️]                                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Feature Access Matrix

| Feature | Free | Pro | Team |
|---------|------|-----|------|
| **View Content** | ✅ | ✅ | ✅ |
| **Calculate Macros** | ✅ | ✅ | ✅ |
| **Save Macro Profiles** | ❌ | ✅ | ✅ |
| **Create Weekly Plans** | 1 max | ∞ | ∞ |
| **Progress Tracking** | ❌ | ✅ | ✅ |
| **Meal Prep Planner** | Limited | ✅ | ✅ |
| **Manage Clients** | ❌ | ❌ | ✅ (25 max) |
| **Assign Plans** | ❌ | ❌ | ✅ |

---

## 🔄 API Call Flow

### **1. User Registers**

```
Frontend → POST /api/auth/register
          ↓
  {
    email: "john@example.com",
    password: "password123",
    name: "John Doe"
  }
          ↓
Backend:
  - Hash password (bcrypt)
  - Insert into users table
  - Create subscription (tier: 'free')
  - Generate JWT token
          ↓
Frontend ← {
            success: true,
            token: "eyJ...",
            user: { id, email, name, tier: 'free' }
          }
          ↓
Store in localStorage:
  - auth_token
  - user data
          ↓
Navigate to /dashboard
```

### **2. User Upgrades to Pro**

```
Frontend → POST /api/stripe/create-checkout
          ↓
  {
    priceId: "price_pro_monthly",
    successUrl: "/dashboard?success=true",
    cancelUrl: "/pricing?canceled=true"
  }
          ↓
Backend:
  - Verify JWT
  - Get/create Stripe customer
  - Create checkout session
          ↓
Frontend ← {
            success: true,
            url: "https://checkout.stripe.com/..."
          }
          ↓
Redirect to Stripe
          ↓
User enters payment info
          ↓
Stripe → POST /api/stripe/webhook
        ↓
    {
      type: "customer.subscription.created",
      data: { subscription details }
    }
          ↓
Backend:
  - Verify signature
  - Update subscriptions table:
    * tier = 'pro'
    * status = 'trialing'
    * trial_ends_at = +14 days
          ↓
User redirected to /dashboard?success=true
```

### **3. User Creates Weekly Plan**

```
Frontend → POST /api/plans/weekly
          ↓
  {
    name: "3-Day PPL",
    trainingSchedule: "classic_3day",
    trainingDays: ["monday", "wednesday", "friday"]
  }
          ↓
Backend:
  - Verify JWT
  - Check tier:
    * Free: planCount < 1 ? allow : deny
    * Pro: allow
  - Generate meal plan (nutrition engine)
  - Generate shopping list
  - Insert into weekly_plans table
          ↓
Frontend ← {
            success: true,
            planId: "uuid...",
            plan: { ... }
          }
          ↓
Refresh plans list on dashboard
```

---

## 🎨 UI States

### **Header - Logged Out**
```
┌──────────────────────────────────────────────────┐
│ LOGO    Training | Nutrition...   [Sign In] [Get Started] │
└──────────────────────────────────────────────────┘
```

### **Header - Logged In**
```
┌──────────────────────────────────────────────────┐
│ LOGO    Training | Nutrition...   Hi, John  [Dashboard] │
└──────────────────────────────────────────────────┘
```

### **Dashboard - Free Tier**
```
┌─────────────────────────────────────────────────┐
│ Welcome back, John!                    [FREE]  │
│                                                 │
│ ⚠️ Macro Calculator: Pro required to save      │
│ ⚠️ Weekly Plans: 1 plan limit reached          │
│                                                 │
│ [ Upgrade to Pro ]                             │
└─────────────────────────────────────────────────┘
```

### **Dashboard - Pro Tier**
```
┌─────────────────────────────────────────────────┐
│ Welcome back, John!                  [PRO ⭐]  │
│                                                 │
│ ✓ Macro Calculator: Save unlimited profiles    │
│ ✓ Weekly Plans: Unlimited                      │
│                                                 │
│ Plans (3):                                     │
│   - 3-Day PPL                [View] [⚙️]      │
│   - Bulking Phase            [View] [⚙️]      │
│   - Cutting Protocol         [View] [⚙️]      │
└─────────────────────────────────────────────────┘
```

---

## 🚦 Demo vs Production Modes

### **Demo Mode (Current)**

**What You See:**
- ✅ Full UI with all pages
- ✅ Login/register forms
- ✅ Dashboard layout
- ✅ Pricing with Stripe buttons
- ⚠️ Yellow "Demo Mode" notices

**What Happens:**
- Login → Stores in localStorage (no database)
- Create plan → Saves to localStorage (no sync)
- Click "Upgrade" → Shows alert (no Stripe)

**Notice on Every Protected Page:**
```
┌─────────────────────────────────────────────────┐
│ ⚠️ Demo Mode: Backend APIs not connected yet   │
│                                                 │
│ See DEPLOYMENT.md to connect:                  │
│ • Neon database                                │
│ • Stripe payments                              │
│ • Environment variables                        │
└─────────────────────────────────────────────────┘
```

### **Production Mode (After Setup)**

**What You See:**
- ✅ Same UI (no notices)
- ✅ Real authentication
- ✅ Persistent data
- ✅ Working payments

**What Happens:**
- Login → JWT token from backend
- Create plan → Saved to PostgreSQL
- Click "Upgrade" → Redirects to Stripe Checkout
- After payment → Tier unlocked via webhook

---

## 🎯 Success Criteria

### **User Can:**
✅ Visit homepage and see dynamic header  
✅ Click "Get Started" → Register account  
✅ Login with email/password  
✅ View dashboard with user info  
✅ See tier badge (Free/Pro/Team)  
✅ Click "Upgrade to Pro" → Go to pricing  
✅ See tier limits enforced (1 plan max, no save)  
✅ Click "Start 14-Day Trial" → Create Stripe session  
✅ Create weekly meal prep plans  
✅ View saved plans on dashboard  
✅ Logout and login again  

### **Admin Can:**
✅ Deploy to Vercel with one command  
✅ Connect Neon database  
✅ Set up Stripe products  
✅ Configure webhooks  
✅ Monitor user subscriptions  
✅ View logs and errors  

---

## 📊 Metrics & Monitoring

### **User Journey Metrics**

| Step | Metric | Tool |
|------|--------|------|
| Homepage visit | Page views | Vercel Analytics |
| Sign up | Registration rate | Database query |
| First plan | Activation rate | Database query |
| Upgrade | Conversion rate | Stripe dashboard |
| Weekly retention | Active users | Database query |

### **Database Queries**

```sql
-- Total users
SELECT COUNT(*) FROM users;

-- Pro users
SELECT COUNT(*) FROM subscriptions WHERE tier = 'pro' AND status = 'active';

-- Weekly plan count
SELECT COUNT(*) FROM weekly_plans;

-- Conversion rate
SELECT 
  (SELECT COUNT(*) FROM subscriptions WHERE tier IN ('pro', 'team')) * 100.0 / 
  (SELECT COUNT(*) FROM users) AS conversion_rate;
```

---

## 🔧 Troubleshooting User Issues

### **"Can't save macro profile"**
```
Issue: User on free tier trying to save
Solution: Check user.tier === 'pro' or 'team'
Fix: Direct to /pricing page
```

### **"Can't create second plan"**
```
Issue: Free tier limit reached
Solution: Count weekly_plans WHERE user_id = X
Fix: Show upgrade modal with tier comparison
```

### **"Payment not processing"**
```
Issue: Stripe webhook not received
Solution: 
  1. Check webhook endpoint is live
  2. Verify signing secret
  3. Check Stripe dashboard → Webhooks → Events
Fix: Resend webhook event manually
```

### **"Still on free tier after payment"**
```
Issue: Webhook didn't update database
Solution:
  1. Check subscriptions table for user
  2. Verify stripe_subscription_id matches
  3. Look at webhook logs in Vercel
Fix: Manually update tier or resend webhook
```

---

## 📞 Support Flow

```
User has issue
     ↓
Check dashboard tier badge
     ↓
Verify in database:
  SELECT * FROM subscriptions WHERE user_id = 'X';
     ↓
Check Stripe dashboard:
  Customer → Subscriptions → Status
     ↓
Check Vercel logs:
  vercel logs --function api/stripe/webhook
     ↓
Resolve issue:
  - Resend webhook
  - Manual database update
  - Refund if needed
```

---

## 🎉 Success! All Features Live

Visit the site and you'll see:

1. **Homepage** with dynamic "Sign In / Dashboard" header
2. **Login/Register** pages with working forms
3. **Dashboard** showing user info and plans
4. **Pricing** page with Stripe integration
5. **Tier enforcement** on all protected features
6. **Demo notices** explaining how to connect backend

**Ready for production deployment!** 🚀
