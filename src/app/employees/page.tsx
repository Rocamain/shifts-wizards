"use client";
import { useState } from "react";
import EmployeeTable from "@/ui/Employees/EmployeeTable";
import { EMPLOYEES } from "@/lib/employees/constants";

export default function EmpoloyeePage() {
  const [employees, setEmployees] = useState(() => EMPLOYEES);

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <EmployeeTable
          employees={employees}
          onRemoveEmployee={handleRemoveEmployee}
        />
      </div>
    </div>
  );
}
