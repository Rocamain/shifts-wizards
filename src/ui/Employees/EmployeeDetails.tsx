import React from "react";
import UnavailableDates from "./UnavailableDates";
import AssignedShifts from "./AssignedShifts";
import { Employee } from "@/lib/employees/employees";
import clsx from "clsx";

interface EmployeeDetailsProps {
  employee: Employee;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

export default function EmployeeDetails({
  employee,
  isEditing,
  onEditToggle,
  onSave,
}: EmployeeDetailsProps) {
  const [editableEmployee, setEditableEmployee] = React.useState(employee);

  const handleChange = <K extends keyof Employee>(
    field: K,
    value: Employee[K]
  ) => {
    setEditableEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editableEmployee);
  };

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">
          <input
            type="text"
            value={editableEmployee.name}
            className={` ${clsx(
              "border rounded-md p-2 w-full max-w-xs",
              isEditing ? "border-blue-600" : "border-transparent"
            )}`}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={!isEditing}
          />
        </h2>
        <button
          className={`px-6 py-2 rounded-md text-white transition ${
            isEditing
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={isEditing ? handleSave : onEditToggle}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 font-medium">Contract Hours:</p>
          <div>
            <input
              type="number"
              value={editableEmployee.contractHours}
              className={` ${clsx(
                "border rounded-md p-2",
                isEditing ? "border-blue-600" : "border-transparent"
              )}`}
              onChange={(e) =>
                handleChange("contractHours", Number(e.target.value))
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 font-medium">Role:</p>

          <select
            value={editableEmployee.role}
            className={` ${clsx(
              "border rounded-md p-2 w-full max-w-xs",
              isEditing ? "border-blue-600" : "border-transparent"
            )}`}
            onChange={(e) =>
              handleChange("role", e.target.value as Employee["role"])
            }
            disabled={!isEditing}
          >
            <option value="TL">Team Leader (TL)</option>
            <option value="CTM">Customer Team Member (CTM)</option>
          </select>
        </div>

        <div>
          <p className="text-gray-600 font-medium">
            Total Worked Hours:{" "}
            <span className="text-gray-800">
              {editableEmployee.totalWorkedHours}
            </span>
          </p>
        </div>
      </div>

      <UnavailableDates
        dates={editableEmployee.unavailableDates}
        isEditing={isEditing}
        onUpdate={(updatedDates) =>
          setEditableEmployee((prev) => ({
            ...prev,
            unavailableDates: updatedDates,
          }))
        }
      />

      <AssignedShifts shifts={employee.assignedShifts} />
    </div>
  );
}
