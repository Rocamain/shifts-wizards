interface HoursInputProps {
  shopHours: number;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewChange: () => void;
}

export default function HoursInput({
  shopHours,
  onHoursChange,
  onViewChange,
}: HoursInputProps) {
  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onViewChange();
      }}
    >
      <div className="flex">
        <input
          type="text"
          value={shopHours}
          onChange={onHoursChange}
          maxLength={4}
          pattern="\d*"
          className="focus-within:shadow-lg border border-gray-500 rounded shadow-md px-4 py-2 text-center w-[80px]"
        />
      </div>
      <div>
        <button
          type="submit"
          className="hover:bg-blue-400 px-4 py-2 rounded text-white bg-blue-500"
        >
          Set Shop Hours
        </button>
      </div>
    </form>
  );
}
