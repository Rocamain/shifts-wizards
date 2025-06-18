"use client";

import EmployeeCheckBox from "./EmployeeCheckBox";
import { EmployeeRole } from "@/lib/rota/rota";
import EmployeesHours from "./EmployeesHours";
import { Employee } from "@/lib/employees/employees";
import Box from "../Other/Box";

export default function RoleSection({
  title,
  employees,
  hours,
  onCheckBox,
  role,
}: {
  title: string;
  employees: Array<Employee>;
  hours: { total: number; remaining: number };
  onCheckBox: (id: string, checked: boolean) => void;
  role: EmployeeRole;
}) {
  // “Unassigned” stub, now explicitly cast to Employee
  const unassigned: Employee = {
    id: "unassigned",
    name: "Unassigned",
    color: "bg-gray-500",
    role: "CTM", // literal type "CTM"
    totalWorkedHours: hours.remaining,
    contractHours: 0,
    isBaker: true,
    lastShiftEndTime: null,
    assignedShifts: [],
    unavailableDates: [],
  };
  return (
    <Box title={title}>
      <div className="flex items-center gap-6 w-[820px]">
        <div className="grid grid-cols-3 gap-4 overflow-hidden whitespace-nowrap text-ellipsis border-2 border-gray-300 p-4 rounded-lg shadow-md p-4">
          {[unassigned, ...employees].map((emp) => (
            <div key={emp.id} className="relative flex justify-between ml-6">
              <EmployeeCheckBox
                role={role}
                employee={emp}
                onCheckBox={onCheckBox}
              />
            </div>
          ))}
        </div>
        <EmployeesHours
          roleHours={hours.total}
          unassignedHours={hours.remaining}
          employeeRole={role}
        />
      </div>
    </Box>
  );
}
