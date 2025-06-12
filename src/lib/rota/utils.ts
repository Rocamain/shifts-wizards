import { Employee } from "../employees/employees";
import { INITIAL_WEEK } from "./constants";
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

export const loadTemplates = (): Week => {
  const JSON_TL_TEMPLATE = localStorage.getItem("tl-template");
  const JSON_CTM_TEMPLATE = localStorage.getItem("ctm-template");
  const JSON_BAKER_TEMPLATE = localStorage.getItem("baker-template");

  if (JSON_TL_TEMPLATE && JSON_CTM_TEMPLATE && JSON_BAKER_TEMPLATE) {
    const storedShifts = JSON.parse(JSON_TL_TEMPLATE) as Week;

    return storedShifts;
  } else {
    localStorage.setItem("intial_week", JSON.stringify(INITIAL_WEEK));

    return INITIAL_WEEK;
  }
};

export const rotaMapToArray = (week?: Week): Shift[][] => {
  if (!week) {
    console.warn("rotaMapToArray called with undefined week");
    return [];
  }
  return Array.from(week.values()).map((shiftMap) =>
    Array.from(shiftMap.values())
  );
};
export const serializeWeek = (week: Week): string => {
  const serializable = Array.from(week.entries()).map(([, shiftMap]) => [
    Array.from(shiftMap.entries()),
  ]);
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
    employee: employeeId ?? undefined,
    finalCandidate: employeeId,
    candidates: employeeId ? [employeeId] : undefined,
  };
};

export function canDoShift(employee: Employee, shift: Shift) {
  if (
    shift.employeeRole === employee.role ||
    (shift.employeeRole === "BAKER" && employee.isBaker)
  ) {
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
  return false; // Employee does not have the required role
}

export function addCandidatesToShift(
  employees: Employee[],
  shift: Shift
): Shift {
  shift.candidates = employees.reduce<string[]>((acc, employee) => {
    if (isEmployeeAvailableForShift(employee, shift)) {
      acc.push(employee.id);
    }
    return acc; // Ensure the accumulator is returned
  }, []);

  return shift;
}

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
  // initialize accumulators
  const out: Record<EmployeeRole, RoleHours> = {
    TL: { total: 0, assigned: 0, remaining: 0 },
    BAKER: { total: 0, assigned: 0, remaining: 0 },
    CTM: { total: 0, assigned: 0, remaining: 0 },
  };

  // walk every shift in every day
  for (const dayMap of week.values()) {
    for (const shift of dayMap.values()) {
      const hrs = shiftHours(shift);
      out[shift.employeeRole].total += hrs;

      // Only count as assigned if shift.employee exists and is not "unassigned"
      if (shift.employee && shift.employee !== "unassigned") {
        out[shift.employeeRole].assigned += hrs;
      }
    }
  }

  // compute remaining = total − assigned
  for (const role of Object.keys(out) as EmployeeRole[]) {
    out[role].remaining = out[role].total - out[role].assigned;
  }
  return out;
}
