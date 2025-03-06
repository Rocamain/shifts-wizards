import React, { useState, useCallback } from "react";
import Drag from "../Other/Drag";
import { Shift } from "@/lib/rota/rota";
import { isEmployeeAvailableForShift } from "@/lib/rota/utils";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";

type DayShiftEditShiftModalProps = {
  shift: Shift;
  onClose: () => void;
  onSave: (updatedShift: Shift) => void;
};

export default function DayShiftEditShiftModal({
  shift: initialShift,
  onClose,
  onSave,
}: DayShiftEditShiftModalProps) {
  const { employees } = useEmployeeContext();
  const [shift, setShift] = useState<Shift>(initialShift);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    const updatedShift = selectedCandidate
      ? { ...shift, employee: selectedCandidate }
      : shift;
    onSave(updatedShift);
  }, [shift, selectedCandidate, onSave]);

  return (
    <Drag>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold">Edit Shift</h3>
        <h3>
          Assigned Shift:{" "}
          {shift.employee
            ? employees.find((emp) => emp.id === shift.employee)?.name ?? "None"
            : "None"}
        </h3>
        {/* Start Time Input */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            value={shift.startTime}
            onChange={(e) => setShift({ ...shift, startTime: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* End Time Input */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            value={shift.endTime}
            onChange={(e) => setShift({ ...shift, endTime: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Candidate Selector */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Candidate
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:ring-blue-500 focus:outline-none flex justify-between items-center"
            >
              <span>
                {shift.employee
                  ? employees.find((emp) => emp.id === shift.employee)?.name ??
                    "Select Candidate"
                  : "Select Candidate"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {employees.map((employee) => (
                  <li
                    key={employee.id}
                    onClick={() => {
                      setSelectedCandidate(employee.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                      isEmployeeAvailableForShift(employee, shift)
                        ? "hover:bg-blue-100 text-gray-900"
                        : "hover:bg-red-100 text-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`${employee.color} w-4 h-4 border border-gray-500`}
                      />
                      <div>{employee.name}</div>
                    </div>
                    {isEmployeeAvailableForShift(employee, shift) ? (
                      <div>
                        <span className="text-xs text-blue-500 font-semibold">
                          Eligible
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-red-500 font-semibold">
                        Ineligible
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Drag>
  );
}
