import { setGradient } from "@/lib/rota/utils";

interface CircularHoursBarProps {
  percentage: number;
}

export default function CircularHoursBar({
  percentage,
}: CircularHoursBarProps) {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div
        className="relative w-[90px] h-[90px] rounded-full"
        style={{
          background: setGradient(percentage),
        }}
      >
        <div className="absolute inset-2 flex items-center justify-center bg-gray-200 rounded-full">
          <span className="font-semibold text-black">
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
