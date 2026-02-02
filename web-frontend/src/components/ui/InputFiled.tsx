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
            isDark ? "text-white" : "text-gray-700 dark:text-white"
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
                ? "border-white/20  bg-black-100 focus-within:border-white/40"
                : "border-gray-300 dark:border-white/10 bg-white dark:bg-[#212121] focus-within:border-blue-500 dark:focus-within:border-white/30 focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-transparent"
          }
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {icon && (
          <span
            className={`shrink-0 ${isDark ? "text-gray-400" : "text-gray-500 "}`}
          >
            {icon}
          </span>
        )}

        <input
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full outline-none bg-transparent
            ${isDark ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400 dark:text-white"}
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
