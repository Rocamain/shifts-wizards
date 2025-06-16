"use client";

import clsx from "clsx";
import { useMemo } from "react";

enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// Mapping enum value to display name
const WEEKDAY_NAMES: Record<WeekDay, string> = {
  [WeekDay.Sunday]: "Sunday",
  [WeekDay.Monday]: "Monday",
  [WeekDay.Tuesday]: "Tuesday",
  [WeekDay.Wednesday]: "Wednesday",
  [WeekDay.Thursday]: "Thursday",
  [WeekDay.Friday]: "Friday",
  [WeekDay.Saturday]: "Saturday",
};

interface UnavailableDatesProps {
  dates: Array<{
    day: WeekDay;
    timeFrame: { start: string; end: string };
  }>;
  isEditing: boolean;
  onUpdate: (
    updatedDates: Array<{
      day: WeekDay;
      timeFrame: { start: string; end: string };
    }>
  ) => void;
}

export default function UnavailableDates({
  dates,
  isEditing,
  onUpdate,
}: UnavailableDatesProps) {
  const handleDateChange = (
    index: number,
    field: "day" | "start" | "end",
    value: WeekDay | string
  ) => {
    const updatedDates = [...dates];
    if (field === "day" && typeof value === "number") {
      updatedDates[index].day = value as WeekDay;
    } else if (field === "start" || field === "end") {
      updatedDates[index].timeFrame = {
        ...updatedDates[index].timeFrame,
        [field]: value as string,
      };
    }
    onUpdate(updatedDates);
  };

  const addUnavailableDate = () => {
    onUpdate([
      ...dates,
      { day: WeekDay.Monday, timeFrame: { start: "09:00", end: "17:00" } },
    ]);
  };

  const deleteUnavailableDate = (index: number) => {
    onUpdate(dates.filter((_, i) => i !== index));
  };

  const weekdayOptions = useMemo(() => {
    return Object.entries(WeekDay)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({ label: key, value: Number(value) }));
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">
        Unavailable Dates:
      </h3>
      <ul className="space-y-2 mt-2">
        {dates.length === 0 ? (
          <li key="no dates" className="text-sm">
            <p className="text-gray-500">No unavailable dates</p>
          </li>
        ) : isEditing ? (
          dates.map((date, idx) => (
            <li key={idx} className="text-sm bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-2 flex-wrap px-2 h-[38px] ">
                <label htmlFor="day">
                  <strong>Day:</strong>
                </label>
                <select
                  name="day"
                  value={date.day}
                  onChange={(e) =>
                    handleDateChange(idx, "day", Number(e.target.value))
                  }
                  className={`${clsx(
                    "border rounded-md p-1",
                    isEditing ? "border-blue-600" : "border-transparent"
                  )}`}
                  disabled={!isEditing}
                >
                  {weekdayOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  value={date.timeFrame.start}
                  className={`${clsx(
                    "rounded-md p-1",
                    isEditing ? "border border-gray-300" : ""
                  )}`}
                  onChange={(e) =>
                    handleDateChange(idx, "start", e.target.value)
                  }
                  disabled={!isEditing}
                />
                <span>{" - "}</span>
                <input
                  type="time"
                  value={date.timeFrame.end}
                  className={`${clsx(
                    "rounded-md p-1",
                    isEditing ? "border border-gray-300" : ""
                  )}`}
                  onChange={(e) => handleDateChange(idx, "end", e.target.value)}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => deleteUnavailableDate(idx)}
                  >
                    Delete
                  </button>
                )}
                {idx === dates.length - 1 && isEditing && (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={addUnavailableDate}
                  >
                    Add Date
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          // Non-editing: show day name and time
          dates.map((date, idx) => (
            <li key={idx} className="text-sm bg-white rounded-lg shadow-md ">
              <div className="flex items-center space-x-4 flex-wrap px-2 h-[38px]">
                <span className={clsx("", isEditing ? "py-0" : "py-1")}>
                  <strong>Day:</strong> {WEEKDAY_NAMES[date.day]}
                </span>
                <span className={clsx("", isEditing ? "py-0" : "py-1")}>
                  <strong>Time:</strong> {date.timeFrame.start} -{" "}
                  {date.timeFrame.end}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
