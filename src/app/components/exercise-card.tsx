import React from 'react';
import { cn } from './ui/utils';
import { Clock, TrendingUp } from 'lucide-react';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sets: string;
  reps: string;
  bestTime: 'Morning' | 'Afternoon' | 'Evening' | 'Any';
  formInstructions: string[];
  commonMistakes: string[];
  progressionTips: string[];
  goalTiming: {
    strength: string;
    hypertrophy: string;
    endurance: string;
  };
}

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const difficultyConfig = {
    beginner: {
      label: 'Beginner',
      className: 'bg-primary/10 text-primary border-primary/30',
    },
    intermediate: {
      label: 'Intermediate',
      className: 'bg-accent/10 text-accent border-accent/30',
    },
    advanced: {
      label: 'Advanced',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
    },
  };

  const timeConfig = {
    Morning: '🌅',
    Afternoon: '☀️',
    Evening: '🌙',
    Any: '⏰',
  };

  const config = difficultyConfig[exercise.difficulty];

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {exercise.name}
          </h3>
          <p className="text-sm text-muted-foreground font-semibold">
            {exercise.muscleGroup}
          </p>
        </div>
        <span
          className={cn(
            'px-3 py-1.5 rounded-full border text-xs font-semibold flex-shrink-0',
            config.className
          )}
        >
          {config.label}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground font-semibold">
            {exercise.sets} sets × {exercise.reps} reps
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-sm text-foreground">
            <span className="font-semibold">Best Time:</span> {timeConfig[exercise.bestTime]} {exercise.bestTime}
          </span>
        </div>
      </div>

      <button className="text-primary font-semibold text-sm hover:underline">
        View Details →
      </button>
    </div>
  );
}
