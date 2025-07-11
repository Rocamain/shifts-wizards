"use client";

import React from "react";
import Link from "next/link";
import { Employee } from "@/lib/employees/employees";
import clsx from "clsx";

interface EmployeeTableProps {
  employees: Employee[];
  onRemoveEmployee: (id: string) => void; // Ensure correct type definition
}

export default function EmployeeTable({
  employees,
  onRemoveEmployee,
}: EmployeeTableProps) {
  return (
    <table className="w-full mt-6 bg-white rounded-lg shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Total Assigned Shifts</th>
          <th className="p-2 text-left">Contract Hours</th>
          <th className="p-2 text-left">Total Worked Hours</th>
          <th className="p-2 text-left">Unavaliable Times</th>
          <th className="p-2 text-left">Role</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="border-t">
            <td className="p-2">{employee.name}</td>
            <td className="p-2">
              <span className="ml-1"> {employee.assignedShifts.length}</span>
            </td>
            <td className="p-2">
              <span className="ml-1">{employee.contractHours}</span>
            </td>
            <td className="p-2">
              <span
                className={clsx(
                  "font-semibold",
                  employee.totalWorkedHours - employee.contractHours >= 0
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {employee.totalWorkedHours}
              </span>
            </td>
            <td className="p-2">
              <span className="ml-1">
                {employee.unavailableDates.length > 0 ? "✔️ " : ""}
              </span>
            </td>
            <td className="p-2">
              <span className="ml-1">{employee.role}</span>
            </td>
            <td className="p-2 flex gap-2">
              <Link
                href={`/employees/${employee.id}`}
                className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-md"
              >
                View Details
              </Link>
              <button
                className="px-2 py-1 text-sm bg-red-500 text-white rounded-md"
                onClick={() => onRemoveEmployee(employee.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
