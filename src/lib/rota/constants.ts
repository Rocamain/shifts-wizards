import { Shift, Week } from "./rota";

enum Weekday {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export const WEEKDAYS = [
  Weekday.SUNDAY,
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
];

export const WEEKDAY_NAMES: { [key in Weekday]: string } = {
  [Weekday.SUNDAY]: "Sunday",
  [Weekday.MONDAY]: "Monday",
  [Weekday.TUESDAY]: "Tuesday",
  [Weekday.WEDNESDAY]: "Wednesday",
  [Weekday.THURSDAY]: "Thursday",
  [Weekday.FRIDAY]: "Friday",
  [Weekday.SATURDAY]: "Saturday",
};

export const INITIAL_WEEK: Week = new Map([
  [0, new Map<string, Shift>()],
  [1, new Map<string, Shift>()],
  [2, new Map<string, Shift>()],
  [3, new Map<string, Shift>()],
  [4, new Map<string, Shift>()],
  [5, new Map<string, Shift>()],
  [6, new Map<string, Shift>()],
]);

export const MAX_HOURS_PER_DAY = 13;

export const QUARTER_HOUR = 15 * 60; // 900 s

export const QUARTER_HOUR_MS = 15 * 60 * 1000; // 900000 ms
