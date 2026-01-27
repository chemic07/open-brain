import type { ReactNode, InputHTMLAttributes } from "react";

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  inputClassName?: string;
  variant?: "light" | "dark";
}

export default function InputField({
  label,
  icon,
  error,
  helperText,
  required = false,
  disabled = false,
  onChange,
  containerClassName = "",
  inputClassName = "",
  variant = "light",
  ...inputProps
}: InputFieldProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          className={`text-sm font-medium ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all
          ${
            error
              ? "border-red-300 bg-red-50"
              : isDark
                ? "border-gray-700 bg-black-100 focus-within:border-gray-500"
                : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
          }
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {icon && (
          <span
            className={`flex-shrink-0 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full outline-none bg-transparent
            ${isDark ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400"}
            ${disabled ? "cursor-not-allowed" : ""}
            ${inputClassName}
          `}
          {...inputProps}
        />
      </div>

      {/* Error or Helper Text */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {!error && helperText && (
        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
