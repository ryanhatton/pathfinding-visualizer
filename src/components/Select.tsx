import { ChangeEvent } from "react";

interface SelectProps {
  label: string;
  value: string | number;
  options: { name: string; value: string | number }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}

export function Select({ label, value, options, onChange, isDisabled }: SelectProps) {
  return (
    <div className="flex flex-col w-full sm:w-auto">
      <label className="mb-1 text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
