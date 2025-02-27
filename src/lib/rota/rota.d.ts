export type Shift = {
  id?: string;
  day: number;
  startTime: string;
  endTime: string;
  candidates?: string[];
  finalCandidate?: string | null;
  employee?: string;
  color?: string;
};

export type assignShiftToWeekDayWeek = [
  Shift[], // Sunday
  Shift[], // Monday
  Shift[], // Tuesday
  Shift[], // Wednesday
  Shift[], // Thursday
  Shift[], // Friday
  Shift[] // Saturday
];

export enum Weekday {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export type Shift = {
  id?: string;
  day: number;
  startTime: string;
  endTime: string;
  candidates?: string[];
  finalCandidate?: string | null;
  employee?: string;
  color?: string;
};

type Week = [Shift[], Shift[], Shift[], Shift[], Shift[], Shift[], Shift[]];
