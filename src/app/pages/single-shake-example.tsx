import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function SingleShakeExamplePage() {
  const [copied, setCopied] = React.useState(false);

  // Example: Single protein shake recipe
  const exampleRecipe: ShakeRecipe = {
    id: 'post-workout-classic',
    name: 'Post-Workout Classic',
    goal: 'bulking',
    description: 'The perfect post-workout shake with fast-digesting protein and carbs to kickstart recovery and muscle growth.',
    ingredients: [
      { item: 'Whey protein isolate', amount: '2 scoops', notes: 'chocolate or vanilla' },
      { item: 'Banana', amount: '1 large', notes: 'ripe, frozen preferred' },
      { item: 'Rolled oats', amount: '1/2 cup', notes: '40g, raw' },
      { item: 'Almond milk', amount: '1.5 cups', notes: '360ml, unsweetened' },
      { item: 'Peanut butter', amount: '2 tbsp', notes: 'natural' },
      { item: 'Honey', amount: '1 tbsp' },
      { item: 'Cinnamon', amount: '1/2 tsp' },
      { item: 'Ice cubes', amount: '1 cup' },
    ],
    instructions: [
      'Add almond milk to blender first to prevent ingredients from sticking',
      'Add protein powder, oats, banana, peanut butter, honey, and cinnamon',
      'Top with ice cubes',
      'Blend on high speed for 60-90 seconds until completely smooth and creamy',
      'Pour into a shaker bottle and consume within 30 minutes post-workout',
    ],
    protein: 58,
    carbs: 72,
    fats: 18,
    calories: 680,
    bestTime: ['Post-workout'],
    timingReason: 'Fast-digesting whey protein and simple carbs create an insulin spike that drives nutrients into muscles for optimal recovery and glycogen replenishment.',
    prepTime: 4,
    servings: 1,
  };

  const handleCopyCode = () => {
    const code = `import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';

const myRecipe: ShakeRecipe = {
  id: '${exampleRecipe.id}',
  name: '${exampleRecipe.name}',
  goal: '${exampleRecipe.goal}',
  description: '${exampleRecipe.description}',
  ingredients: ${JSON.stringify(exampleRecipe.ingredients, null, 2)},
  instructions: ${JSON.stringify(exampleRecipe.instructions, null, 2)},
  protein: ${exampleRecipe.protein},
  carbs: ${exampleRecipe.carbs},
  fats: ${exampleRecipe.fats},
  calories: ${exampleRecipe.calories},
  bestTime: ${JSON.stringify(exampleRecipe.bestTime)},
  timingReason: '${exampleRecipe.timingReason}',
  prepTime: ${exampleRecipe.prepTime},
  servings: ${exampleRecipe.servings},
};

// Usage
<ShakeRecipeCard recipe={myRecipe} />`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <a
                href="/shake-cards"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Recipes
              </a>
              <BetterButton variant="primary" size="sm">
                Save Recipe
              </BetterButton>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-foreground mb-3">
              Protein Shake Recipe Card Component
            </h1>
            <p className="text-lg text-muted-foreground">
              Reusable component example with complete implementation
            </p>
          </div>

          {/* Component Preview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-foreground">Live Preview</h2>
              <BetterButton
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </BetterButton>
            </div>
            <div className="flex justify-center">
              <ShakeRecipeCard recipe={exampleRecipe} />
            </div>
          </div>

          {/* Component Features */}
          <div className="bg-card rounded-xl p-8 border border-border mb-8">
            <h2 className="text-2xl font-black text-foreground mb-6">Component Features</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Complete Macro Breakdown</h3>
                  <p className="text-sm text-muted-foreground">
                    Displays calories, protein, carbs, and fats with color-coded badges (Primary = Protein, Accent = Carbs, Secondary = Fats)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Exact Ingredient Measurements</h3>
                  <p className="text-sm text-muted-foreground">
                    All ingredients listed with precise amounts (cups, tbsp, oz, grams) and optional notes for clarity
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Step-by-Step Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    Numbered, easy-to-follow steps (3-5 maximum) for quick preparation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Optimal Timing Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Shows best time to drink (Morning, Pre-workout, Post-workout, Before bed) with scientific rationale
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Goal-Based Categorization</h3>
                  <p className="text-sm text-muted-foreground">
                    Tagged by fitness goal: Bulking, Cutting, Recovery, or Breakfast with corresponding badge
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Professional Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean, minimal, scientific aesthetic with strong typographic hierarchy and BetterMe brand colors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-black text-foreground mb-4">How to Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">1. Import the component</h3>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <code className="text-sm text-foreground font-mono">
                    import {'{ ShakeRecipeCard, ShakeRecipe }'} from '../components/shake-recipe-card';
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">2. Define your recipe object</h3>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <code className="text-sm text-foreground font-mono block whitespace-pre-wrap">
                    {`const myRecipe: ShakeRecipe = {
  id: 'unique-id',
  name: 'Recipe Name',
  goal: 'bulking' | 'cutting' | 'recovery' | 'breakfast',
  // ... see full example above
};`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">3. Render the component</h3>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <code className="text-sm text-foreground font-mono">
                    {'<ShakeRecipeCard recipe={myRecipe} />'}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">4. Optional: Add click handler</h3>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <code className="text-sm text-foreground font-mono">
                    {'<ShakeRecipeCard recipe={myRecipe} onClick={() => console.log("Clicked!")} />'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
