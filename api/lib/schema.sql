-- BetterMe Database Schema
-- Compatible with Postgres (Neon, Supabase, Railway, etc.)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT, -- For email/password auth (use bcrypt)
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'coach', 'admin'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL, -- 'free', 'pro', 'team'
  status VARCHAR(50) NOT NULL, -- 'active', 'trialing', 'past_due', 'canceled', 'inactive'
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User profiles (for macro calculator)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  gender VARCHAR(20), -- 'male', 'female', 'other'
  weight_lbs DECIMAL(5, 1),
  height_inches DECIMAL(4, 1),
  activity_level VARCHAR(50), -- 'sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'
  goal VARCHAR(50), -- 'cutting', 'bulking', 'maintenance', 'recomp'
  bmr DECIMAL(6, 1),
  tdee DECIMAL(6, 1),
  target_calories DECIMAL(6, 1),
  target_protein_g DECIMAL(5, 1),
  target_carbs_g DECIMAL(5, 1),
  target_fat_g DECIMAL(5, 1),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Weekly meal prep plans
CREATE TABLE IF NOT EXISTS weekly_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  training_schedule VARCHAR(50) NOT NULL, -- 'classic_3day', 'upper_lower_4day', etc.
  training_days TEXT[], -- Array of days: ['monday', 'wednesday', 'friday']
  plan_data JSONB NOT NULL, -- Full plan object (days, shakes, etc.)
  shopping_list JSONB NOT NULL, -- Shopping list with quantities
  total_shakes INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE IF NOT EXISTS progress_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  weight_lbs DECIMAL(5, 1),
  body_fat_percent DECIMAL(4, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Strength logs
CREATE TABLE IF NOT EXISTS strength_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  exercise VARCHAR(255) NOT NULL,
  weight_lbs DECIMAL(6, 1),
  reps INTEGER,
  sets INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Macro tracking
CREATE TABLE IF NOT EXISTS macro_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  calories DECIMAL(6, 1),
  protein_g DECIMAL(5, 1),
  carbs_g DECIMAL(5, 1),
  fat_g DECIMAL(5, 1),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Client relationships (for coaches)
CREATE TABLE IF NOT EXISTS client_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'paused', 'ended'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(coach_id, client_id)
);

-- Assigned plans (coach → client)
CREATE TABLE IF NOT EXISTS assigned_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  weekly_plan_id UUID REFERENCES weekly_plans(id) ON DELETE SET NULL,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  notes TEXT,
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_weekly_plans_user_id ON weekly_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_logs_user_date ON progress_logs(user_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_strength_logs_user_date ON strength_logs(user_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_macro_logs_user_date ON macro_logs(user_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_client_relationships_coach ON client_relationships(coach_id);
CREATE INDEX IF NOT EXISTS idx_client_relationships_client ON client_relationships(client_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_relationships_updated_at BEFORE UPDATE ON client_relationships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
