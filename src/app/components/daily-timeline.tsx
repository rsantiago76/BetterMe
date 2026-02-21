import React from 'react';
import { cn } from './ui/utils';

interface TimelineEvent {
  time: string;
  title: string;
  type: 'wake' | 'meal' | 'supplement' | 'workout' | 'sleep';
  isCompleted?: boolean;
}

interface DailyTimelineProps {
  events: TimelineEvent[];
}

export function DailyTimeline({ events }: DailyTimelineProps) {
  const typeConfig = {
    wake: { color: 'bg-accent', icon: '🌅' },
    meal: { color: 'bg-primary', icon: '🍽️' },
    supplement: { color: 'bg-secondary', icon: '💊' },
    workout: { color: 'bg-accent', icon: '💪' },
    sleep: { color: 'bg-secondary', icon: '😴' },
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6">Today's Timeline</h3>
      <div className="space-y-4">
        {events.map((event, index) => {
          const config = typeConfig[event.type];
          const isLast = index === events.length - 1;

          return (
            <div key={index} className="flex items-start gap-4 relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-[19px] top-10 w-0.5 h-full bg-border" />
              )}

              {/* Time */}
              <div className="w-16 flex-shrink-0 pt-1">
                <span className="text-sm font-bold text-muted-foreground">{event.time}</span>
              </div>

              {/* Icon */}
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 relative z-10',
                event.isCompleted ? config.color : 'bg-muted border-2 border-border'
              )}>
                <span className={cn(event.isCompleted ? '' : 'opacity-40')}>{config.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <p className={cn(
                  'font-semibold',
                  event.isCompleted ? 'text-foreground line-through' : 'text-foreground'
                )}>
                  {event.title}
                </p>
              </div>

              {/* Check */}
              {event.isCompleted && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
