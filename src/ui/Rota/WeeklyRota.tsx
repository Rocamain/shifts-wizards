import { Shift, Week, Weekday } from "@/lib/rota/rota";
import { WEEKDAYS } from "@/lib/rota/constants";
import DayTitle from "./DayTitle";
import DayShifts from "./DayShifts";
import { Employee } from "@/lib/employees/employees";
import { useCallback, useState } from "react";
import React from "react";

interface WeeklyRotaProps {
  employees: Array<Employee>;
  title: string;
}

function WeeklyRota({ employees, title }: WeeklyRotaProps) {
  const [shifts, setShifts] = useState<Week>([[], [], [], [], [], [], []]);
  const [assignmentStatus, setAssignmentStatus] = useState<
    "modified" | "saved"
  >("saved");

  const assignShiftToWeekDay = useCallback(
    (day: Weekday, shiftsForDay: Shift[]) => {
      setShifts((prevShifts) => {
        const updatedShifts = [...prevShifts];
        updatedShifts[Number(day)] = shiftsForDay;
        return updatedShifts as Week;
      });
      setAssignmentStatus("modified");
    },
    []
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap justify-start print:justify-start gap-y-4">
        {WEEKDAYS.map((weekDay) => (
          <div
            key={weekDay.toString()}
            className="flex-1 border border-gray-600 max-w-fit"
          >
            <DayTitle day={weekDay as Weekday} />
            <DayShifts
              day={weekDay as Weekday}
              employees={employees}
              shifts={shifts[weekDay]}
              assignShiftToWeekDay={assignShiftToWeekDay}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyRota;
