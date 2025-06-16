"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Employee } from "../employees";
import { getEmployeeColor, getEmployeesByRole, loadEmployees } from "../utils";
import { EmployeeRole, Shift } from "@/lib/rota/rota";
import { calculateShiftHours } from "@/lib/rota/utils";
import { usePathname } from "next/navigation";

interface EmployeeContextType {
  employees: Employee[];
  selectedEmployees: Array<string | undefined>;
  addShiftToEmployee: (employeeId: string, shift: Shift) => void;
  removeShiftToEmployee: (employeeId: string, shift: Shift) => void;
  removeSelectedEmployee: (employeeId: string) => void;
  addSelectedEmployee: (employeeId: string) => void;
  addEmployee: (employee: Employee) => void;
  removeEmployee: (employeeId: string) => void;
  filterSelectedEmployees: (employeesToFilter: string[]) => void;
  resetHoursToEmployees: () => void;
  updateEmployee: (employeeId: string, updatedData: Partial<Employee>) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<
    Array<string | undefined>
  >([]);

  const pathname = usePathname();

  useEffect(() => {
    const storedEmployees = loadEmployees();

    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    const roleFromPath = pathname.split("/")[2]?.toUpperCase() as EmployeeRole;
    if (roleFromPath && employees) {
      const employyeByRole = getEmployeesByRole(employees, roleFromPath);
      setSelectedEmployees([
        "unassigned",
        ...employyeByRole.map((employee) => employee.id, "unassigned"),
      ]);
    }
  }, [pathname, employees]);
  const removeEmployee = useCallback((employeeId: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  }, []);

  const addEmployee = useCallback((newEmployee: Employee) => {
    const employeesWithColors = [...employees, newEmployee].map((employee) => ({
      ...employee,
      color: getEmployeeColor(employee.id),
    }));

    localStorage.setItem("employees", JSON.stringify(employeesWithColors));

    setEmployees(employeesWithColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterSelectedEmployees = useCallback(
    (employeesToFilter: string[]) => {
      const filteredEmployees = employees
        .filter((employee) => employeesToFilter.includes(employee.id))
        .map((employee) => employee.id);

      setSelectedEmployees(filteredEmployees);
    },
    [employees]
  );

  const addSelectedEmployee = useCallback((employeeId: string) => {
    setSelectedEmployees((prev) => [...prev, employeeId]);
  }, []);
  const removeSelectedEmployee = useCallback((employeeId: string) => {
    setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId));
  }, []);

  const addShiftToEmployee = useCallback((employeeId: string, shift: Shift) => {
    setEmployees((prev) => {
      const employees = prev.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            totalWorkedHours:
              employee.totalWorkedHours + calculateShiftHours(shift),
            assignedShifts: [...employee.assignedShifts, shift],
          };
        }
        return employee;
      });
      // localStorage.setItem("employees", JSON.stringify(employees));
      return employees;
    });
  }, []);

  const resetHoursToEmployees = useCallback(() => {
    setEmployees((prev) => {
      const employees = prev.map((employee) => {
        employee.assignedShifts = [];
        employee.totalWorkedHours = 0;
        return employee;
      });
      // localStorage.setItem("employees", JSON.stringify(employees));
      return employees;
    });
  }, []);

  const removeShiftToEmployee = useCallback(
    (employeeId: string, shiftToRemove: Shift) => {
      setEmployees((prev) => {
        return prev.map((employee) => {
          if (employee.id === employeeId) {
            return {
              ...employee,
              totalWorkedHours:
                employee.totalWorkedHours - calculateShiftHours(shiftToRemove),
              assignedShifts: [
                ...employee.assignedShifts.filter(
                  (shift) => shiftToRemove.id !== shift.id
                ),
              ],
            };
          }
          return employee;
        });
      });
    },
    []
  );

  const updateEmployee = useCallback(
    (employeeId: string, updatedData: Partial<Employee>) => {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === employeeId
            ? { ...employee, ...updatedData }
            : employee
        )
      );
    },
    []
  );

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployees,
        addSelectedEmployee,
        removeSelectedEmployee,
        addShiftToEmployee,
        removeShiftToEmployee,
        addEmployee,
        removeEmployee,
        filterSelectedEmployees,
        resetHoursToEmployees,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
