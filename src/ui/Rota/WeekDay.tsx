import DayTitle from "./DayTitle";
import DayShifts from "./DayShifts";
import { Weekday } from "@/lib/rota/rota";

interface WeekDayProps {
  day: Weekday;
  // hasShifts: boolean;
}

export default function WeekDay({ day }: WeekDayProps) {
  return (
    <>
      <DayTitle day={day} />
      <div className="mt-2 space-y-2">
        <DayShifts day={day} />
      </div>
    </>
  );
}
