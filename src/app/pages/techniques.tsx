import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ExerciseCard, Exercise } from '../components/exercise-card';
import { ExerciseDetailModal } from '../components/exercise-detail-modal';
import { MainNavigation } from '../components/main-navigation';
import { ArrowLeft } from 'lucide-react';

const exercises: Exercise[] = [
  // CHEST
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    difficulty: 'intermediate',
    sets: '4-5',
    reps: '6-8',
    bestTime: 'Morning',
    formInstructions: [
      'Lie flat on the bench with feet firmly planted on the ground',
      'Grip the bar slightly wider than shoulder-width with wrists straight',
      'Unrack the bar and position it over your mid-chest',
      'Lower the bar with control to your chest, elbows at 45-degree angle',
      'Press the bar back up explosively while maintaining tension',
      'Keep your shoulder blades retracted throughout the movement',
    ],
    commonMistakes: [
      'Flaring elbows too wide, which can stress the shoulder joint',
      'Bouncing the bar off the chest instead of controlled touch',
      'Lifting hips off the bench during the press',
      'Inconsistent bar path causing energy leaks',
    ],
    progressionTips: [
      'Add 2.5-5 lbs per week once you can complete all sets with good form',
      'Incorporate pause reps (2-3 second pause at chest) to build strength',
      'Use micro-loading plates (1.25 lbs) for more gradual progression',
      'Track your tempo and aim for controlled 2-second negatives',
    ],
    goalTiming: {
      strength: 'Early morning when you\'re fresh, 3-5 reps with heavier weight',
      hypertrophy: 'Mid-morning to afternoon, 8-12 reps with moderate weight',
      endurance: 'Any time, 15-20 reps with lighter weight and shorter rest',
    },
  },
  {
    id: 'incline-press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    difficulty: 'beginner',
    sets: '3-4',
    reps: '10-12',
    bestTime: 'Morning',
    formInstructions: [
      'Set the bench to 30-45 degree incline',
      'Start with dumbbells at shoulder height, palms forward',
      'Press dumbbells up and slightly together at the top',
      'Lower with control until dumbbells are at chest level',
      'Maintain natural arch in lower back',
      'Keep core engaged throughout',
    ],
    commonMistakes: [
      'Setting bench angle too steep (above 45 degrees)',
      'Pressing dumbbells straight up instead of slight arc',
      'Using momentum instead of controlled movement',
      'Letting dumbbells drift too far apart at top',
    ],
    progressionTips: [
      'Increase weight by 5 lbs per dumbbell every 2-3 weeks',
      'Add a squeeze at the top for maximum contraction',
      'Slow down the eccentric (lowering) phase to 3-4 seconds',
      'Perform drop sets on the final set for extra volume',
    ],
    goalTiming: {
      strength: 'Morning, 6-8 reps with maximum controlled weight',
      hypertrophy: 'Morning to early afternoon, 10-12 reps with focus on time under tension',
      endurance: 'Afternoon, 15-20 reps with lighter weight',
    },
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    muscleGroup: 'Chest',
    difficulty: 'intermediate',
    sets: '3',
    reps: '12-15',
    bestTime: 'Afternoon',
    formInstructions: [
      'Set cable pulleys to upper position for decline angle',
      'Stand in center with one foot forward for stability',
      'Grab handles with slight bend in elbows',
      'Bring handles together in front of chest in wide arc',
      'Squeeze chest at peak contraction for 1 second',
      'Return to starting position with control',
    ],
    commonMistakes: [
      'Bending elbows too much, turning it into a press',
      'Using too much weight and losing the stretch',
      'Not maintaining constant tension through range of motion',
      'Moving torso instead of isolating chest',
    ],
    progressionTips: [
      'Increase weight gradually, never sacrificing form',
      'Experiment with different angles (high, mid, low)',
      'Add pause reps at peak contraction',
      'Incorporate unilateral (one arm) variations for imbalances',
    ],
    goalTiming: {
      strength: 'Not ideal for pure strength—use compound movements instead',
      hypertrophy: 'Afternoon, 12-15 reps with controlled tempo and peak squeeze',
      endurance: 'Evening, 20+ reps with lighter resistance',
    },
  },

  // BACK
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    muscleGroup: 'Back',
    difficulty: 'advanced',
    sets: '4',
    reps: '5-6',
    bestTime: 'Morning',
    formInstructions: [
      'Stand with feet hip-width, bar over mid-foot',
      'Bend down and grip bar just outside knees',
      'Drop hips, chest up, shoulders slightly in front of bar',
      'Engage lats by "bending" the bar',
      'Push through floor with legs while pulling bar up',
      'Lock out by driving hips forward, shoulders back',
    ],
    commonMistakes: [
      'Rounding the lower back during the pull',
      'Starting with hips too low or too high',
      'Not engaging lats before the pull',
      'Using momentum instead of controlled strength',
    ],
    progressionTips: [
      'Add 5-10 lbs per week, deload every 4-6 weeks',
      'Practice deficit deadlifts to improve starting strength',
      'Use pause deadlifts to build control',
      'Film yourself to check form regularly',
    ],
    goalTiming: {
      strength: 'Early morning when nervous system is fresh, 3-5 reps max effort',
      hypertrophy: 'Mid-morning, 6-8 reps with controlled tempo',
      endurance: 'Not recommended—deadlifts are primarily for strength and power',
    },
  },
  {
    id: 'pullups',
    name: 'Wide-Grip Pull-Ups',
    muscleGroup: 'Back',
    difficulty: 'intermediate',
    sets: '4',
    reps: '8-10',
    bestTime: 'Morning',
    formInstructions: [
      'Grip bar wider than shoulder-width, palms facing away',
      'Hang with arms fully extended, engage core',
      'Pull shoulder blades down and together',
      'Drive elbows down to sides until chin clears bar',
      'Lower with control to full extension',
      'Avoid swinging or using momentum',
    ],
    commonMistakes: [
      'Using momentum to swing up instead of pure strength',
      'Not achieving full range of motion',
      'Leading with chin instead of chest',
      'Shrugging shoulders at the bottom',
    ],
    progressionTips: [
      'Add weight using a dip belt once you can do 12+ clean reps',
      'Practice negative pull-ups (slow lowering) to build strength',
      'Vary grip width and style (neutral, underhand) each session',
      'Use assisted pull-up machine if needed, gradually reduce assistance',
    ],
    goalTiming: {
      strength: 'Morning, add weight and perform 4-6 reps',
      hypertrophy: 'Morning to afternoon, 8-12 reps with controlled tempo',
      endurance: 'Any time, bodyweight for max reps or multiple sets',
    },
  },
  {
    id: 'barbell-row',
    name: 'Barbell Bent-Over Row',
    muscleGroup: 'Back',
    difficulty: 'intermediate',
    sets: '4',
    reps: '8-10',
    bestTime: 'Morning',
    formInstructions: [
      'Stand with feet hip-width, knees slightly bent',
      'Bend at hips to 45-degree angle, back straight',
      'Grip bar slightly wider than shoulder-width',
      'Pull bar to lower chest/upper abdomen',
      'Squeeze shoulder blades together at top',
      'Lower with control, maintaining torso angle',
    ],
    commonMistakes: [
      'Standing too upright, reducing lat activation',
      'Using momentum or "cheating" the weight up',
      'Not retracting shoulder blades at the top',
      'Allowing lower back to round',
    ],
    progressionTips: [
      'Add 5 lbs per week while maintaining strict form',
      'Use Pendlay rows (dead stop each rep) for explosive power',
      'Incorporate tempo variations (3-second negatives)',
      'Try different grip widths to target different back areas',
    ],
    goalTiming: {
      strength: 'Morning, 5-6 reps with heavier weight',
      hypertrophy: 'Morning to early afternoon, 8-12 reps',
      endurance: 'Afternoon, 15+ reps with lighter weight',
    },
  },

  // LEGS
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    muscleGroup: 'Legs',
    difficulty: 'intermediate',
    sets: '4-5',
    reps: '6-8',
    bestTime: 'Morning',
    formInstructions: [
      'Place bar on upper traps, feet shoulder-width apart',
      'Point toes slightly outward (10-15 degrees)',
      'Unrack and step back, brace core',
      'Initiate descent by breaking at hips and knees simultaneously',
      'Descend until thighs are parallel or below',
      'Drive through heels to return to standing',
    ],
    commonMistakes: [
      'Knees caving inward during ascent',
      'Rising with hips first (good morning squat)',
      'Not reaching proper depth',
      'Shifting weight onto toes instead of midfoot',
    ],
    progressionTips: [
      'Add 5-10 lbs per week for lower body (bigger muscles recover faster)',
      'Include pause squats at bottom to build strength',
      'Work on ankle and hip mobility between sessions',
      'Use tempo squats (4-second descent) for control',
    ],
    goalTiming: {
      strength: 'Early morning, 4-6 reps with maximum weight',
      hypertrophy: 'Morning to early afternoon, 8-12 reps',
      endurance: 'Afternoon, 15-20 reps with lighter weight',
    },
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    muscleGroup: 'Legs',
    difficulty: 'intermediate',
    sets: '3-4',
    reps: '10-12',
    bestTime: 'Afternoon',
    formInstructions: [
      'Start standing with bar at hip level',
      'Keep knees slightly bent throughout',
      'Push hips back while lowering bar down legs',
      'Lower until you feel hamstring stretch (mid-shin)',
      'Drive hips forward to return to standing',
      'Keep bar close to body throughout movement',
    ],
    commonMistakes: [
      'Bending knees too much (turning it into conventional deadlift)',
      'Rounding lower back instead of hinging at hips',
      'Not feeling the stretch in hamstrings',
      'Looking up instead of maintaining neutral neck',
    ],
    progressionTips: [
      'Add weight slowly, focusing on hamstring stretch',
      'Perform single-leg RDLs for balance and unilateral strength',
      'Use pauses at bottom position to increase time under tension',
      'Try deficit RDLs (standing on plates) for greater range',
    ],
    goalTiming: {
      strength: 'Morning, 6-8 reps with heavy weight',
      hypertrophy: 'Afternoon, 10-12 reps focusing on eccentric',
      endurance: 'Evening, 15-20 reps with lighter weight',
    },
  },

  // ARMS
  {
    id: 'barbell-curl',
    name: 'Standing Barbell Curl',
    muscleGroup: 'Arms',
    difficulty: 'beginner',
    sets: '3',
    reps: '10-12',
    bestTime: 'Afternoon',
    formInstructions: [
      'Stand with feet hip-width, hold bar at hip level',
      'Keep elbows close to torso, slightly in front of body',
      'Curl bar up by contracting biceps',
      'Squeeze at top, forearms vertical',
      'Lower with control to starting position',
      'Avoid swinging or using momentum',
    ],
    commonMistakes: [
      'Swinging body to lift weight (using back instead of biceps)',
      'Elbows moving forward during curl',
      'Not achieving full range of motion',
      'Curling wrists instead of keeping them neutral',
    ],
    progressionTips: [
      'Increase weight by 2.5-5 lbs when you can do 12 clean reps',
      'Use 21s (7 bottom half, 7 top half, 7 full reps)',
      'Try tempo curls with 3-second negatives',
      'Incorporate drop sets on final set',
    ],
    goalTiming: {
      strength: 'Afternoon, 6-8 reps with strict form',
      hypertrophy: 'Afternoon to evening, 10-12 reps',
      endurance: 'Evening, 15-20 reps',
    },
  },
  {
    id: 'tricep-dips',
    name: 'Weighted Tricep Dips',
    muscleGroup: 'Arms',
    difficulty: 'intermediate',
    sets: '3-4',
    reps: '8-10',
    bestTime: 'Afternoon',
    formInstructions: [
      'Position hands on parallel bars, slightly wider than shoulders',
      'Start at top with arms extended',
      'Lean slightly forward, lower body by bending elbows',
      'Descend until upper arms are parallel to ground',
      'Press back up by extending elbows',
      'Keep core tight throughout movement',
    ],
    commonMistakes: [
      'Going too deep and stressing shoulders',
      'Flaring elbows out instead of keeping them close',
      'Not leaning forward enough (hits chest more than triceps)',
      'Using momentum instead of controlled movement',
    ],
    progressionTips: [
      'Start with bodyweight, add weight belt when you hit 12+ reps',
      'Progress slowly with weighted dips (2.5-5 lbs per week)',
      'Include pause reps at bottom position',
      'Try ring dips for added instability and muscle activation',
    ],
    goalTiming: {
      strength: 'Afternoon, add weight and perform 6-8 reps',
      hypertrophy: 'Afternoon, 8-12 reps with controlled tempo',
      endurance: 'Evening, bodyweight for max reps',
    },
  },

  // CORE
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raises',
    muscleGroup: 'Core',
    difficulty: 'advanced',
    sets: '3',
    reps: '12-15',
    bestTime: 'Any',
    formInstructions: [
      'Hang from pull-up bar with overhand grip',
      'Engage core and keep legs together',
      'Raise legs by flexing hips and abs',
      'Lift until legs are parallel to ground (or higher)',
      'Lower legs with control, avoid swinging',
      'Keep shoulders engaged throughout',
    ],
    commonMistakes: [
      'Using momentum and swinging instead of core strength',
      'Bending knees excessively (reduces difficulty)',
      'Not controlling the descent',
      'Shrugging shoulders and losing lat engagement',
    ],
    progressionTips: [
      'Start with knee raises if straight leg is too difficult',
      'Progress to toes-to-bar for advanced variation',
      'Add ankle weights for increased resistance',
      'Perform L-sit holds at top position for isometric strength',
    ],
    goalTiming: {
      strength: 'Any time, add weight and perform 8-10 reps',
      hypertrophy: 'Any time, 12-15 reps with controlled tempo',
      endurance: 'Any time, max reps with bodyweight',
    },
  },
  {
    id: 'plank',
    name: 'Weighted Plank',
    muscleGroup: 'Core',
    difficulty: 'beginner',
    sets: '3',
    reps: '45-60s hold',
    bestTime: 'Any',
    formInstructions: [
      'Start in forearm plank position, elbows under shoulders',
      'Keep body in straight line from head to heels',
      'Engage core by pulling belly button to spine',
      'Squeeze glutes to prevent lower back sagging',
      'Maintain neutral neck position',
      'Breathe steadily, don\'t hold breath',
    ],
    commonMistakes: [
      'Hips sagging or piking too high',
      'Holding breath instead of breathing normally',
      'Looking up instead of down',
      'Tension in shoulders instead of core',
    ],
    progressionTips: [
      'Increase hold time by 5-10 seconds per week',
      'Add weight plate on back once you can hold 60+ seconds',
      'Try single-arm or single-leg variations',
      'Incorporate plank walk-outs or shoulder taps',
    ],
    goalTiming: {
      strength: 'Any time, add weight and hold 30-45 seconds',
      hypertrophy: 'Any time, hold 60+ seconds',
      endurance: 'Any time, multiple sets of max holds',
    },
  },
];

export default function TechniquesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filters = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core'];

  const filteredExercises =
    activeFilter === 'All'
      ? exercises
      : exercises.filter((ex) => ex.muscleGroup === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Training Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Master every movement with our comprehensive exercise library. Perfect form, progressive
            overload strategies, and science-backed timing recommendations.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border bg-card sticky top-[73px] z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredExercises.length}</span>{' '}
            {filteredExercises.length === 1 ? 'exercise' : 'exercises'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>
      </section>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}