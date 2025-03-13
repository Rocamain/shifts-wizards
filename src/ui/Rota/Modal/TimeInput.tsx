type TimeInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TimeInput({ label, value, onChange }: TimeInputProps) {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
