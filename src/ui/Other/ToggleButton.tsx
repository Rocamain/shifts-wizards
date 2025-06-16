interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Toggle({
  checked,
  onChange,
  label = "Schedule times",
}: ToggleProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer select-none">
      {/* Label text */}
      <span className="text-base font-medium text-gray-900 dark:text-gray-100">
        {label}
      </span>

      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-checked={checked}
      />

      {/* Track */}
      <div
        className={`
            w-12 h-6
            bg-gray-200
            rounded-full
            relative
            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500
            transition-colors
            peer-checked:bg-blue-600
          `}
      >
        {/* Thumb */}
        <span
          className={`
              block
              w-5 h-5
              bg-white dark:bg-gray-100
              rounded-full
              shadow
              transform
              transition-transform
              translate-x-0
              peer-checked:translate-x-6
            `}
        />
      </div>
    </label>
  );
}
