import { Shift, Weekday } from "@/lib/rota/rota";
import { Employee } from "@/lib/employees/employees";
import { useState, useEffect } from "react";
import { generateHoursArray, getDayhours } from "@/lib/rota/utils";
import DayShiftsSummary from "./DayShiftSummary";
type DayShiftsProps = {
  employees: Employee[];
  dayShifts: Shift[];
  day: Weekday;
  assignShiftToWeekDay: (day: Weekday, shiftsForDay: Shift[]) => void;
};

export default function DayShifts({ dayShifts }: DayShiftsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [openingTimes, setOpeningTimes] = useState<string[]>([]);

  const handleOpeningTimeChange = (time: string, type: "open" | "close") => {
    setOpeningTimes((prev) => {
      const open = type === "open" ? time : prev[1];
      const close = type === "close" ? time : prev.at(-1)!;
      return generateHoursArray({ open, close });
    });
  };
  useEffect(() => {
    setOpeningTimes(generateHoursArray({ open: "6:00", close: "22:00" }));
  }, [dayShifts]);

  // const handleAssignShiftToWeekDay = (
  //   day: Weekday,
  //   shiftsForDay: Shift[]
  // ) => {};
  // console.log("AAAA", { openingTimes });

  return (
    <div className="p-4">
      <DayShiftsSummary
        isChecked={isChecked}
        openingTimes={[openingTimes[1], openingTimes.at(-1)!]}
        setOpeningTimes={handleOpeningTimeChange}
        shiftCount={0}
        totalHours={getDayhours(dayShifts)}
        toggleChecked={setIsChecked}
      />
    </div>
  );
}
