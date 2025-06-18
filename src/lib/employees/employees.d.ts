import { Shift, WeekDay } from "../rota/rota";

export interface Employee {
  id: string;
  name: string;
  contractHours: number;
  unavailableDates: Array<{
    day: WeekDay;
    timeFrame: { start: string; end: string };
  }>;
  totalWorkedHours: number;
  assignedShifts: Shift[];
  lastShiftEndTime: string | null;
  role: "TL" | "CTM";
  isBaker: boolean;
  color?: string;
  accentColor?: string;
}

export interface UnassignedShiftEmployee {
  id: "unassigned";
  name: "Unassigned";
  color: "bg-gray-500";
  totalWorkedHours: number;
  assignedShifts: Shift[];
  contractHours: number;
  isBaker: boolean;
}
export type EmployeeRole = "TL" | "CTM" | "BAKER";
