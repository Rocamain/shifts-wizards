import { Employee } from "../employees/employees";
import { DayShiftsMap, EmployeeRole, Shift, Slot, Week, Weekday } from "./rota";

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

export const getWeekHours = ({
  week,
  role,
}: {
  week: Week;
  role?: EmployeeRole;
}): number => {
  let total = 0;
  if (role) {
    for (const dayMap of week.values()) {
      for (const shift of dayMap.values()) {
        if (shift.employeeRole === role) {
          total += calculateShiftHours(shift as Shift);
        }
      }
    }
  } else {
    for (const dayMap of week.values()) {
      for (const shift of dayMap.values()) {
        total += calculateShiftHours(shift as Shift);
      }
    }
  }
  return total;
};

export const setGradient = (percentage: number) => {
  const arcAngle = (percentage / 100) * 360;
  if (arcAngle <= 0) {
    return `bg-white`;
  }

  return `conic-gradient(from 0deg, rgb(255, 255, 255) 0deg, rgb(58, 118, 228) ${arcAngle}deg, rgb(28, 78, 241) ${arcAngle}deg, rgb(255, 255, 255) ${arcAngle}deg 360deg)`;
};

export const toMillis = (t: string) => new Date(`1970-01-01T${t}`).getTime();

const isOverlap = ({
  shiftStart,
  unavailableStart,
  shiftEnd,
  unavailableEnd,
}: {
  shiftStart: number;
  unavailableStart: number;
  shiftEnd: number;
  unavailableEnd: number;
}) => {
  return (
    (shiftStart < unavailableEnd && shiftEnd > unavailableStart) || // Shift overlaps with unavailable period
    shiftStart === unavailableStart || // Exact match at start
    shiftEnd === unavailableEnd
  );
};

export function isEmployeeAvailableForShift(employee: Employee, shift: Shift) {
  if (
    shift.employeeRole === employee.role ||
    (shift.employeeRole === "BAKER" && employee.isBaker)
  ) {
    for (const unavailable of employee.unavailableDates) {
      if (unavailable.day === shift.day) {
        const shiftStart = toMillis(shift.startTime);
        const shiftEnd = toMillis(shift.endTime);

        const unavailableStart = toMillis(unavailable.timeFrame.start);
        const unavailableEnd = toMillis(unavailable.timeFrame.end);

        // Check for overlap
        if (
          isOverlap({ shiftStart, unavailableStart, shiftEnd, unavailableEnd })
        ) {
          return false; // Shift is not available
        }
      }
    }
    return true; // If no overlap is found, the shift is available
  }
  return false; // Employee does not have the required role
}

export const serializeWeek = (week: Week): string => {
  const serializable: [Weekday, [string, Shift][]][] = Array.from(
    week.entries()
  ).map(([day, shiftMap]) => [day, Array.from(shiftMap.entries())]);
  return JSON.stringify(serializable);
};

export const deserializeWeek = (json: string): Week => {
  const parsed = JSON.parse(json) as [Weekday, [string, Shift][]][];
  return new Map(parsed.map(([day, shiftArray]) => [day, new Map(shiftArray)]));
};

const ROLE_PRIORITY: Record<EmployeeRole, number> = {
  TL: 0,
  BAKER: 1,
  CTM: 2,
};

export const sortDayGroupedByRole = (map: DayShiftsMap): DayShiftsMap => {
  const parseMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const entries = Array.from(map.entries());

  entries.sort(([, a], [, b]) => {
    // 1) Role priority
    const roleDiff =
      ROLE_PRIORITY[a.employeeRole] - ROLE_PRIORITY[b.employeeRole];
    if (roleDiff !== 0) return roleDiff;

    // 2) Start time
    const startA = parseMin(a.startTime);
    const startB = parseMin(b.startTime);
    if (startA !== startB) return startA - startB;

    // 3) Duration
    const durA = parseMin(a.endTime) - startA;
    const durB = parseMin(b.endTime) - startB;
    return durA - durB;
  });

  return new Map(entries);
};

export const makeUpdatedShift = (
  original: Shift,
  employeeId: string | null
): Shift => {
  return {
    ...original,
    employee: employeeId ?? original.employee,
    finalCandidate: employeeId,
    candidates: employeeId ? [employeeId] : original.candidates,
  };
};

export const clampTime = (
  prevTime: string,
  newTime: string,
  min?: string,
  max?: string
): string => {
  const t = toMillis(newTime);

  if (max && t > toMillis(max)) return prevTime;
  if (min && t < toMillis(min)) return prevTime;

  return newTime;
};

export const roundUpToQuarter = (time: string): string => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m;
  const rounded = Math.ceil(total / 15) * 15;
  const hours = Math.floor(rounded / 60) % 24;
  const minutes = rounded % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Build a structured list of 15-minute slots. */
export const buildSlots = (times: string[]): Slot[] => {
  const hours = times.filter((t) => /^\d{2}:\d{2}$/.test(t));
  if (hours.length === 0) return [];

  const start = toMinutes(hours[0]);
  const end = toMinutes(hours[hours.length - 1]);
  const out: Slot[] = [];

  for (let m = start; m <= end; m += 15) {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    const time = `${hh}:${mm}`;
    const isWhole = mm === "00";
    const isHalf = mm === "30";
    out.push({
      time,
      isWhole,
      isHalf,
      label: isWhole ? time : null,
    });
  }
  return out;
};

export const clearShiftAssignments = (week: Week): Week => {
  const cleared = new Map<Weekday, Map<string, Shift>>();

  for (const [day, shiftsMap] of week) {
    const newDayMap = new Map<string, Shift>();

    for (const [id, shift] of shiftsMap) {
      delete shift.employee;
      delete shift.finalCandidate;
      newDayMap.set(id, {
        ...shift,
        employee: undefined,
      });
    }

    cleared.set(day, newDayMap);
  }

  return cleared;
};

export function shiftHours(shift: Shift): number {
  const [h1, m1] = shift.startTime.split(":").map(Number);
  const [h2, m2] = shift.endTime.split(":").map(Number);
  const hours = h2 + m2 / 60 - (h1 + m1 / 60);
  if (hours < 8) {
    return hours;
  }

  return hours - 0.5;
}
/**
 * Calculate the paid hours for a single shift.
 * – Handles shifts that cross midnight.
 * – Deducts a 30-minute break once if the gross duration exceeds 8 hours.
 * – Rounds to two decimal places.
 */
export function calculateShiftHours(shift: Shift): number {
  const [h1, m1] = shift.startTime.split(":").map(Number);
  const [h2, m2] = shift.endTime.split(":").map(Number);

  // eslint-disable-next-line prefer-const
  let startMin = h1 * 60 + m1;
  let endMin = h2 * 60 + m2;

  if (endMin <= startMin) {
    endMin += 24 * 60; // crosses midnight
  }

  const grossMin = endMin - startMin;
  let hours = grossMin / 60;

  // unpaid break if over 6h
  if (hours >= 8) {
    hours -= 0.5;
  }

  return Math.round(hours * 100) / 100;
}

export function calculateRoleShiftHours(
  shifts: Shift[],
  role: EmployeeRole
): number {
  return shifts
    .filter((shift) => shift.employeeRole === role)
    .map(calculateShiftHours)
    .reduce((sum, h) => sum + h, 0);
}

/**
 * Sum up paid hours over an array of shifts.
 */

export function restHoursBetweenShifts({
  prevShift,
  shift,
}: {
  prevShift: Shift;
  shift: Shift;
}): number {
  const prevEnd = new Date(`1970-01-01T${prevShift.endTime}`).getTime();
  const newStart = new Date(`1970-01-02T${shift.startTime}`).getTime();
  return (newStart - prevEnd) / (1000 * 60 * 60);
}

export type RoleHours = {
  total: number;
  assigned: number;
  remaining: number;
};

/**
 * Compute total/assigned/remaining hours by role across the whole week.
 */
export function summarizeHoursByRole(
  week: Week
): Record<EmployeeRole, RoleHours> {
  // 1. Flatten all the shifts into a single array
  const allShifts: Shift[] = Array.from(week.values()).flatMap((dayMap) =>
    Array.from(dayMap.values())
  );

  // 2. Filter to only those shifts that have been assigned
  const assignedShifts = allShifts.filter(
    (s) => Boolean(s.employee) && s.employee !== "unassigned"
  );

  // 3. Prepare the output object
  const out: Record<EmployeeRole, RoleHours> = {
    TL: { total: 0, assigned: 0, remaining: 0 },
    CTM: { total: 0, assigned: 0, remaining: 0 },
    BAKER: { total: 0, assigned: 0, remaining: 0 },
  };

  // 4. Compute totals per role via calculateRoleShiftHours
  (["TL", "CTM", "BAKER"] as EmployeeRole[]).forEach((role) => {
    const total = calculateRoleShiftHours(allShifts, role);
    const assigned = calculateRoleShiftHours(assignedShifts, role);
    const remaining = Math.round((total - assigned) * 100) / 100;

    out[role] = { total, assigned, remaining };
  });

  return out;
}
