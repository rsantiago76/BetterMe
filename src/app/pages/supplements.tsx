import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { SupplementCard, Supplement } from '../components/supplement-card';
import { SupplementDetailModal } from '../components/supplement-detail-modal';
import { MainNavigation } from '../components/main-navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const supplements: Supplement[] = [
  // MULTIVITAMIN
  {
    id: 'multivitamin',
    name: 'Multivitamin',
    category: 'multivitamin',
    icon: '💊',
    whatItDoes: 'Fills nutritional gaps and ensures you get essential vitamins and minerals that support overall health, energy production, and recovery.',
    benefits: [
      'Supports immune system function and illness prevention',
      'Fills micronutrient gaps from diet alone',
      'Enhances energy metabolism and reduces fatigue',
      'Supports bone health, skin health, and cellular function',
      'May improve workout recovery and performance',
    ],
    bestTime: ['Morning'],
    withFood: 'With food',
    dosageRange: '1 serving per day (as directed)',
    timingReason: 'Morning is ideal because fat-soluble vitamins (A, D, E, K) absorb best with your first meal of the day. Taking it early also provides B-vitamins that support energy metabolism throughout the day.',
    stacksWith: [
      'Vitamin D (if not already in high amounts)',
      'Omega-3 fish oil',
      'Magnesium (if multivitamin is low in it)',
    ],
    warnings: [
      'Avoid taking on an empty stomach as it may cause nausea',
      'Some multivitamins contain iron which can interfere with calcium absorption—space them out if needed',
      'Check dosages to avoid exceeding upper limits for fat-soluble vitamins',
      'Pregnant women should use prenatal formulas, not standard multivitamins',
    ],
  },

  // CREATINE
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'performance',
    icon: '⚡',
    whatItDoes: 'Increases phosphocreatine stores in muscles, improving ATP production for explosive power and strength during high-intensity exercise.',
    benefits: [
      'Increases strength and power output by 5-15%',
      'Improves performance in high-intensity, short-duration exercises',
      'Supports muscle growth by increasing training volume',
      'Enhances recovery between sets',
      'May improve cognitive function and brain health',
      'One of the most researched and effective supplements',
    ],
    bestTime: ['Post-workout', 'Morning'],
    withFood: 'Either',
    dosageRange: '3-5g per day',
    timingReason: 'Post-workout is ideal because insulin sensitivity is higher, which helps shuttle creatine into muscle cells. However, timing is less critical than consistency—daily supplementation maintains saturation regardless of exact timing.',
    stacksWith: [
      'Whey protein (post-workout for synergistic muscle building)',
      'Simple carbs post-workout (increases insulin for better absorption)',
      'Beta-alanine (for enhanced muscular endurance)',
    ],
    warnings: [
      'Stay well-hydrated—creatine pulls water into muscle cells',
      'May cause minor water weight gain (2-5 lbs) which is normal',
      'Those with kidney issues should consult a doctor first',
      'Loading phase (20g/day for 5-7 days) is optional—not required',
      'Choose monohydrate form—it\'s most researched and cost-effective',
    ],
  },

  // VITAMIN D
  {
    id: 'vitamin-d',
    name: 'Vitamin D3',
    category: 'multivitamin',
    icon: '☀️',
    whatItDoes: 'Supports calcium absorption for bone health, immune function, testosterone production, and muscle protein synthesis.',
    benefits: [
      'Supports bone density and reduces fracture risk',
      'Boosts immune system function',
      'May increase testosterone levels in deficient individuals',
      'Improves muscle strength and recovery',
      'Supports mood and reduces risk of depression',
      'Critical for athletes who train indoors or live in low-sun climates',
    ],
    bestTime: ['Morning'],
    withFood: 'With food',
    dosageRange: '1,000-5,000 IU per day',
    timingReason: 'Vitamin D is fat-soluble, so taking it with a meal containing healthy fats maximizes absorption. Morning timing with breakfast is ideal and won\'t interfere with sleep (unlike taking it at night).',
    stacksWith: [
      'Vitamin K2 (helps direct calcium to bones, not arteries)',
      'Magnesium (required for vitamin D activation)',
      'Omega-3 fish oil (fat helps absorption)',
      'Calcium (vitamin D enhances calcium absorption)',
    ],
    warnings: [
      'Get blood levels tested (optimal range: 40-60 ng/mL)',
      'Too much can lead to toxicity—don\'t exceed 10,000 IU daily without supervision',
      'Those with hypercalcemia should avoid high doses',
      'D3 (cholecalciferol) is superior to D2 (ergocalciferol)',
    ],
  },

  // MAGNESIUM
  {
    id: 'magnesium',
    name: 'Magnesium',
    category: 'recovery',
    icon: '🧘',
    whatItDoes: 'Essential mineral that supports muscle relaxation, sleep quality, energy production, and recovery from intense training.',
    benefits: [
      'Improves sleep quality and duration',
      'Reduces muscle cramps and soreness',
      'Supports energy production (ATP synthesis)',
      'Helps regulate blood pressure and blood sugar',
      'Reduces stress and promotes relaxation',
      'Required for over 300 enzymatic reactions in the body',
    ],
    bestTime: ['Before bed'],
    withFood: 'Either',
    dosageRange: '200-400mg per day',
    timingReason: 'Before bed is optimal because magnesium promotes muscle relaxation and activates the parasympathetic nervous system, improving sleep quality. Better sleep = better recovery and muscle growth.',
    stacksWith: [
      'Zinc (ZMA stack for sleep and testosterone)',
      'Vitamin D (magnesium activates vitamin D)',
      'Calcium (in balanced ratio—avoid taking together)',
    ],
    warnings: [
      'High doses (>500mg) can cause digestive upset or diarrhea',
      'Magnesium glycinate or citrate are best absorbed forms',
      'Avoid magnesium oxide—poorly absorbed and causes GI issues',
      'Those on blood pressure medications should consult a doctor',
      'Space away from calcium supplements by 2+ hours',
    ],
  },

  // OMEGA-3
  {
    id: 'omega-3',
    name: 'Omega-3 Fish Oil',
    category: 'recovery',
    icon: '🐟',
    whatItDoes: 'Provides EPA and DHA fatty acids that reduce inflammation, support heart health, and enhance recovery from training.',
    benefits: [
      'Reduces muscle soreness and inflammation',
      'Supports cardiovascular health and blood flow',
      'Improves joint health and mobility',
      'Enhances muscle protein synthesis',
      'Supports brain health and cognitive function',
      'May improve insulin sensitivity',
    ],
    bestTime: ['Morning', 'Post-workout'],
    withFood: 'With food',
    dosageRange: '1-3g combined EPA/DHA per day',
    timingReason: 'Take with meals containing fat for optimal absorption. Morning or post-workout are ideal—post-workout timing may enhance the anti-inflammatory benefits for muscle recovery.',
    stacksWith: [
      'Vitamin D (both are fat-soluble, enhance each other)',
      'Vitamin E (protects omega-3s from oxidation)',
      'Multivitamin (complements overall health)',
    ],
    warnings: [
      'Choose high-quality, third-party tested brands to avoid mercury',
      'May increase bleeding risk—avoid before surgery',
      'Those on blood thinners should consult a doctor',
      'Fish burps? Store in freezer or take with larger meals',
      'Look for EPA/DHA content, not just "fish oil" amount',
    ],
  },

  // BCAA
  {
    id: 'bcaa',
    name: 'BCAA (Branched-Chain Amino Acids)',
    category: 'performance',
    icon: '🏋️',
    whatItDoes: 'Provides leucine, isoleucine, and valine to reduce muscle breakdown during training and support muscle protein synthesis.',
    benefits: [
      'Reduces muscle breakdown during intense training',
      'Decreases muscle soreness (DOMS)',
      'Supports muscle growth when protein intake is low',
      'May improve endurance and reduce fatigue',
      'Useful for fasted training to preserve muscle',
    ],
    bestTime: ['Pre-workout', 'Post-workout'],
    withFood: 'Empty stomach',
    dosageRange: '5-10g per serving',
    timingReason: 'Pre-workout or during fasted training to prevent muscle breakdown. Post-workout to kickstart recovery. BCAAs are most beneficial when total protein intake is low—if you eat 150g+ protein daily, they\'re less critical.',
    stacksWith: [
      'Creatine (synergistic for muscle building)',
      'Electrolytes (for intra-workout hydration)',
      'Beta-alanine (for enhanced endurance)',
    ],
    warnings: [
      'BCAAs are less necessary if you consume adequate protein (1g per lb bodyweight)',
      'Whey protein contains BCAAs naturally and may be more cost-effective',
      'Those with ALS or undergoing surgery should avoid',
      'May interfere with blood sugar—diabetics should monitor',
      'Look for 2:1:1 ratio (leucine:isoleucine:valine)',
    ],
  },

  // WHEY PROTEIN
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    category: 'protein',
    icon: '🥛',
    whatItDoes: 'Fast-digesting complete protein that provides all essential amino acids to support muscle protein synthesis and recovery.',
    benefits: [
      'Quickly delivers amino acids for muscle repair',
      'Supports muscle growth and strength gains',
      'Convenient way to increase daily protein intake',
      'Contains high leucine content for muscle protein synthesis',
      'Supports satiety and weight management',
      'Easy to digest and absorb',
    ],
    bestTime: ['Post-workout', 'Morning'],
    withFood: 'Either',
    dosageRange: '20-40g per serving',
    timingReason: 'Post-workout is optimal—the 30-60 minute anabolic window is when muscles are primed for protein uptake. Morning is also great to break overnight fasting and stimulate muscle protein synthesis.',
    stacksWith: [
      'Creatine (add to post-workout shake)',
      'Simple carbs like banana (enhances insulin for nutrient delivery)',
      'Oats or peanut butter (for sustained energy)',
    ],
    warnings: [
      'Those with lactose intolerance should choose isolate over concentrate',
      'Whey is a supplement, not a replacement for whole food protein',
      'Excessive protein (>2g per lb bodyweight) offers no additional benefit',
      'Choose brands tested for heavy metals and contaminants',
      'Isolate (90%+ protein) vs. concentrate (70-80% protein)—both are effective',
    ],
  },
];

export default function SupplementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);

  const filters = [
    { id: 'All', label: 'All Supplements', icon: '💊' },
    { id: 'multivitamin', label: 'Essential', icon: '☀️' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'recovery', label: 'Recovery', icon: '🧘' },
    { id: 'protein', label: 'Protein', icon: '🥛' },
  ];

  const filteredSupplements =
    activeFilter === 'All'
      ? supplements
      : supplements.filter((supp) => supp.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-start gap-6 mb-6">
            <div className="hidden md:flex w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                Supplement Timing Guide
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Science-backed supplement strategies to optimize absorption, performance, and recovery. 
                Learn what to take, when to take it, and why timing matters.
              </p>
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 max-w-3xl">
            <p className="text-sm text-foreground">
              <strong className="font-bold">Quality Matters:</strong> Always choose third-party tested supplements 
              (NSF Certified for Sport, Informed-Sport, or USP Verified) to ensure purity and accuracy of ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border bg-card sticky top-[73px] z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Evidence-Based Information
              </h3>
              <p className="text-muted-foreground">
                All supplement recommendations are based on peer-reviewed research and clinical studies. 
                We prioritize your safety and provide transparent, science-backed guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplement Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredSupplements.length}</span>{' '}
            {filteredSupplements.length === 1 ? 'supplement' : 'supplements'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSupplements.map((supplement) => (
            <SupplementCard
              key={supplement.id}
              supplement={supplement}
              onClick={() => setSelectedSupplement(supplement)}
            />
          ))}
        </div>
      </section>

      {/* Quick Reference Guide */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-foreground mb-8">Quick Timing Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌅</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Morning
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multivitamin (with breakfast)</li>
                <li>• Vitamin D3 (with healthy fats)</li>
                <li>• Omega-3 (with meal)</li>
                <li>• Whey Protein (to break fast)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Pre-Workout
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• BCAA (if training fasted)</li>
                <li>• Creatine (or post-workout)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Post-Workout
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Whey Protein (20-40g)</li>
                <li>• Creatine (3-5g)</li>
                <li>• BCAA (if needed)</li>
                <li>• Omega-3 (with meal)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Before Bed
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Magnesium (for sleep/recovery)</li>
                <li>• Casein Protein (slow-digesting)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="bg-muted/50 rounded-xl p-8 border border-border max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Important: Supplements Support, Not Replace
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                No supplement can replace a solid diet, consistent training, and adequate sleep. 
                Focus on whole foods first, then use supplements strategically to fill gaps and optimize performance.
              </p>
              <p className="text-sm text-muted-foreground">
                Always consult with a healthcare professional before starting any supplement regimen, 
                especially if you have pre-existing health conditions or take medications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplement Detail Modal */}
      <SupplementDetailModal
        supplement={selectedSupplement}
        isOpen={!!selectedSupplement}
        onClose={() => setSelectedSupplement(null)}
      />
    </div>
  );
}