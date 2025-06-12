"use client";

import { Shift, Weekday } from "@/lib/rota/rota";
import { useState } from "react";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import DayShiftsGrid from "./DayShiftsGrid";
import DayShiftForm from "./DayShiftForm";
import DayShiftsSummary from "./DayShiftSummary";
import { getDayhours } from "@/lib/rota/utils";

type DayShiftsProps = {
  day: Weekday;
};

export default function DayShifts({ day }: DayShiftsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { week, replaceDay } = useRotaContext();
  const { openingTimes } = useOpeningTimesContext();
  const { selectedEmployees } = useEmployeeContext();

  if (day >= 0) {
    const dayShifts = week.get(day)!;
    const handleDeleteShift = (shiftId: string) => {
      const updated = new Map(dayShifts);
      updated.delete(shiftId);
      replaceDay(day, updated);
    };

    const filteredShifts = Array.from(dayShifts.values()).filter((shift) => {
      return shift.employee
        ? ["unassigned", ...selectedEmployees].includes(shift.employee)
        : true;
    });

    return (
      openingTimes && (
        <div className="p-4">
          <DayShiftsSummary
            day={day}
            isChecked={isChecked}
            shiftCount={dayShifts.size}
            totalHours={getDayhours(Array.from(dayShifts.values()) as Shift[])}
            toggleChecked={setIsChecked}
          />
          <DayShiftForm day={day} isChecked={isChecked} />
          <div className="flex-1">
            <DayShiftsGrid
              shifts={filteredShifts}
              openingTimes={openingTimes[day]}
              deleteShift={handleDeleteShift}
            />
          </div>
        </div>
      )
    );
  }
}
