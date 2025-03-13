import { Shift, Weekday, DayShiftsMap } from "@/lib/rota/rota";
import { Employee } from "@/lib/employees/employees";
import { useState, useEffect } from "react";
import { generateHoursArray, getDayhours } from "@/lib/rota/utils";
import DayShiftsSummary from "./DayShiftSummary";
import DayShiftForm from "./DayShiftForm";
import DayShiftsGrid from "./DayShiftsGrid";

type DayShiftsProps = {
  employees: Employee[];
  dayShifts: DayShiftsMap;
  day: Weekday;
  assignShiftToWeekDay: (day: Weekday, shiftsForDay: DayShiftsMap) => void;
};

export default function DayShifts({
  day,
  dayShifts,
  assignShiftToWeekDay,
}: DayShiftsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [openingTimes, setOpeningTimes] = useState<string[]>([]);

  const handleOpeningTimeChange = (time: string, type: "open" | "close") => {
    setOpeningTimes((prevTimes) => {
      const newOpen = type === "open" ? time : prevTimes[0];
      const newClose =
        type === "close" ? time : prevTimes[prevTimes.length - 1];
      const newTimes = generateHoursArray({ open: newOpen, close: newClose });

      return newTimes;
    });
  };

  useEffect(() => {
    const effectiveOpen = openingTimes[1];
    const effectiveClose = openingTimes[openingTimes.length - 1];

    let anyChange = false;
    const updatedEntries = Array.from(dayShifts.entries()).map(
      ([key, shift]) => {
        const updatedShift = { ...shift };
        if (updatedShift.startTime < effectiveOpen) {
          updatedShift.startTime = effectiveOpen;
          anyChange = true;
        }
        if (updatedShift.endTime > effectiveClose) {
          updatedShift.endTime = effectiveClose;
          anyChange = true;
        }
        return [key, updatedShift] as [string, Shift];
      }
    );

    if (anyChange) {
      const updatedDayShifts = new Map(updatedEntries);
      assignShiftToWeekDay(day, updatedDayShifts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingTimes]);

  useEffect(() => {
    if (openingTimes.length === 0)
      setOpeningTimes(() =>
        generateHoursArray({ open: "6:00", close: "22:00" })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addShift = (day: Weekday, newShift: Shift) => {
    const newId = newShift.id || `${newShift.startTime}-${newShift.endTime}`;

    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.set(newId, newShift);

    const sortedEntries = Array.from(updatedDayShifts.entries()).sort(
      ([, a], [, b]) => a.startTime.localeCompare(b.startTime)
    );
    const sortedDayShifts = new Map(sortedEntries);
    assignShiftToWeekDay(day, sortedDayShifts);
  };

  const updateShift = (day: Weekday, shiftToUpdate: Shift) => {
    const newId =
      shiftToUpdate.id || `${shiftToUpdate.startTime}-${shiftToUpdate.endTime}`;

    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.delete(shiftToUpdate.id!);
    updatedDayShifts.set(newId, shiftToUpdate);

    const sortedEntries = Array.from(updatedDayShifts.entries()).sort(
      ([, a], [, b]) => a.startTime.localeCompare(b.startTime)
    );
    const sortedDayShifts = new Map(sortedEntries);
    assignShiftToWeekDay(day, sortedDayShifts);
  };

  return (
    <div className="p-4">
      <DayShiftsSummary
        isChecked={isChecked}
        openingTimes={[openingTimes[1], openingTimes.at(-1)!]}
        setOpeningTimes={handleOpeningTimeChange}
        shiftCount={dayShifts.size}
        totalHours={getDayhours(Array.from(dayShifts.values()))}
        toggleChecked={setIsChecked}
      />
      <DayShiftForm
        day={day}
        openingTimes={openingTimes}
        isChecked={isChecked}
        addShift={addShift}
      />
      <DayShiftsGrid
        shifts={Array.from(dayShifts.values())}
        openingTimes={openingTimes}
        updateShift={updateShift}
      />
    </div>
  );
}
