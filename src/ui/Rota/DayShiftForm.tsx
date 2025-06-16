import { EmployeeRole, Shift, Weekday } from "@/lib/rota/rota";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";
import { usePathname } from "next/navigation";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import {
  clampTime,
  isEmployeeAvailableForShift,
  roundUpToQuarter,
  toMillis,
} from "@/lib/rota/utils";
import { QUARTER_HOUR } from "@/lib/rota/constants";
import { ChangeEvent, FocusEvent, useState } from "react";

type DayShiftFormProps = {
  day: Weekday;
  isChecked: boolean;
};

export default function DayShiftForm({ day, isChecked }: DayShiftFormProps) {
  const { addShift } = useRotaContext();
  const { openingTimes } = useOpeningTimesContext();
  const { employees } = useEmployeeContext();
  const employeeRole = usePathname()
    .split("/")[2]
    .toUpperCase() as EmployeeRole;

  const dayTimes = openingTimes[day];
  const earliestOpen = dayTimes[1];
  const latestStart = dayTimes.at(-2)!;
  const earliestEnd = dayTimes[2];
  const latestClose = dayTimes.at(-1)!;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = clampTime(
      startTime,
      e.target.value,
      earliestOpen,
      latestStart
    );
    setStartTime(next);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = clampTime(endTime, e.target.value, earliestEnd, latestClose);
    setEndTime(next);
  };

  const roundOnBlur =
    (setter: (v: string) => void) => (e: FocusEvent<HTMLInputElement>) => {
      if (e.target.value) setter(roundUpToQuarter(e.target.value));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startTime || !endTime || toMillis(startTime) >= toMillis(endTime)) {
      alert("Start must be before end.");
      return;
    }

    const newShift: Shift = {
      day,
      startTime,
      endTime,
      id: crypto.randomUUID(),
      employeeRole,
    };

    newShift.candidates = employees
      .filter((emp) => isEmployeeAvailableForShift(emp, newShift))
      .map((emp) => emp.id);

    addShift(day, newShift);
    setStartTime("");
    setEndTime("");
  };

  return (
    <form className="pt-4 pb-3" onSubmit={handleSubmit}>
      <div className="flex items-end gap-2">
        <div className="relative w-[60px]">
          <label htmlFor="Time-start" className="sr-only">
            Start time
          </label>
          <input
            id="Time-start"
            type="time"
            required
            className="peer border border-gray-300 py-1 rounded-md text-center w-full bg-white"
            min={earliestOpen}
            max={latestStart}
            step={QUARTER_HOUR}
            disabled={!isChecked}
            value={startTime}
            onChange={handleStartChange}
            onBlur={roundOnBlur(setStartTime)}
          />
          {startTime === "" && (
            <span className="pointer-events-none bg-white absolute top-[6px] left-0 w-full text-center text-gray-400 text-sm peer-focus:invisible">
              Start
            </span>
          )}
        </div>

        <div className="relative w-[60px]">
          <label htmlFor="Time-end" className="sr-only">
            End time
          </label>
          <input
            id="Time-end"
            type="time"
            required
            className="peer border border-gray-300 py-1 rounded-md text-center w-full bg-white"
            min={earliestEnd}
            max={latestClose}
            step={QUARTER_HOUR}
            disabled={!isChecked}
            value={endTime}
            onChange={handleEndChange}
            onBlur={roundOnBlur(setEndTime)}
          />
          {endTime === "" && (
            <span className="pointer-events-none bg-white absolute top-[6px] left-0 w-full text-center text-gray-400 text-sm peer-focus:invisible">
              End
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-1 px-3 hover:bg-blue-600"
          disabled={
            !isChecked ||
            !startTime ||
            !endTime ||
            toMillis(startTime) >= toMillis(endTime)
          }
        >
          Add
        </button>
      </div>
    </form>
  );
}
