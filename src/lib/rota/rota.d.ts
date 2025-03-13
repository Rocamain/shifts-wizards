export type Shift = {
  id?: string;
  day: Weekday;
  startTime: string;
  endTime: string;
  candidates?: string[];
  finalCandidate?: string | null;
  employee?: string;
  color?: string;
};
export const Weekday = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

// This type represents the union of all Weekday values (0 | 1 | ... | 6)
export type Weekday = (typeof Weekday)[keyof typeof Weekday];
// Define an inner map to store shifts by their id for a specific day.
export type DayShiftsMap = Map<string, Shift>;

// Define the Week type as a Map with Weekday keys and DayShiftsMap values.
export type Week = Map<Weekday, DayShiftsMap>;
