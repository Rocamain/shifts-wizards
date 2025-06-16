"use client";

import { WEEKDAY_NAMES } from "@/lib/rota/constants";
import { Shift } from "@/lib/rota/rota";

interface AssignedShiftsProps {
  shifts: Shift[];
}

export default function AssignedShifts({ shifts }: AssignedShiftsProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Assigned Shifts
      </h3>
      {shifts.length === 0 ? (
        <p className="text-gray-500">No assigned shifts</p>
      ) : (
        <ul className="space-y-2">
          {shifts.map((shift, idx) => {
            return (
              <li
                key={idx}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm border border-gray-200"
              >
                <span className="text-sm text-gray-700">
                  <strong>Day:</strong> {WEEKDAY_NAMES[shift.day]}
                </span>
                <span className="text-sm text-gray-700">
                  <strong>Time:</strong> {shift.startTime} - {shift.endTime}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
