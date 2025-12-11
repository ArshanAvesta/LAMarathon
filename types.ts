export interface RunLog {
  id: string;
  date: string;
  runnerName: string; // To support "me and my friends"
  distance: number; // miles
  duration: string; // HH:MM:SS
  pace: string; // min/mile
  notes: string;
}

export type ActivityType = 'rest' | 'run' | 'cross' | 'workout' | 'race';

export interface DayPlan {
  day: string;
  activity: string;
  details: string;
  type: ActivityType;
}

export interface WeekPlan {
  id: number;
  title: string;
  dates: string;
  days: DayPlan[];
}

export interface Tab {
  id: 'dashboard' | 'schedule' | 'logger' | 'calculator' | 'coach';
  label: string;
  icon: any;
}