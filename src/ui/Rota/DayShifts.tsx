import { Weekday, DayShiftsMap } from "@/lib/rota/rota";
import { Employee } from "@/lib/employees/employees";
import { useState } from "react";
import { getDayhours } from "@/lib/rota/utils";
import DayShiftsSummary from "./DayShiftSummary";
import DayShiftForm from "./DayShiftForm";
import DayShiftsGrid from "./DayShiftsGrid";
import { useOpeningTimes } from "@/lib/rota/hooks/useOpeningTimes";

type DayShiftsProps = {
  employees: Employee[];
  dayShifts: DayShiftsMap;
  day: Weekday;
  updateShiftsToWeekDay: (day: Weekday, shiftsForDay: DayShiftsMap) => void;
};

export default function DayShifts({
  day,
  dayShifts,
  updateShiftsToWeekDay,
}: DayShiftsProps) {
  const [isChecked, setIsChecked] = useState(false);

  const { openingTimes, setOpeningTimes } = useOpeningTimes({ day, dayShifts });

  const handleDeleteShift = (shiftId: string) => {
    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.delete(shiftId);
    updateShiftsToWeekDay(day, updatedDayShifts);
  };

  return (
    <div className="p-4">
      <DayShiftsSummary
        isChecked={isChecked}
        openingTimes={[openingTimes[1], openingTimes.at(-1)!]}
        setOpeningTimes={setOpeningTimes}
        shiftCount={dayShifts.size}
        totalHours={getDayhours(Array.from(dayShifts.values()))}
        toggleChecked={setIsChecked}
      />
      <DayShiftForm
        day={day}
        openingTimes={openingTimes}
        isChecked={isChecked}
      />
      <DayShiftsGrid
        shifts={Array.from(dayShifts.values())}
        openingTimes={openingTimes}
        deleteShift={handleDeleteShift}
      />
    </div>
  );
}
