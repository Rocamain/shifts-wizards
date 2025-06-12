"use client";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { Employee } from "@/lib/employees/employees";
import { EmployeeRole } from "@/lib/rota/rota";
import { shiftHours } from "@/lib/rota/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

type EmployeesHoursProps = {
  roleHours: number;
  unassignedHours: number;
  employeeRole?: EmployeeRole;
};

// renamed to avoid collision with state variable
const computeEmployeesHours = (
  employees: Employee[],
  employeeRole?: EmployeeRole
) => {
  return employees
    .filter((e) => {
      if (employeeRole) {
        return e.role === employeeRole;
      }
      return true;
    })
    .reduce(
      (acc, emp) => {
        acc.contractHours += emp.contractHours;

        const shiftsHours = emp.assignedShifts.reduce(
          (accShift, shift) => (accShift += shiftHours(shift)),
          0
        );

        acc.assignedHours += shiftsHours;
        return acc;
      },
      { contractHours: 0, assignedHours: 0 }
    );
};

export default function EmployeesHours({
  roleHours,
  unassignedHours,
  employeeRole,
}: EmployeesHoursProps) {
  const { employees } = useEmployeeContext();
  const [hoursSummary, setHoursSummary] = useState<{
    contractHours: number;
    assignedHours: number;
  }>({
    contractHours: 0,
    assignedHours: 0,
  });

  useEffect(() => {
    if (employees.length > 0) {
      const summary = computeEmployeesHours(employees, employeeRole);
      setHoursSummary(summary);
    } else {
      // reset if no employees
      setHoursSummary({ contractHours: 0, assignedHours: 0 });
    }
  }, [employees, employeeRole]);

  const remaining = hoursSummary.contractHours - hoursSummary.assignedHours;

  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg shadow-md mx-auto w-[200px] ">
      <h4 className="text-lg font-semibold text-gray-700 mb-3">
        Hours Summary
      </h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="font-medium text-gray-500">Shift Hours</p>
          <p className="text-gray-900">{roleHours}h</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Unassigned</p>
          <p
            className={clsx(
              "font-semibold",
              unassignedHours === 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {unassignedHours}h
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Contract</p>
          <p className="text-gray-900">{hoursSummary.contractHours}h</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Remaining</p>
          <p
            className={clsx(
              "font-semibold",
              remaining >= 0 ? "text-red-600" : "text-green-600"
            )}
          >
            {remaining}h
          </p>
        </div>
      </div>
    </div>
  );
}
