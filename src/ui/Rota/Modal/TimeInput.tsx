import { QUARTER_HOUR } from "@/lib/rota/constants"; // 900   (seconds)
import { clampTime, roundUpToQuarter } from "@/lib/rota/utils";
import { ChangeEvent, FocusEvent } from "react";

type TimeInputProps = {
  label: string;
  value: string;
  min?: string; // opening time  – "HH:MM"
  max?: string; // closing time  – "HH:MM"
  onChange: (value: string) => void;
};

export function TimeInput({
  label,
  min,
  max,
  value,
  onChange,
}: TimeInputProps) {
  /** Handle on-the-fly typing */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = clampTime(value, e.target.value, min, max);
    onChange(next);
  };

  /** Round up to next 15-minute mark on blur */
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(roundUpToQuarter(e.target.value));
    }
  };

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        type="time"
        value={value}
        min={min}
        max={max}
        step={QUARTER_HOUR} // 900 s → 00/15/30/45
        onChange={handleChange}
        onBlur={handleBlur}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
                   shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
