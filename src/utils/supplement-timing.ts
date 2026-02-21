export type SupplementId = 
  | 'multivitamin'
  | 'vitamin_d'
  | 'omega_3'
  | 'creatine'
  | 'magnesium'
  | 'caffeine'
  | 'whey'
  | 'casein';

export interface Supplement {
  id: SupplementId;
  name: string;
  description: string;
  category: 'vitamin' | 'mineral' | 'protein' | 'performance' | 'recovery';
}

export interface SupplementTimingRule {
  supplementId: SupplementId;
  timingStrategy: 'wake' | 'pre_workout' | 'post_workout' | 'with_meal' | 'bedtime' | 'midday';
  offsetMinutes?: number; // offset from anchor time
  withFood: boolean;
  notes: string;
  warningConditions?: {
    avoidAfterHour?: number; // 24-hour format
    requiresFat?: boolean;
  };
}

export interface UserSchedule {
  wakeTime: string; // "06:00"
  trainingTime: string; // "17:00"
  bedTime: string; // "22:00"
  selectedSupplements: SupplementId[];
}

export interface ScheduledSupplement {
  time: string;
  timeMinutes: number; // for sorting
  supplement: Supplement;
  withFood: boolean;
  notes: string;
  warning?: string;
}

export const SUPPLEMENTS: Record<SupplementId, Supplement> = {
  multivitamin: {
    id: 'multivitamin',
    name: 'Multivitamin',
    description: 'Complete daily micronutrient support',
    category: 'vitamin',
  },
  vitamin_d: {
    id: 'vitamin_d',
    name: 'Vitamin D3',
    description: 'Supports bone health, immunity, and testosterone',
    category: 'vitamin',
  },
  omega_3: {
    id: 'omega_3',
    name: 'Omega-3 Fish Oil',
    description: 'Anti-inflammatory, heart health, joint support',
    category: 'vitamin',
  },
  creatine: {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    description: 'Increases strength, power, and muscle mass',
    category: 'performance',
  },
  magnesium: {
    id: 'magnesium',
    name: 'Magnesium',
    description: 'Supports muscle recovery, sleep quality, and relaxation',
    category: 'mineral',
  },
  caffeine: {
    id: 'caffeine',
    name: 'Caffeine',
    description: 'Pre-workout energy and focus booster',
    category: 'performance',
  },
  whey: {
    id: 'whey',
    name: 'Whey Protein',
    description: 'Fast-digesting protein for muscle recovery',
    category: 'protein',
  },
  casein: {
    id: 'casein',
    name: 'Casein Protein',
    description: 'Slow-digesting protein for overnight recovery',
    category: 'protein',
  },
};

export const TIMING_RULES: SupplementTimingRule[] = [
  {
    supplementId: 'multivitamin',
    timingStrategy: 'wake',
    offsetMinutes: 30, // 30 min after wake (with breakfast)
    withFood: true,
    notes: 'Take with breakfast for better absorption. Fat-soluble vitamins (A, D, E, K) absorb better with food.',
  },
  {
    supplementId: 'vitamin_d',
    timingStrategy: 'wake',
    offsetMinutes: 30, // with breakfast
    withFood: true,
    notes: 'Take with a fat-containing meal for optimal absorption (fat-soluble vitamin).',
    warningConditions: {
      requiresFat: true,
    },
  },
  {
    supplementId: 'omega_3',
    timingStrategy: 'with_meal',
    offsetMinutes: 30, // with breakfast
    withFood: true,
    notes: 'Take with meals to reduce fishy aftertaste and improve absorption.',
  },
  {
    supplementId: 'creatine',
    timingStrategy: 'post_workout',
    offsetMinutes: 30, // 30 min post-workout
    withFood: false,
    notes: 'Daily timing less critical than consistency. Post-workout may improve uptake slightly.',
  },
  {
    supplementId: 'magnesium',
    timingStrategy: 'bedtime',
    offsetMinutes: -60, // 60 min before bed
    withFood: false,
    notes: 'Promotes relaxation and sleep quality. Take 60-90 minutes before bed.',
  },
  {
    supplementId: 'caffeine',
    timingStrategy: 'pre_workout',
    offsetMinutes: -45, // 45 min before workout
    withFood: false,
    notes: 'Peak effects occur 30-60 min after consumption. Avoid within 6 hours of bedtime.',
    warningConditions: {
      avoidAfterHour: 16, // Don't take after 4pm
    },
  },
  {
    supplementId: 'whey',
    timingStrategy: 'post_workout',
    offsetMinutes: 15, // within 15-30 min post-workout
    withFood: false,
    notes: 'Fast-digesting protein ideal for post-workout anabolic window (0-60 min).',
  },
  {
    supplementId: 'casein',
    timingStrategy: 'bedtime',
    offsetMinutes: -45, // 45 min before bed
    withFood: false,
    notes: 'Slow-digesting protein provides amino acids throughout the night.',
  },
];

/**
 * Convert "HH:MM" time string to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to "HH:MM" format
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Convert 24-hour time to 12-hour AM/PM format
 */
export function formatTime12Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Calculate supplement timing based on user schedule
 */
export function calculateSupplementSchedule(schedule: UserSchedule): ScheduledSupplement[] {
  const wakeMinutes = timeToMinutes(schedule.wakeTime);
  const trainingMinutes = timeToMinutes(schedule.trainingTime);
  const bedMinutes = timeToMinutes(schedule.bedTime);
  
  const scheduledSupplements: ScheduledSupplement[] = [];
  
  // Process each selected supplement
  schedule.selectedSupplements.forEach(suppId => {
    const supplement = SUPPLEMENTS[suppId];
    const rule = TIMING_RULES.find(r => r.supplementId === suppId);
    
    if (!rule) return;
    
    let scheduledTimeMinutes: number;
    let warning: string | undefined;
    
    // Determine timing based on strategy
    switch (rule.timingStrategy) {
      case 'wake':
        scheduledTimeMinutes = wakeMinutes + (rule.offsetMinutes || 0);
        break;
        
      case 'pre_workout':
        scheduledTimeMinutes = trainingMinutes + (rule.offsetMinutes || 0);
        
        // Check if pre-workout timing is too late
        if (rule.warningConditions?.avoidAfterHour) {
          const scheduledHour = Math.floor(scheduledTimeMinutes / 60);
          if (scheduledHour >= rule.warningConditions.avoidAfterHour) {
            warning = `⚠️ Training time is late. ${supplement.name} may interfere with sleep. Consider skipping or moving workout earlier.`;
          }
        }
        break;
        
      case 'post_workout':
        scheduledTimeMinutes = trainingMinutes + (rule.offsetMinutes || 0);
        break;
        
      case 'with_meal':
        // Default to breakfast (wake + 30 min)
        scheduledTimeMinutes = wakeMinutes + 30;
        break;
        
      case 'midday':
        // Midday = halfway between wake and bed
        scheduledTimeMinutes = Math.floor((wakeMinutes + bedMinutes) / 2);
        break;
        
      case 'bedtime':
        scheduledTimeMinutes = bedMinutes + (rule.offsetMinutes || 0);
        break;
        
      default:
        scheduledTimeMinutes = wakeMinutes;
    }
    
    // Normalize time to 24-hour range
    if (scheduledTimeMinutes < 0) scheduledTimeMinutes += 24 * 60;
    if (scheduledTimeMinutes >= 24 * 60) scheduledTimeMinutes -= 24 * 60;
    
    scheduledSupplements.push({
      time: minutesToTime(scheduledTimeMinutes),
      timeMinutes: scheduledTimeMinutes,
      supplement,
      withFood: rule.withFood,
      notes: rule.notes,
      warning,
    });
  });
  
  // Sort by time
  return scheduledSupplements.sort((a, b) => {
    // Handle midnight wraparound
    let aTime = a.timeMinutes;
    let bTime = b.timeMinutes;
    
    // If wake time is late (e.g., noon), adjust times before wake to next day
    if (wakeMinutes > 12 * 60) {
      if (aTime < wakeMinutes && aTime < 12 * 60) aTime += 24 * 60;
      if (bTime < wakeMinutes && bTime < 12 * 60) bTime += 24 * 60;
    }
    
    return aTime - bTime;
  });
}

/**
 * Get grouped supplements by timing anchor point
 */
export function groupSupplementsByTiming(scheduled: ScheduledSupplement[], userSchedule: UserSchedule): {
  label: string;
  time: string;
  supplements: ScheduledSupplement[];
}[] {
  const wakeMinutes = timeToMinutes(userSchedule.wakeTime);
  const trainingMinutes = timeToMinutes(userSchedule.trainingTime);
  const bedMinutes = timeToMinutes(userSchedule.bedTime);
  
  const groups: { label: string; time: string; supplements: ScheduledSupplement[] }[] = [];
  const grouped = new Map<string, ScheduledSupplement[]>();
  
  scheduled.forEach(item => {
    const timeDiff = Math.abs(item.timeMinutes - wakeMinutes);
    const trainingDiff = Math.abs(item.timeMinutes - trainingMinutes);
    const bedDiff = Math.abs(item.timeMinutes - bedMinutes);
    
    let label: string;
    
    // Determine which anchor point this is closest to
    if (timeDiff <= 60) {
      label = '🌅 Morning (Wake Up)';
    } else if (trainingDiff <= 90) {
      label = '💪 Training Window';
    } else if (bedDiff <= 90) {
      label = '🌙 Evening (Bedtime)';
    } else {
      label = '☀️ Midday';
    }
    
    if (!grouped.has(label)) {
      grouped.set(label, []);
    }
    grouped.get(label)!.push(item);
  });
  
  // Convert to array and maintain order
  const order = ['🌅 Morning (Wake Up)', '☀️ Midday', '💪 Training Window', '🌙 Evening (Bedtime)'];
  
  order.forEach(label => {
    if (grouped.has(label)) {
      const items = grouped.get(label)!;
      groups.push({
        label,
        time: items.length > 0 ? items[0].time : '',
        supplements: items,
      });
    }
  });
  
  return groups;
}

/**
 * Get recommended supplement stack based on goal
 */
export function getRecommendedStack(goal: 'muscle_building' | 'general_health' | 'performance'): SupplementId[] {
  const stacks: Record<string, SupplementId[]> = {
    muscle_building: ['multivitamin', 'vitamin_d', 'omega_3', 'creatine', 'whey', 'casein'],
    general_health: ['multivitamin', 'vitamin_d', 'omega_3', 'magnesium'],
    performance: ['multivitamin', 'creatine', 'caffeine', 'whey', 'magnesium'],
  };
  
  return stacks[goal] || [];
}
