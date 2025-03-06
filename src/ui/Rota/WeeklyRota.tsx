"use client";

import { Week, DayShiftsMap, Weekday } from "@/lib/rota/rota";
import { WEEKDAYS, INITIAL_WEEK } from "@/lib/rota/constants";
import DayTitle from "./DayTitle";
import DayShifts from "./DayShifts";
import { Employee } from "@/lib/employees/employees";
import React, { useState, useCallback } from "react";

interface WeeklyRotaProps {
  employees: Employee[];
  title: string;
}

function WeeklyRota({ employees, title }: WeeklyRotaProps) {
  const [shifts, setShifts] = useState<Week>(INITIAL_WEEK);
  const [assignmentStatus, setAssignmentStatus] = useState<
    "modified" | "saved"
  >("saved");

  const assignShiftToWeekDay = useCallback(
    (day: Weekday, dayShifts: DayShiftsMap) => {
      setShifts((prevShifts) => {
        const updatedShifts = new Map(prevShifts);
        updatedShifts.set(day, dayShifts);
        return updatedShifts;
      });
      setAssignmentStatus("modified");
    },
    []
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap justify-start print:justify-start gap-y-4">
        {WEEKDAYS.map((weekDay, index) => {
          const dayShifts = shifts.get(weekDay) || new Map();
          return (
            <div
              key={`${weekDay}-${index}`}
              className="flex-1 border border-gray-600 max-w-fit"
            >
              <DayTitle day={weekDay} />
              <DayShifts
                day={weekDay}
                employees={employees}
                dayShifts={dayShifts}
                assignShiftToWeekDay={assignShiftToWeekDay}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyRota;
