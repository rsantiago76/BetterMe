import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { useAuth } from '../../contexts/auth-context';
import { apiClient } from '../../lib/api-client';
import { 
  User, 
  LogOut, 
  Calculator, 
  Calendar, 
  TrendingUp, 
  Crown,
  Zap,
  Plus,
  FileText,
  Settings
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [weeklyPlans, setWeeklyPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadUserData();
  }, [isAuthenticated, navigate]);

  const loadUserData = async () => {
    try {
      // Load user's weekly plans
      const plansData = await apiClient.listWeeklyPlans();
      setWeeklyPlans(plansData.plans || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTierBadge = () => {
    const tierColors = {
      free: 'bg-[#6B7280] text-white',
      pro: 'bg-[#22C55E] text-white',
      team: 'bg-[#F97316] text-white',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${tierColors[user?.tier || 'free']}`}>
        {user?.tier || 'Free'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-[#6B7280]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-[#111827] border-b border-[#6B7280]/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Link to="/" className="text-[#6B7280] hover:text-white transition-colors">
                Home
              </Link>
              <BetterButton variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </BetterButton>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* User Info */}
        <div className="bg-white rounded-lg border border-[#6B7280]/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[#22C55E]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Welcome back, {user?.name}!</h1>
                <p className="text-[#6B7280]">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getTierBadge()}
              {user?.tier === 'free' && (
                <Link to="/pricing">
                  <BetterButton variant="primary" size="sm">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </BetterButton>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/calculator" className="bg-white rounded-lg border border-[#6B7280]/20 p-6 hover:border-[#22C55E] transition-colors group">
            <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#22C55E]/20 transition-colors">
              <Calculator className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-2">Macro Calculator</h3>
            <p className="text-[#6B7280] text-sm">Calculate and save your personalized macros</p>
            {user?.tier === 'free' && (
              <div className="mt-3 text-xs text-[#F97316] flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Pro required to save profiles
              </div>
            )}
          </Link>

          <Link to="/meal-prep" className="bg-white rounded-lg border border-[#6B7280]/20 p-6 hover:border-[#22C55E] transition-colors group">
            <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#22C55E]/20 transition-colors">
              <Calendar className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-2">Weekly Meal Prep</h3>
            <p className="text-[#6B7280] text-sm">Create and manage your meal prep plans</p>
            {user?.tier === 'free' && (
              <div className="mt-3 text-xs text-[#F97316] flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Free tier: 1 plan only
              </div>
            )}
          </Link>

          <Link to="/planner" className="bg-white rounded-lg border border-[#6B7280]/20 p-6 hover:border-[#22C55E] transition-colors group">
            <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#22C55E]/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-2">Daily Planner</h3>
            <p className="text-[#6B7280] text-sm">Plan your training and nutrition day by day</p>
          </Link>
        </div>

        {/* Weekly Plans */}
        <div className="bg-white rounded-lg border border-[#6B7280]/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111827]">Your Weekly Plans</h2>
            <Link to="/meal-prep">
              <BetterButton variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Plan
              </BetterButton>
            </Link>
          </div>

          {weeklyPlans.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-[#6B7280]/50 mx-auto mb-4" />
              <p className="text-[#6B7280] mb-4">No weekly plans yet</p>
              <Link to="/meal-prep">
                <BetterButton variant="outline">Create Your First Plan</BetterButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklyPlans.map((plan) => (
                <div key={plan.id} className="border border-[#6B7280]/20 rounded-lg p-6 hover:border-[#22C55E] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-[#111827]">{plan.name}</h3>
                    <span className="text-xs text-[#6B7280]">
                      {new Date(plan.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-4">
                    <FileText className="w-4 h-4" />
                    {plan.total_shakes || 0} shakes/week
                  </div>
                  <div className="flex gap-2">
                    <BetterButton variant="outline" size="sm" className="flex-1">
                      View Details
                    </BetterButton>
                    <BetterButton variant="secondary" size="sm">
                      <Settings className="w-4 h-4" />
                    </BetterButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Free tier limit notice */}
          {user?.tier === 'free' && weeklyPlans.length >= 1 && (
            <div className="mt-6 p-4 bg-[#F97316]/10 rounded-lg border border-[#F97316]/20">
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-[#F97316] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] mb-1">Free Tier Limit Reached</p>
                  <p className="text-sm text-[#6B7280] mb-3">
                    You've created {weeklyPlans.length} weekly plan. Upgrade to Pro for unlimited plans and saved profiles.
                  </p>
                  <Link to="/pricing">
                    <BetterButton variant="primary" size="sm">
                      View Pricing
                    </BetterButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-6 bg-[#22C55E]/10 rounded-lg border border-[#22C55E]/20">
          <h3 className="font-bold text-[#111827] mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#22C55E]" />
            Backend Ready for Production
          </h3>
          <p className="text-sm text-[#6B7280] mb-3">
            Your dashboard is connected to production-ready APIs. To enable full functionality:
          </p>
          <ul className="text-sm text-[#6B7280] space-y-1 ml-6 list-disc">
            <li>Connect Neon/Supabase database</li>
            <li>Configure Stripe products and webhooks</li>
            <li>Set environment variables in Vercel</li>
            <li>Deploy to production</li>
          </ul>
          <p className="text-sm text-[#6B7280] mt-3">
            See{' '}
            <code className="bg-[#111827] text-[#22C55E] px-2 py-1 rounded text-xs">
              DEPLOYMENT.md
            </code>{' '}
            for complete setup instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
