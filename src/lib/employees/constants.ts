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
    totalWorkedHours: 0,
    assignedShifts: [],
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
    totalWorkedHours: 0,
    assignedShifts: [],
    lastShiftEndTime: null,
    role: "TL",
  },
  {
    id: "3",
    name: "Charlie",
    contractHours: 30,
    unavailableDates: [{ day: 3, timeFrame: { start: "06:00", end: "22:00" } }],
    totalWorkedHours: 0,
    assignedShifts: [],
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
    totalWorkedHours: 0,
    assignedShifts: [],

    lastShiftEndTime: null,
    role: "TL",
  },
];

export const COLORS = [
  "bg-amber-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-lime-500",
  "bg-amber-300",
  "bg-orange-300",
  "bg-yellow-300",
  "bg-green-300",
  "bg-teal-300",
  "bg-blue-300",
  "bg-lime-300",
  "bg-green-700",
  "bg-teal-700",
  "bg-blue-700",
  "bg-lime-700",
  "bg-amber-700",
];
