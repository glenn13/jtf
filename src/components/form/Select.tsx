import React, { useEffect, useState } from "react";
interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}
const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  // 🔑 Sync defaultValue when it changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm
        ${selectedValue ? "text-gray-800" : "text-gray-400"} ${className}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
