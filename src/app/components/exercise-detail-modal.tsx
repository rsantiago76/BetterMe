import React from 'react';
import { Exercise } from './exercise-card';
import { X, AlertCircle, TrendingUp, Target, Clock } from 'lucide-react';
import { BetterButton } from './better-button';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExerciseDetailModal({ exercise, isOpen, onClose }: ExerciseDetailModalProps) {
  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-foreground mb-2">
                {exercise.name}
              </h2>
              <p className="text-muted-foreground font-semibold">
                {exercise.muscleGroup}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Sets & Reps */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Recommended Volume</h3>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            </div>

            {/* Proper Form Instructions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Proper Form</h3>
              </div>
              <ul className="space-y-3">
                {exercise.formInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-foreground leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Common Mistakes to Avoid</h3>
              </div>
              <ul className="space-y-3">
                {exercise.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-destructive text-lg">⚠️</span>
                    <span className="text-foreground leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progressive Overload Tips */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Progressive Overload Strategy</h3>
              </div>
              <ul className="space-y-3">
                {exercise.progressionTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent text-lg">📈</span>
                    <span className="text-foreground leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Time by Goal */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Optimal Timing by Goal</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-bold text-primary mb-2">💪 Strength</h4>
                  <p className="text-sm text-foreground">{exercise.goalTiming.strength}</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <h4 className="font-bold text-accent mb-2">🔥 Hypertrophy</h4>
                  <p className="text-sm text-foreground">{exercise.goalTiming.hypertrophy}</p>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <h4 className="font-bold text-secondary mb-2">⚡ Endurance</h4>
                  <p className="text-sm text-foreground">{exercise.goalTiming.endurance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <BetterButton variant="primary" className="w-full" onClick={onClose}>
              Got It
            </BetterButton>
          </div>
        </div>
      </div>
    </div>
  );
}
