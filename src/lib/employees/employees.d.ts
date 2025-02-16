import { Shift } from "../rota/rota";

export interface Employee {
  id: string;
  name: string;
  contractHours: number;
  unavailableDates: Array<{
    day: WeekDay;
    timeFrame: { start: string; end: string };
  }>;
  totalWorkedHours: number; // Tracking total worked hours to enforce contract
  assignedShifts: Shift[];
  lastShiftEndTime: string | null;
  role: "TL" | "CTM";
  color?: string;
  // Shifts assigned to the employee
}
