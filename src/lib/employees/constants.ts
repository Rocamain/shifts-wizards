import { Employee } from "./employees";
export const EMPLOYEES: Employee[] = [
  {
    id: "4",
    name: "David",
    contractHours: 30,
    unavailableDates: [
      { day: 5, timeFrame: { start: "06:00", end: "14:00" } },
      { day: 4, timeFrame: { start: "06:00", end: "14:00" } },
    ],
    totalWorkedHours: 0, // Initial worked hours
    assignedShifts: [], // Initial assigned shifts
    lastShiftEndTime: null,
    role: "TL",
  },
  {
    id: "2",
    name: "Bob",
    contractHours: 30,
    unavailableDates: [
      { day: 1, timeFrame: { start: "14:00", end: "22:00" } },
      { day: 2, timeFrame: { start: "14:00", end: "22:00" } },
      { day: 3, timeFrame: { start: "14:00", end: "22:00" } },
    ],
    totalWorkedHours: 0, // Initial worked hours
    assignedShifts: [], // Initial assigned shifts
    lastShiftEndTime: null,
    role: "TL",
  },
  {
    id: "3",
    name: "Charlie",
    contractHours: 30,
    unavailableDates: [{ day: 3, timeFrame: { start: "06:00", end: "22:00" } }],
    totalWorkedHours: 0, // Initial worked hours
    assignedShifts: [], // Initial assigned shifts
    lastShiftEndTime: null,
    role: "TL",
  },

  {
    id: "1",
    name: "Alice",
    contractHours: 30,
    unavailableDates: [
      { day: 0, timeFrame: { start: "06:00", end: "14:00" } },
      { day: 2, timeFrame: { start: "14:00", end: "22:00" } },
    ],
    totalWorkedHours: 0, // Initial worked hours
    assignedShifts: [],
    // Initial assigned shifts
    lastShiftEndTime: null,
    role: "TL",
  },
];
