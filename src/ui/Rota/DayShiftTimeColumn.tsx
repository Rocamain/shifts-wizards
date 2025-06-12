import { buildSlots } from "@/lib/rota/utils";

type DayShiftTimeColumnProps = {
  /** Example: ["Times", "06:00", "07:00", … "18:00"] */
  openingTimes: string[];
};

export default function DayShiftTimeColumn({
  openingTimes,
}: DayShiftTimeColumnProps) {
  const slots = buildSlots(openingTimes);

  return (
    <div
      className="grid border-r border-gray-300"
      style={{
        gridTemplateRows: `40px repeat(${slots.length}, 10px)`,
      }}
    >
      <div className="flex items-center justify-center w-[60px] mb-8 ">
        <p className="border-b border-gray-800 font-semibold w-full">Times</p>
      </div>

      {slots.map(({ time, isWhole, isHalf, label }) => {
        const borderColor = isWhole
          ? "border-gray-800"
          : isHalf
          ? "border-gray-500"
          : "border-gray-400";

        return (
          <div
            key={time}
            className="relative w-[60px] h-full flex items-start justify-end"
          >
            <div
              className={`${
                isWhole ? "w-[35%]" : isHalf ? "w-[25%]" : "w-[15%]"
              } border-b ${borderColor}`}
            />

            {/* label only on :00 rows */}
            {label && (
              <p className="absolute -top-[10px] left-0 text-sm">{label}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
