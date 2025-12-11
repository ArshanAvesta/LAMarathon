import { WeekPlan } from './types';

export const TRAINING_PLAN: WeekPlan[] = [
  {
    id: 1,
    title: "Weeks 1-2: Build Your Base",
    dates: "Jan 1 - Jan 14",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Easy Run", details: "3-4 miles at conversational pace", type: "run" },
      { day: "Wednesday", activity: "Cross-train", details: "Cycling, swimming, or yoga", type: "cross" },
      { day: "Thursday", activity: "Speed Play", details: "3-4 miles easy with 4x100-yard sprints at the end", type: "workout" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "6-8 miles at easy pace", type: "run" },
      { day: "Sunday", activity: "Rest/Light", details: "Rest or light cross-training", type: "cross" },
    ]
  },
  {
    id: 3,
    title: "Weeks 3-4: Increase Endurance",
    dates: "Jan 15 - Jan 28",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Intervals", details: "2mi warm-up, 6x800m @ 10K pace (2min rest), 1mi cool down", type: "workout" },
      { day: "Wednesday", activity: "Cross-train", details: "Active recovery", type: "cross" },
      { day: "Thursday", activity: "Tempo Run", details: "1mi warm-up, 3mi @ (MP - 30s), 1mi cool down", type: "workout" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "10-12 miles at easy aerobic pace", type: "run" },
      { day: "Sunday", activity: "Rest/Cross", details: "Rest or cross-train", type: "cross" },
    ]
  },
  {
    id: 5,
    title: "Weeks 5-6: Build Speed & Distance",
    dates: "Jan 29 - Feb 11",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Speed Workout", details: "2mi warm-up, 3x1mi @ 10K pace (3min rest), 1mi recovery", type: "workout" },
      { day: "Wednesday", activity: "Rest/Cross", details: "Rest or cross-train", type: "cross" },
      { day: "Thursday", activity: "Steady Tempo", details: "2mi warm-up, 5mi @ tempo (Race Pace - 15-30s), 1mi cool down", type: "workout" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "15-18 miles (include 3-5 miles at goal MP in middle)", type: "run" },
      { day: "Sunday", activity: "Rest/Cross", details: "Rest or cross-train", type: "cross" },
    ]
  },
  {
    id: 7,
    title: "Week 7: Peak Training",
    dates: "Feb 12 - Feb 18",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Intervals", details: "2mi warm-up, 4x1mi @ 10K pace (3min recovery), 1mi cool down", type: "workout" },
      { day: "Wednesday", activity: "Rest/Cross", details: "Rest or cross-train", type: "cross" },
      { day: "Thursday", activity: "Tempo Run", details: "8 miles total (2mi warm-up, 5mi @ tempo, 1mi cool down)", type: "workout" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "20 miles (14mi easy, 5mi @ race pace, 1mi cool down)", type: "run" },
      { day: "Sunday", activity: "Rest", details: "Recovery day", type: "rest" },
    ]
  },
  {
    id: 8,
    title: "Week 8: Active Recovery",
    dates: "Feb 19 - Feb 25",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Easy Run", details: "5 miles easy", type: "run" },
      { day: "Wednesday", activity: "Rest/Cross", details: "Rest or cross-train", type: "cross" },
      { day: "Thursday", activity: "Easy w/ Pickups", details: "5 miles easy with light tempo pickups", type: "run" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "12 miles at easy pace", type: "run" },
      { day: "Sunday", activity: "Rest", details: "Recovery day", type: "rest" },
    ]
  },
  {
    id: 9,
    title: "Week 9: Taper Phase I",
    dates: "Feb 26 - Mar 3",
    days: [
      { day: "Monday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Tuesday", activity: "Easy Run", details: "5 miles (include 3 miles at race pace)", type: "run" },
      { day: "Wednesday", activity: "Rest/Light", details: "Rest or light cross-train", type: "cross" },
      { day: "Thursday", activity: "Easy Run", details: "5 miles easy", type: "run" },
      { day: "Friday", activity: "Rest", details: "Recovery day", type: "rest" },
      { day: "Saturday", activity: "Long Run", details: "8 miles easy", type: "run" },
      { day: "Sunday", activity: "Rest", details: "Recovery day", type: "rest" },
    ]
  },
  {
    id: 10,
    title: "Week 10: Race Week",
    dates: "Mar 4 - Mar 10",
    days: [
      { day: "Monday", activity: "Easy Run", details: "3 miles easy", type: "run" },
      { day: "Tuesday", activity: "Easy Run", details: "3 miles easy", type: "run" },
      { day: "Wednesday", activity: "Rest", details: "Rest", type: "rest" },
      { day: "Thursday", activity: "Shakeout", details: "3 miles (1mi easy, 1mi race pace, 1mi easy)", type: "run" },
      { day: "Friday", activity: "Rest", details: "Complete rest", type: "rest" },
      { day: "Saturday", activity: "Rest", details: "Complete rest, stretch, focus on strategy", type: "rest" },
      { day: "Sunday", activity: "RACE DAY", details: "LA Marathon! Good luck!", type: "race" },
    ]
  },
];
