import React from 'react';
import { Supplement } from './supplement-card';
import { X, Clock, AlertCircle, Lightbulb, CheckCircle, Utensils } from 'lucide-react';
import { BetterButton } from './better-button';

interface SupplementDetailModalProps {
  supplement: Supplement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SupplementDetailModal({ supplement, isOpen, onClose }: SupplementDetailModalProps) {
  if (!isOpen || !supplement) return null;

  const foodStatusConfig = {
    'With food': {
      icon: '🍽️',
      description: 'Take with a meal for optimal absorption and to minimize stomach discomfort.',
    },
    'Empty stomach': {
      icon: '⏰',
      description: 'Take on an empty stomach for maximum absorption and effectiveness.',
    },
    'Either': {
      icon: '✓',
      description: 'Can be taken with or without food based on your preference.',
    },
  };

  const foodConfig = foodStatusConfig[supplement.withFood];

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
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">{supplement.icon}</span>
                <div>
                  <h2 className="text-3xl font-black text-foreground">
                    {supplement.name}
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {supplement.whatItDoes}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Key Benefits</h3>
              </div>
              <ul className="space-y-3">
                {supplement.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timing */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Optimal Timing</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {supplement.bestTime.map((time) => (
                  <span
                    key={time}
                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg border border-primary/30"
                  >
                    ⏰ {time}
                  </span>
                ))}
              </div>
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-accent mb-2">Why This Timing?</h4>
                    <p className="text-foreground leading-relaxed">{supplement.timingReason}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* With Food or Empty Stomach */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Food Requirements</h3>
              </div>
              <div className="bg-secondary/5 rounded-lg p-5 border border-secondary/20">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{foodConfig.icon}</span>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-2">
                      {supplement.withFood}
                    </h4>
                    <p className="text-foreground leading-relaxed">{foodConfig.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dosage */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💊</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Recommended Dosage</h3>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <div className="text-center">
                  <p className="text-3xl font-black text-foreground mb-2">
                    {supplement.dosageRange}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Daily recommended dosage range
                  </p>
                </div>
              </div>
            </div>

            {/* Stacks Well With */}
            {supplement.stacksWith.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🔗</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Stacks Well With</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {supplement.stacksWith.map((stack, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 rounded-lg p-3 border border-border"
                    >
                      <p className="text-sm text-foreground font-semibold">{stack}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {supplement.warnings.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Important Considerations</h3>
                </div>
                <div className="bg-destructive/5 rounded-lg p-5 border border-destructive/20">
                  <ul className="space-y-3">
                    {supplement.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-foreground leading-relaxed">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-muted/30 rounded-lg p-5 border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Medical Disclaimer:</strong> This information is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.
              </p>
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
