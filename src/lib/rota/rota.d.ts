export type Shift = {
  id: string;
  day: Weekday;
  startTime: string;
  endTime: string;
  candidates?: string[];
  finalCandidate?: string | null;
  employee?: string;
  employeeRole: EmployeeRole;
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

export type Weekday = (typeof Weekday)[keyof typeof Weekday];

export type EmployeeRole = "TL" | "CTM" | "BAKER";

export type DayShiftsMap = Map<string, Shift>;

export type Week = Map<Weekday, DayShiftsMap>;

export type OpeningTimes = {
  open: string;
  close: string;
};
export type OpeningTimesState = OpeningTimes[];

export type Slot = {
  time: string; // "09:15"
  isWhole: boolean; // :00
  isHalf: boolean; // :30
  label: string | null; // "09:00" | "30" | null
};
