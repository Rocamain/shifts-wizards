import { UserIcon } from "@heroicons/react/16/solid";
import {
  ClockIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

type DayShiftsSummaryProps = {
  isChecked: boolean;
  openingTimes: [string, string];
  setOpeningTimes: (time: string, type: "open" | "close") => void;
  shiftCount: number;
  totalHours: number;
  toggleChecked: (checked: boolean) => void;
};

export default function DayShiftsSummary({
  isChecked,
  openingTimes,
  setOpeningTimes,
  shiftCount,
  totalHours,
  toggleChecked,
}: DayShiftsSummaryProps) {
  const handleTimeChange = (value: string, type: "open" | "close") => {
    setOpeningTimes(value, type);
  };

  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <div className="flex items-center gap-1 mb-2">
          <label htmlFor="time-open">
            <EnvelopeOpenIcon className="h-5 w-5 text-blue-500" />
          </label>
          <input
            type="time"
            id="time-open"
            name="time-open"
            placeholder="9:00"
            value={openingTimes[0] || ""}
            disabled={!isChecked}
            className={`px-1 rounded-sm min-w-[60px] text-center ${
              !isChecked ? "bg-gray-200" : ""
            }`}
            onChange={(e) => handleTimeChange(e.target.value, "open")}
          />
        </div>

        {/* Closing Time */}
        <div className="flex items-center gap-1">
          <label htmlFor="time-close">
            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
          </label>
          <input
            type="time"
            id="time-close"
            name="time-close"
            value={openingTimes.at(-1) || ""}
            disabled={!isChecked}
            className={`px-1 rounded-sm w-[60px] text-center ${
              !isChecked ? "bg-gray-200" : ""
            }`}
            onChange={(e) => handleTimeChange(e.target.value, "close")}
          />
        </div>
      </div>
      <div>
        <div className="leftS-auto">
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
    </div>
  );
}
