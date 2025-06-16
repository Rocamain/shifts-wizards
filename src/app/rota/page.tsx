"use client";

import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { Weekday } from "@/lib/rota/rota";
import { WEEKDAY_NAMES } from "@/lib/rota/constants";
import { useRef } from "react";

const weekdayOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export default function RotaPrintTable() {
  const { week } = useRotaContext();
  const { employees } = useEmployeeContext();
  const printRef = useRef<HTMLDivElement>(null);

  const getShiftForDay = (day: Weekday, employeeId: string) => {
    const dayMap = week.get(day);
    if (!dayMap) return null;
    return Array.from(dayMap.values()).find(
      (shift) => shift.employee === employeeId
    );
  };

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  return (
    <div className="p-4 print:p-0">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-lg font-semibold">Weekly Schedule</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🖨 Print
        </button>
      </div>

      {/* Printable content */}
      <div
        ref={printRef}
        className="print:overflow-visible print:block"
        style={{
          breakInside: "avoid",
          pageBreakInside: "avoid",
        }}
      >
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-100 text-gray-800 font-medium border-b print:table-header-group">
            <tr className="grid grid-cols-[200px_repeat(7,1fr)]">
              <th className="p-2 border-r text-left">Employee</th>
              {weekdayOrder.map((d) => (
                <th key={d} className="p-2 border-r text-center">
                  {WEEKDAY_NAMES[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="print:table-row-group">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="grid grid-cols-[200px_repeat(7,1fr)] border-b print:break-inside-avoid"
              >
                {/* Employee column */}
                <td className="flex items-center gap-2 p-2 border-r">
                  <div className="w-8 h-8 rounded-full overflow-hidden"></div>
                  <div>
                    <div className="font-semibold">{employee.name}</div>
                    <div className="text-[11px] text-gray-500">
                      {Math.round(employee.totalWorkedHours)}h •{" "}
                      {employee.assignedShifts.length} shifts
                    </div>
                  </div>
                </td>

                {/* Shifts per day */}
                {weekdayOrder.map((day) => {
                  const shift = getShiftForDay(day, employee.id);
                  return (
                    <td
                      key={day}
                      className="p-2 border-r text-center min-h-[64px] flex items-center justify-center"
                    >
                      {shift ? (
                        <div
                          className={`w-full text-left p-1 rounded-md border-l-4 shadow-sm text-xs
                            ${
                              shift.employeeRole === "TL"
                                ? "border-blue-500 bg-blue-50"
                                : shift.employeeRole === "CTM"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-pink-500 bg-pink-50"
                            }`}
                        >
                          <div className="font-medium text-sm">
                            {shift.startTime} – {shift.endTime}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {shift.employeeRole}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-50 border border-dashed border-gray-200 rounded text-center text-gray-300 text-xs py-3">
                          -{" "}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
