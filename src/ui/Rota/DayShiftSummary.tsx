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
    <div className="flex items-start justify-between gap-2">
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

        <div className="flex">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => toggleChecked(e.target.checked)}
            className="mr-1 rounded-sm"
          />
          <label htmlFor="modify-times" className="block text-sm">
            Set Times
          </label>
        </div>
      </div>
    </div>
  );
}
