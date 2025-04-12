import { Weekday } from "@/lib/rota/rota";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";

type DayShiftFormProps = {
  day: Weekday;
  openingTimes?: string[];
  isChecked: boolean;
};

export default function DayShiftForm({
  day,

  isChecked,
}: DayShiftFormProps) {
  const { addShift } = useRotaContext();
  const { openingTimes } = useOpeningTimesContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startTime = (
      e.currentTarget.elements.namedItem("Time-start") as HTMLInputElement
    )?.value;
    const endTime = (
      e.currentTarget.elements.namedItem("Time-end") as HTMLInputElement
    )?.value;
    if (startTime && endTime) {
      const id = crypto.randomUUID();

      const newShift = { day, startTime, endTime, id };

      addShift(day, newShift);
    }

    e.currentTarget.reset();
  };

  return (
    <form className="pt-4 pb-3" onSubmit={handleSubmit}>
      <div className="flex items-end gap-2">
        <div>
          <label htmlFor="Time-start" className="mr-2">
            Start
          </label>
          <input
            required
            id="Time-start"
            type="time"
            className="border border-gray-300 py-1 rounded-md text-center w-[60px]"
            min={openingTimes[day][1]}
            max={openingTimes[day].at(-2)}
            disabled={!isChecked}
          />
        </div>
        <div>
          <label htmlFor="Time-end" className="mr-2">
            End
          </label>
          <input
            required
            id="Time-end"
            type="time"
            className="border border-gray-300 py-1 rounded-md text-center w-[60px]"
            min={openingTimes[day][2]}
            max={openingTimes[day].at(-1)}
            disabled={!isChecked}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-1 px-3 hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
