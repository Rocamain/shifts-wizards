"use client";

import { Employee } from "@/lib/employees/employees";
import { useState } from "react";

interface AddEmployeeModalProps {
  onClose: () => void;
  onAddEmployee: (newEmployee: Employee) => void;
}

type NewEmployee = {
  name: string;
  contractHours: number;
  role: "TL" | "CTM";
};

export default function AddEmployeeModal({
  onClose,
  onAddEmployee,
}: AddEmployeeModalProps) {
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: "",
    contractHours: 0,
    role: "TL", // Default role
  });

  const handleAddEmployee = (newEmployee: NewEmployee) => {
    if (newEmployee.name.length > 3 && newEmployee.contractHours > 0) {
      onAddEmployee({
        id: `${Date.now()}`, // Generate a unique ID
        name: newEmployee.name,
        contractHours: newEmployee.contractHours,
        unavailableDates: [],
        totalWorkedHours: 0,
        assignedShifts: [],
        lastShiftEndTime: null,
        role: newEmployee.role,
      });
      onClose();
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Employee</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">
            Contract Hours
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newEmployee.contractHours}
            onChange={(e) =>
              setNewEmployee((prev) => ({
                ...prev,
                contractHours: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee((prev) => ({
                ...prev,
                role: e.target.value as "TL" | "CTM", // Type assertion
              }))
            }
          >
            <option value="TL">Team Leader</option>
            <option value="CTM">Customer Team Member</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddEmployee(newEmployee)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
