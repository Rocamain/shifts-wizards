import { Week } from "./rota";

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
  [0, new Map()],
  [1, new Map()],
  [2, new Map()],
  [3, new Map()],
  [4, new Map()],
  [5, new Map()],
  [6, new Map()],
]);
