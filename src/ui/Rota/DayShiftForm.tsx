import { Weekday } from "@/lib/rota/rota";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

type DayShiftFormProps = {
  day: Weekday;
  openingTimes: string[];
  isChecked: boolean;
};

export default function DayShiftForm({
  day,
  openingTimes,

  isChecked,
}: DayShiftFormProps) {
  const { addShift } = useRotaContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startTime = (
      e.currentTarget.elements.namedItem("start") as HTMLInputElement
    )?.value;
    const endTime = (
      e.currentTarget.elements.namedItem("end") as HTMLInputElement
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
        {["start", "end"].map((type, i) => (
          <div key={type}>
            <label htmlFor={`time-${type}`} className="mr-2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <input
              required
              id={type}
              type="time"
              className="border border-gray-300 py-1 rounded-md text-center w-[60px]"
              min={openingTimes[i === 0 ? 0 : 1]}
              max={
                openingTimes[
                  i === 0 ? openingTimes.length - 2 : openingTimes.length - 1
                ]
              }
              disabled={!isChecked}
            />
          </div>
        ))}
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
