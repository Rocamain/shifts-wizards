"use client";
import { Weekday } from "@/lib/rota/rota";
import { useState } from "react";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";

import DayShiftsGrid from "./DayShiftsGrid";
import DayShiftForm from "./DayShiftForm";
import DayShiftsSummary from "./DayShiftSummary";
import { getDayhours } from "@/lib/rota/utils";

type DayShiftsProps = {
  day: Weekday;
};

export default function DayShifts({ day }: DayShiftsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { shifts, updateShiftsToWeekDay } = useRotaContext();
  const { openingTimes } = useOpeningTimesContext();

  const dayShifts = shifts.get(day)!;

  const handleDeleteShift = (shiftId: string) => {
    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.delete(shiftId);
    updateShiftsToWeekDay(day, updatedDayShifts);
  };

  return (
    <div className="p-4">
      <DayShiftsSummary
        day={day}
        isChecked={isChecked}
        openingTimes={[openingTimes[day][1], openingTimes[day].at(-1)!]}
        shiftCount={dayShifts.size}
        totalHours={getDayhours(Array.from(dayShifts.values()))}
        toggleChecked={setIsChecked}
      />
      <DayShiftForm
        day={day}
        openingTimes={openingTimes[day]}
        isChecked={isChecked}
      />
      <DayShiftsGrid
        shifts={Array.from(dayShifts.values())}
        openingTimes={openingTimes[day]}
        deleteShift={handleDeleteShift}
      />
    </div>
  );
}
