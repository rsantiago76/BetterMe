import React from 'react';
import { Link } from 'react-router';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ProgramBadge } from '../components/program-badge';
import { useAuth } from '../../contexts/auth-context';
import { MainNavigation } from '../components/main-navigation';
import {
  BetterCard,
  BetterCardHeader,
  BetterCardTitle,
  BetterCardDescription,
  BetterCardContent,
} from '../components/better-card';
import { 
  Dumbbell, 
  Apple, 
  Pill, 
  Coffee, 
  TrendingUp, 
  Clock,
  Flame,
  Target,
  Calendar,
  ChevronRight,
  Play,
  UtensilsCrossed,
  Code,
  Database,
  Zap,
  Sparkles,
  Rocket,
  Activity,
  Smartphone,
  TrendingUp as TrendingUpIcon,
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
              Build Stronger.<br />
              Recover Smarter.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              Science-backed training, nutrition timing, and supplement strategies.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/planner">
                <BetterButton variant="primary" size="lg">
                  <Calendar className="w-5 h-5" />
                  Open Daily Planner
                </BetterButton>
              </Link>
              <Link to="/nutrition">
                <BetterButton variant="outline" size="lg">
                  <Apple className="w-5 h-5" />
                  Explore Nutrition
                </BetterButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-foreground mb-4">
            Everything You Need to Build Muscle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Science-backed resources to optimize training, nutrition, and recovery
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Training Techniques */}
          <Link to="/techniques">
            <BetterCard className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <BetterCardContent className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Dumbbell className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Training Techniques
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Progressive overload, volume control, and optimal rest periods
                </p>
                <button className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BetterCardContent>
            </BetterCard>
          </Link>

          {/* Muscle-Building Foods */}
          <Link to="/nutrition">
            <BetterCard className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <BetterCardContent className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Apple className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Muscle-Building Foods
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  High-protein meals, clean carbs, and nutrient-dense options
                </p>
                <button className="text-accent font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BetterCardContent>
            </BetterCard>
          </Link>

          {/* Vitamin & Supplement Timing */}
          <Link to="/supplements">
            <BetterCard className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <BetterCardContent className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <Pill className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Vitamin & Supplement Timing
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Optimize absorption with strategic timing protocols
                </p>
                <button className="text-secondary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BetterCardContent>
            </BetterCard>
          </Link>

          {/* Meal Recipes */}
          <Link to="/meals">
            <BetterCard className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <BetterCardContent className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <UtensilsCrossed className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Meal Recipes
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Complete muscle-building meals with macro breakdowns
                </p>
                <button className="text-accent font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BetterCardContent>
            </BetterCard>
          </Link>

          {/* Protein Shake Recipes */}
          <Link to="/recipes">
            <BetterCard className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <BetterCardContent className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Coffee className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Protein Shake Recipes
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Delicious, macro-optimized shakes for every goal
                </p>
                <button className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BetterCardContent>
            </BetterCard>
          </Link>
        </div>
      </section>

      {/* Built With Section */}
      <section className="bg-[#111827] py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-black text-white">
                Built With
              </h2>
            </div>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Production-ready architecture combining modern frameworks with custom nutrition and training engines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Core Technologies */}
            <div className="bg-[#1F2937] rounded-lg p-8 border border-[#374151]">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Core Technologies</h3>
              <ul className="space-y-3 text-[#9CA3AF]">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>React 18 + TypeScript with full type safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Vite for blazing-fast development</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>React Router for client-side routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Tailwind CSS v4 for modern styling</span>
                </li>
              </ul>
            </div>

            {/* Custom Engines */}
            <div className="bg-[#1F2937] rounded-lg p-8 border border-[#374151]">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Custom Engines</h3>
              <ul className="space-y-3 text-[#9CA3AF]">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Nutrition timing based on training schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Workout programming with volume calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Structured meal planner with shopping lists</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span>Macro tracking per day/meal integration</span>
                </li>
              </ul>
            </div>

            {/* Backend Infrastructure */}
            <div className="bg-[#1F2937] rounded-lg p-8 border border-[#374151]">
              <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Backend Infrastructure</h3>
              <ul className="space-y-3 text-[#9CA3AF]">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#22C55E] mt-1 flex-shrink-0" />
                  <span>Vercel Serverless Functions (RESTful API)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#22C55E] mt-1 flex-shrink-0" />
                  <span>JWT authentication & tier-based access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#22C55E] mt-1 flex-shrink-0" />
                  <span>PostgreSQL with JSONB for flexible storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#22C55E] mt-1 flex-shrink-0" />
                  <span>Stripe payment processing & webhooks</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/feature-demo">
              <BetterButton variant="primary" size="lg">
                <Sparkles className="w-5 h-5" />
                Explore Features
              </BetterButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Future Enhancements Section */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-8 h-8 text-accent" />
            <h2 className="text-4xl font-black text-foreground">
              Future Enhancements
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upcoming features to take your training and nutrition to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* AI Training Program Builder */}
          <BetterCard variant="elevated">
            <BetterCardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">AI Training Program Builder</h3>
              <p className="text-muted-foreground mb-6">
                GPT-powered workout generation with exercise selection based on equipment, 
                auto-progression algorithms, and injury prevention recommendations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Smart exercise substitutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Volume landmarks & deload scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Exercise video library integration</span>
                </li>
              </ul>
            </BetterCardContent>
          </BetterCard>

          {/* Wearable Integration */}
          <BetterCard variant="elevated">
            <BetterCardContent className="p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Wearable Integration</h3>
              <p className="text-muted-foreground mb-6">
                Connect Apple Health, Google Fit, Whoop, and Oura Ring for comprehensive 
                recovery tracking and auto-adjusted training intensity.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Sleep quality & HRV analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Daily readiness scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Auto-adjust intensity based on recovery</span>
                </li>
              </ul>
            </BetterCardContent>
          </BetterCard>

          {/* Progress Tracking Dashboard */}
          <BetterCard variant="elevated">
            <BetterCardContent className="p-8">
              <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUpIcon className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Progress Tracking Dashboard</h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive analytics for weight trends, strength progression, macro adherence, 
                and before/after photo timelines with weekly reports.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>1RM estimates & strength graphs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>Body composition tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>Goal achievement milestones</span>
                </li>
              </ul>
            </BetterCardContent>
          </BetterCard>

          {/* Personalized Macro Calculator */}
          <BetterCard variant="elevated">
            <BetterCardContent className="p-8">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#F97316]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Advanced Macro Calculator</h3>
              <p className="text-muted-foreground mb-6">
                Body composition analysis with adaptive calorie cycling, macro periodization 
                for training phases, and metabolic adaptation algorithms.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                  <span>Adaptive calorie cycling based on progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                  <span>Custom macro ratios for unique goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                  <span>Metabolic adaptation tracking</span>
                </li>
              </ul>
            </BetterCardContent>
          </BetterCard>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Technical Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-sm font-bold text-primary mb-1">Phase 1 - Q2 2026</div>
                <div className="text-xs text-muted-foreground">Core Enhancement</div>
              </div>
              <div>
                <div className="text-sm font-bold text-accent mb-1">Phase 2 - Q3 2026</div>
                <div className="text-xs text-muted-foreground">AI Intelligence</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#22C55E] mb-1">Phase 3 - Q4 2026</div>
                <div className="text-xs text-muted-foreground">Wearable Integration</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#F97316] mb-1">Phase 4 - 2027</div>
                <div className="text-xs text-muted-foreground">Mobile Apps</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Building the most comprehensive fitness and nutrition platform with cutting-edge technology 
              and scientific backing.
            </p>
            <Link to="/pricing">
              <BetterButton variant="primary" size="lg">
                <Rocket className="w-5 h-5" />
                Join the Journey
              </BetterButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Logo />
              <p className="text-muted-foreground text-sm mt-4 max-w-sm">
                Science-backed performance nutrition and training strategies for serious athletes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">Training</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/techniques" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Workout Programs
                  </a>
                </li>
                <li>
                  <a href="/techniques" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Exercise Library
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Form Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Recovery Tips
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Nutrition</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Macro Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Recipe Database
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Supplements Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Our Science
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 BetterMe. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}