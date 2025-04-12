interface HoursInputProps {
  hours: string;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HoursInput({ hours, onHoursChange }: HoursInputProps) {
  return (
    <div>
      <div className="flex justify-end bg-gray-200">
        <div className="relative w-32 bg-gray-200 border border-gray-500 rounded px-7 py-6">
          <div className="absolute w-4/5 -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 text-center px-2 text-gray-600">
            <h3 className="font-semibold bg-gray-200"> Set Hours </h3>
          </div>
          <input
            type="text"
            value={hours}
            onChange={onHoursChange}
            maxLength={3}
            pattern="\d*"
            className="border border-gray-500 rounded px-4 py-2 w-[74px] text-center"
          />
        </div>
      </div>
    </div>
  );
}
