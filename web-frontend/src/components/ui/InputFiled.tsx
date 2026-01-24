import type { ReactNode } from "react";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  icon?: ReactNode;

  error?: string;
  disabled?: boolean;
  required?: boolean;

  className?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,

  icon,

  error,
  disabled = false,
  required = false,

  className = "",
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* label */}
      {label && (
        <label className="text-sm text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* input */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md border-2
          ${
            error
              ? "border-red-500"
              : "border-gray-100 focus-within:border-gray-400"
          }
          bg-black-100
          ${disabled ? "opacity-60" : ""}
        `}
      >
        {icon && <span className="text-gray-100">{icon}</span>}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`bg-black-100 outline-none text-white w-full placeholder:text-black-200 ${className}`}
        />
      </div>

      {/* error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
