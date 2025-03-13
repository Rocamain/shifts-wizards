import { COLORS } from "./constants";
import { Employee } from "./employees";
import { EMPLOYEES } from "./constants";

export const getEmployeeColor = (id: string): string => {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return COLORS[hash % COLORS.length];
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
  }));

export const loadEmployees = (): Employee[] => {
  const JSON_Employees = localStorage.getItem("employees");
  if (JSON_Employees) {
    return JSON.parse(JSON_Employees) as Employee[];
  } else {
    localStorage.setItem("employees", JSON.stringify(EMPLOYEES));
    return EMPLOYEES;
  }
};
