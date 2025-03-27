/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { generateHoursArray } from "@/lib/rota/utils";
import { Shift, Weekday, DayShiftsMap } from "@/lib/rota/rota";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

type UseOpeningTimesProps = {
  day: Weekday;
  dayShifts: DayShiftsMap;
};

export function useOpeningTimes({ day, dayShifts }: UseOpeningTimesProps) {
  const [openingTimes, setOpeningTimes] = useState<string[]>([]);
  const { updateShiftsToWeekDay } = useRotaContext(); // <- use it here

  const handleOpeningTimeChange = (time: string, type: "open" | "close") => {
    setOpeningTimes((prevTimes) => {
      const newOpen = type === "open" ? time : prevTimes[0];
      const newClose =
        type === "close" ? time : prevTimes[prevTimes.length - 1];
      return generateHoursArray({ open: newOpen, close: newClose });
    });
  };

  useEffect(() => {
    if (openingTimes.length === 0) {
      setOpeningTimes(generateHoursArray({ open: "6:00", close: "22:00" }));
    }
  }, []);

  useEffect(() => {
    if (openingTimes.length < 2) return;

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
      updateShiftsToWeekDay(day, updatedDayShifts); // <- context call
    }
  }, [openingTimes]);

  return {
    openingTimes,
    setOpeningTimes: handleOpeningTimeChange,
  };
}
