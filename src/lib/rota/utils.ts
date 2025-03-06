import { Employee } from "../employees/employees";
import { Shift } from "./rota";

export function generateHoursArray({
  open,
  close,
}: {
  open: string;
  close: string;
}): string[] {
  const result: string[] = [];
  if (!open || !close) {
    return [];
  }
  const startHour = parseInt(open.split(":")[0], 10);
  const endHour = parseInt(close.split(":")[0], 10);

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    result.push(`${formattedHour}:00`);
  }

  return ["Times", ...result];
}

export const getDayhours = (shifts: Shift[]) => {
  return shifts.reduce((total, shift) => {
    const hours = calculateShiftHours(shift);
    return total + (isNaN(hours) ? 0 : hours);
  }, 0);
};

export const calculateShiftHours = ({ endTime, startTime }: Shift) => {
  const hours =
    (new Date(`1970-01-01T${endTime}`).getTime() -
      new Date(`1970-01-01T${startTime}`).getTime()) /
    (1000 * 60 * 60);

  if (hours < 8) {
    return hours;
  }

  return hours - 0.5;
};

export const setGradient = (percentage: number) => {
  const arcAngle = (percentage / 100) * 360;
  if (arcAngle <= 0) {
    return `conic-gradient(from 0deg, rgb(195, 197, 191) 0deg, rgb(195, 197, 191) 360deg 360deg)`;
  }

  return `conic-gradient(from 0deg, rgb(195, 197, 191) 0deg, rgb(58, 118, 228) ${arcAngle}deg, rgb(28, 78, 241) ${arcAngle}deg, rgb(195, 197, 191) ${arcAngle}deg 360deg)`;
};

export function isEmployeeAvailableForShift(employee: Employee, shift: Shift) {
  for (const unavailable of employee.unavailableDates) {
    if (unavailable.day === shift.day) {
      const shiftStart = new Date(`1970-01-01T${shift.startTime}`).getTime();
      const shiftEnd = new Date(`1970-01-01T${shift.endTime}`).getTime();

      const unavailableStart = new Date(
        `1970-01-01T${unavailable.timeFrame.start}`
      ).getTime();
      const unavailableEnd = new Date(
        `1970-01-01T${unavailable.timeFrame.end}`
      ).getTime();

      // Check for overlap
      if (
        (shiftStart < unavailableEnd && shiftEnd > unavailableStart) || // Shift overlaps with unavailable period
        shiftStart === unavailableStart || // Exact match at start
        shiftEnd === unavailableEnd // Exact match at end
      ) {
        return false; // Shift is not available
      }
    }
  }
  return true; // If no overlap is found, the shift is available
}
