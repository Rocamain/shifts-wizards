"use client";

interface AssignmentRangeProps {
  value: number;
  onChange: (v: number) => void;
}

export default function WeightControls({
  value,
  onChange,
}: AssignmentRangeProps) {
  return (
    <div className="relative mb-2 w-full max-w-md">
      <input
        id="rest-priority"
        type="range"
        min={1}
        max={3}
        step={1}
        value={value}
        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-500 -mb-6">
        <span>Min</span>
        <span>Balanced</span>
        <span>Max</span>
      </div>
    </div>
  );
}
