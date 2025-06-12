import React from "react";
import { Shift } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import {
  EMOJI_BY_ROLE,
  UNASINGNED_BG_COLOR_BY_ROLE,
} from "@/lib/employees/constants";
// import { UNASINGNED_BG_COLOR_BY_ROLE } from "@/lib/rota/constants";

type DayShiftShiftColumnProps = {
  shift: Shift;
  openingTimes: string[]; // e.g. ["Times", "06:00", …, "18:00"]
  onShiftClick: (shift: Shift) => void;
};

/** Convert "HH:MM" → total minutes since midnight */
const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Build every 15-minute tick between first and last real time */
const buildSlots = (times: string[]): string[] => {
  const hours = times.filter((t) => /^\d{2}:\d{2}$/.test(t));
  if (hours.length === 0) return [];
  const start = toMinutes(hours[0]);
  const end = toMinutes(hours[hours.length - 1]);
  const out: string[] = [];
  for (let m = start; m < end; m += 15) {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    out.push(`${hh}:${mm}`);
  }
  return out;
};

export default function DayShiftShiftColumn({
  shift,
  openingTimes,
  onShiftClick,
}: DayShiftShiftColumnProps) {
  const { employees } = useEmployeeContext();
  const { deleteShift } = useRotaContext();
  const assignedEmp = shift.employee
    ? employees.find((e) => e.id === shift.employee)
    : null;

  // build our quarter-hour slots
  const slots = buildSlots(openingTimes);
  return (
    <div
      className="grid border-l border-gray-200"
      style={{
        // 1 × 40px header + one 10px row per slot
        gridTemplateRows: `40px repeat(${slots.length}, 10px)`,
      }}
    >
      {/* invisible header cell (to line up under "Times") */}
      <div className="w-[33px] h-full border-b border-r border-gray-300" />

      {/* one cell per 15-minute slot */}
      {slots.map((time, i) => {
        const isStart = time === shift.startTime;
        const isWithin = time > shift.startTime && time < shift.endTime;
        const fillBG =
          assignedEmp?.color ?? UNASINGNED_BG_COLOR_BY_ROLE[shift.employeeRole];
        const isWHole = time.endsWith(":45");

        if (isStart || isWithin) {
          if (isStart) {
          }
          return (
            <div
              key={`${shift.id}-${i}`}
              className={`cursor-pointer w-[33px] h-full flex items-center justify-center ${fillBG}
                           border-r ${
                             isWHole ? "border-b border-gray-300" : ""
                           }  relative`}
              onClick={() => onShiftClick(shift)}
              title={`Modify shift ${shift.employeeRole}: ${
                employees.filter((emp) => emp.id === shift.employee)?.[0]
                  ?.name ?? "Unassigned"
              } `}
            >
              {isStart && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteShift(shift.day, shift.id!);
                  }}
                  className="absolute w-[28px] h-[28px] p-[1px] -top-4 rounded-full bg-white border-2 border-red-400"
                >
                  <span className="flex justify-center" title="Delete Shift">
                    {EMOJI_BY_ROLE[shift.employeeRole]}
                  </span>
                </button>
              )}
            </div>
          );
        }

        // empty cell
        return (
          <div
            key={`empty-${shift.id}-${i}`}
            className="w-[33px] h-full border-b border-r border-gray-300"
          />
        );
      })}
    </div>
  );
}
