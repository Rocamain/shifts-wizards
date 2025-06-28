"use client";
import { useCallback, useEffect, useState } from "react";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { Shift, Week, Weekday } from "@/lib/rota/rota";
import { Employee } from "@/lib/employees/employees";
import WeightControls from "../WeightControls";
import { isEmployeeAvailableForShift } from "@/lib/rota/utils";
import { useRestPriorityContext } from "@/lib/rota/context/RestPriorityContext";

/** Return true if any day-map in the week has at least one shift. */
function hasAnyShifts(week: Week): boolean {
  for (const dayMap of week.values()) {
    if (dayMap.size > 0) return true;
  }
  return false;
}

export default function Scheduler() {
  const { week: initialWeek, addApiShifs } = useRotaContext();
  const { employees, addShiftToEmployee } = useEmployeeContext();
  const [submitted, setSubmitted] = useState(false);
  const { restPriority, setRestPriority } = useRestPriorityContext();

  const fetchRota = useCallback(
    async (weekData: Week, staff: Employee[]) => {
      const weeklyRota: Shift[][] = Array.from({ length: 7 }, (_, day) => {
        const dayMap = weekData.get(day as Weekday) ?? new Map<string, Shift>();
        return Array.from(dayMap.values())
          .map((s) => ({ ...s, day: day as Weekday }))
          .filter((shift) => !shift.employee);
      });

      const shiftsAssigned: Shift[][] = Array.from({ length: 7 }, (_, day) => {
        const dayMap = weekData.get(day as Weekday) ?? new Map<string, Shift>();
        return Array.from(dayMap.values())
          .map((s) => ({ ...s, day: day as Weekday }))
          .filter((shift) => shift.employee);
      });
      const staffWithDeductedContractHours = staff.map((emp) => ({
        ...emp,
        contractHours: emp.contractHours - emp.totalWorkedHours,
      }));

      // nothing to do
      if (weeklyRota.every((arr) => arr.length === 0)) return;
      try {
        const resp = await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shifts: weeklyRota,
            employees: staffWithDeductedContractHours,
            restPriority,
          }),
        });

        const json = await resp.json();
        if (!resp.ok) {
          console.error("Schedule API error:", json);
          return;
        }

        // Build new Week
        const returned: Shift[][] = json.shifts;
        const newWeek: Week = new Map();

        returned.forEach((dayArr, day) => {
          const array = [...dayArr]
            .concat(...shiftsAssigned[day])
            .map((shift) => {
              shift.candidates = employees
                .filter((emp) => isEmployeeAvailableForShift(emp, shift))
                .map((emp) => emp.id);
              return shift;
            });
          const m = new Map<string, Shift>();
          array.forEach((sh) => m.set(sh.id, sh));
          newWeek.set(day as Weekday, m);
        });
        addApiShifs(newWeek);

        // update employee-assigned shifts
        returned.forEach((dayArr) =>
          dayArr.forEach((shift) => {
            if (shift.employee) addShiftToEmployee(shift.employee, shift);
          })
        );
      } catch (error) {
        console.error("Error in Scheduler fetchRota:", error);
        return;
      }
    },
    [addApiShifs, addShiftToEmployee, restPriority, employees]
  );

  useEffect(() => {
    if (!submitted) return;
    if (!hasAnyShifts(initialWeek)) {
      setSubmitted(false);
      return;
    }
    fetchRota(initialWeek, employees)
      .catch(console.error)
      .finally(() => setSubmitted(false));
  }, [submitted, fetchRota, initialWeek, employees]);

  return (
    <div className="w-[190px] mx-auto h-[200px] border-2 border-gray-300 p-4 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Consecutive Rest
      </h3>
      <div className="flex flex-col items-center gap-[30px] h-[122px]">
        <WeightControls value={restPriority} onChange={setRestPriority} />
        <div>
          <button
            className="hover:bg-blue-400 px-4 py-2 rounded text-white bg-blue-500"
            onClick={() => setSubmitted(true)}
          >
            Resolve Shifts
          </button>
        </div>
      </div>
    </div>
  );
}
