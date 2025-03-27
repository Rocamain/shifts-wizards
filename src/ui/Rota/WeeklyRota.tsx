"use client";
import { WEEKDAYS } from "@/lib/rota/constants";
import DayTitle from "./DayTitle";
import DayShifts from "./DayShifts";
import { Employee } from "@/lib/employees/employees";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

interface WeeklyRotaProps {
  employees: Employee[];
  title: string;
}

function WeeklyRota({ employees, title }: WeeklyRotaProps) {
  const { shifts, updateShiftsToWeekDay } = useRotaContext();

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
                updateShiftsToWeekDay={updateShiftsToWeekDay}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyRota;
