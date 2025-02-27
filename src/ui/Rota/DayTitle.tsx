import { Weekday } from "@/lib/rota/rota";
import { WEEKDAY_NAMES } from "@/lib/rota/constants";

export default function DayTitle({ day }: { day: Weekday }) {
  return (
    <div className="bg-blue-500">
      <h4 className="text-center font-bold text-white text-lg">
        {WEEKDAY_NAMES[day]}
      </h4>
    </div>
  );
}
