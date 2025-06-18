import { COLORS, ACCENT_COLORS } from "./constants";
import { Employee } from "./employees";
import { EMPLOYEES } from "./constants";
import { getDayhours, restHoursBetweenShifts } from "../rota/utils";
import { Shift, Week, Weekday } from "../rota/rota";
import { MAX_HOURS_PER_DAY } from "../rota/constants";

export const getEmployeeColor = (id: string): string => {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return COLORS[hash % COLORS.length];
};
export const getEmployeeAccentColor = (id: string): string => {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
};

function getCurrentWeekNumber() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const days: number = Math.floor(
    (today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((days + 1) / 7);
  return weekNumber + 7;
}

function getNthPermutation(arr: Employee[], n: number): Employee[] {
  const result = [];
  const numbers = arr.slice(); // Clone the array to work on
  let k = n - 1; // Convert to 0-based index
  const len = arr.length;

  // Factorial cache to avoid recalculating factorial every time
  const factorials = [1];
  for (let i = 1; i <= len; i++) {
    factorials[i] = factorials[i - 1] * i;
  }

  for (let i = 0; i < len; i++) {
    const fact = factorials[len - 1 - i];
    const index = Math.floor(k / fact);
    result.push(numbers.splice(index, 1)[0]);
    k %= fact;
  }

  return result;
}

function factorial(n: number) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function getPermutationBasedOnWeek(arr: Employee[]): Employee[] {
  const weekNumber = getCurrentWeekNumber();

  // Get all possible permutations count (n!)
  const numPermutations = factorial(arr.length);

  // Map the week number to the corresponding permutation index
  const index = (weekNumber - 1) % numPermutations;

  // Get the nth permutation directly
  return getNthPermutation(arr, index + 1); // 1-based index for permutations
}

export const applyColors = (employees: Employee[]): Employee[] =>
  employees.map((employee) => ({
    ...employee,
    color: getEmployeeColor(employee.id),
    accentColor: getEmployeeAccentColor(employee.id),
  }));

export const loadEmployees = (): Employee[] => {
  const JSON_Employees = localStorage.getItem("employees");
  if (JSON_Employees) {
    const storedEmployees = JSON.parse(JSON_Employees) as Employee[];
    const permutedEmployees = getPermutationBasedOnWeek(storedEmployees);

    return permutedEmployees;
  } else {
    const employeesWithColors = applyColors(EMPLOYEES);
    const permutedEmployees = getPermutationBasedOnWeek(employeesWithColors);

    localStorage.setItem("employees", JSON.stringify(permutedEmployees));

    return permutedEmployees;
  }
};

export function getEmployeesByRole(
  employees: Employee[],
  employeeRole: "CTM" | "TL" | "BAKER" | "FULL"
): Employee[] {
  return employees.filter(({ role, isBaker }) => {
    if (employeeRole === "CTM" || employeeRole === "TL") {
      return role === employeeRole.toUpperCase();
    }
    if (employeeRole === "FULL") {
      return true;
    }

    if (employeeRole === "BAKER") {
      return isBaker;
    }

    return false;
  });
}

export const getEmployeesFromPath = (
  pathname: string,
  storedEmployees: Employee[]
) => {
  const employeeRole = pathname.split("/")[2];

  if (employeeRole === "ctm" || employeeRole === "tl") {
    return storedEmployees.filter(
      (employee) => employee.role === employeeRole.toUpperCase()
    );
  }

  if (employeeRole === "baker") {
    return storedEmployees.filter((employee) => employee.isBaker);
  }

  return storedEmployees;
};

function hoursWithNewShift(employee: Employee, newShift: Shift): number {
  const todays = employee.assignedShifts.filter((s) => s.day === newShift.day);
  return getDayhours([...todays, newShift]);
}

function hasCapacity(employee: Employee, newShift: Shift) {
  return hoursWithNewShift(employee, newShift) <= MAX_HOURS_PER_DAY;
}

export const getAvailableEmployees = (
  employees: Employee[],
  newShift: Shift,
  rota: Week
): Employee[] => {
  const day = newShift.day;
  const prevDay = day - 1;
  const nextDay = day + 1;

  return employees.filter((employee) => {
    // 1) Capacity check
    if (!hasCapacity(employee, newShift)) {
      return false;
    }

    // 2) Rest after previous-day shift
    if (rota.has(prevDay as Weekday)) {
      const prevShiftsMap = rota.get(prevDay as Weekday)!;
      // find any shift on prevDay assigned to this employee
      const prevShifts = Array.from(prevShiftsMap.values()).filter(
        (s) => s.employee === employee.id
      );
      for (const prevShift of prevShifts) {
        const restHours = restHoursBetweenShifts({
          prevShift,
          shift: newShift,
        });
        // restHoursBetweenShifts should compute newShift.startTime minus prevShift.endTime
        if (restHours < 11) {
          return false;
        }
      }
    }

    // 3) Rest before next-day shift
    if (rota.has(nextDay as Weekday)) {
      const nextShiftsMap = rota.get(nextDay as Weekday)!;
      const nextShifts = Array.from(nextShiftsMap.values()).filter(
        (s) => s.employee === employee.id
      );
      for (const nextShift of nextShifts) {
        const restHours = restHoursBetweenShifts({
          prevShift: newShift,
          shift: nextShift,
        });
        if (restHours < 11) {
          return false;
        }
      }
    }

    return true;
  });
};
