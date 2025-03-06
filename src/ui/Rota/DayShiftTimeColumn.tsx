type DayShiftTimeColumnProps = {
  openingTimes: string[];
};

export default function DayShiftTimeColumn({
  openingTimes,
}: DayShiftTimeColumnProps) {
  return (
    <div
      className="grid border-r border-gray-300"
      style={{
        gridTemplateRows: `repeat(${openingTimes.length}, auto)`,
      }}
    >
      {openingTimes.map((time, index) => (
        <div
          key={`time-${index}`}
          className="flex p-1 px-2 items-center justify-center border-b border-gray-300 text-center"
        >
          {time}
        </div>
      ))}
    </div>
  );
}
