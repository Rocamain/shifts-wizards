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
  color?: string;
}
