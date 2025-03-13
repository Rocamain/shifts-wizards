"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Employee } from "../employees";
import {
  applyColors,
  getEmployeeColor,
  getPermutationBasedOnWeek,
  loadEmployees,
} from "../utils";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  removeEmployee: (employeeId: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = loadEmployees();
    const employeesWithColors = applyColors(storedEmployees);
    const permutedEmployees = getPermutationBasedOnWeek(employeesWithColors);
    setEmployees(permutedEmployees);
  }, []);

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

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        removeEmployee,
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
