"use client";

import { Weekday } from "@/lib/rota/rota";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import {
  ClockIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/16/solid";

type DayShiftsSummaryProps = {
  day: Weekday;
  isChecked: boolean;
  shiftCount: number;
  totalHours: number;
  toggleChecked: (checked: boolean) => void;
};

export default function DayShiftsSummary({
  day,
  isChecked,
  shiftCount,
  totalHours,
  toggleChecked,
}: DayShiftsSummaryProps) {
  const { openingTimes, setOpeningTimes } = useOpeningTimesContext();
  const { week, replaceDay } = useRotaContext();

  const [openTime, closeTime] = [
    openingTimes[day][1],
    openingTimes[day].at(-1) as string,
  ];

  const clampShiftsToWindow = (newOpen?: string, newClose?: string) => {
    const dayMap = week.get(day);
    if (!dayMap) return;

    const updated = new Map(
      Array.from(dayMap.entries()).map(([id, s]) => {
        const start = newOpen && s.startTime < newOpen ? newOpen : s.startTime;
        const end = newClose && s.endTime > newClose ? newClose : s.endTime;
        return [id, { ...s, startTime: start, endTime: end }];
      })
    );

    replaceDay(day, updated);
  };

  const handleTimeChange = (value: string, type: "open" | "close") => {
    if (type === "open") {
      setOpeningTimes({ day, times: [value, closeTime] });
      clampShiftsToWindow(value, closeTime);
    } else {
      setOpeningTimes({ day, times: [openTime, value] });
      clampShiftsToWindow(openTime, value);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-2">
      <div className="flex space-x-8 mb-2">
        <div>
          <div className="flex items-center gap-1 mb-2">
            <label htmlFor="time-open">
              <EnvelopeOpenIcon className="h-5 w-5 text-blue-500" />
            </label>
            <input
              id="time-open"
              name="time-open"
              type="time"
              disabled={!isChecked}
              value={openTime || ""}
              className={`px-1 rounded-sm min-w-[60px] text-center ${
                !isChecked ? "bg-gray-200" : ""
              }`}
              onChange={(e) => handleTimeChange(e.target.value, "open")}
            />
          </div>

          <div className="flex items-center gap-1">
            <label htmlFor="time-close">
              <EnvelopeIcon className="h-5 w-5 text-blue-500" />
            </label>
            <input
              id="time-close"
              name="time-close"
              type="time"
              disabled={!isChecked}
              value={closeTime || ""}
              className={`px-1 rounded-sm w-[60px] text-center ${
                !isChecked ? "bg-gray-200" : ""
              }`}
              onChange={(e) => handleTimeChange(e.target.value, "close")}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 justify-end mb-3 min-[120px]:justify-between">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-5 w-5 text-blue-500" />
              <p className="font-semibold">{totalHours}</p>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="h-5 w-5 text-blue-500" />
              <p className="font-semibold">{shiftCount}</p>
            </div>
          </div>
        </div>
      </div>
      <label className="inline-flex space-x-4 items-center cursor-pointer mb-4 ">
        <span className="text-md font-semibold text-gray-900 dark:text-gray-300">
          Schedule times
        </span>
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={(e) => toggleChecked(e.target.checked)}
        />
        <div
          className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full shadow-md
               after:content-[''] after:absolute after:top-[2px] after:left-[2px]
               after:bg-blue-500 after:shadow-xl after:rounded-full after:h-5 after:w-5 after:transition-transform
               peer-checked:bg-gray-600 peer-checked:after:translate-x-5"
        ></div>
      </label>
    </div>
  );
}
