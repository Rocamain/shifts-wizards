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
  return shifts!.reduce((a, shift) => {
    const hours = calculateShiftHours(shift);

    return a + hours;
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
