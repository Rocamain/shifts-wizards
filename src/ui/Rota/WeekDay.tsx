import DayTitle from "./DayTitle";
import DayShifts from "./DayShifts";
import { Weekday } from "@/lib/rota/rota";

interface WeekDayProps {
  day: Weekday;
}

function WeekDay({ day }: WeekDayProps) {
  return (
    <div className="flex-shrink-0 flex-grow flex flex-col border border-gray-600 min-w-[221px] max-w-fit overflow-hidden ">
      <DayTitle day={day} />
      <DayShifts day={day} />
    </div>
  );
}

export default WeekDay;
