import { setGradient } from "@/lib/rota/utils";

interface CircularHoursBarProps {
  percentage: number;
}

export default function CircularHoursBar({
  percentage,
}: CircularHoursBarProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative w-[120px] h-[120px] rounded-full"
        style={{
          background: percentage ? setGradient(percentage) : "transparent",
        }}
      >
        <div className="absolute inset-2 flex items-center bg-white justify-center rounded-full">
          <span className="font-semibold font-bold">
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
