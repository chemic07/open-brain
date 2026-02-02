import { type ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiLoader } from "react-icons/fi";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost"
  | "glass";
type Size = "sm" | "md" | "lg";

interface IButtonProps {
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
  headIcon?: ReactNode;
  tailIcon?: ReactNode;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-white text-slate-950 rounded-lg md:rounded-xl hover:bg-slate-100 shadow-lg shadow-white/5",

  secondary:
    "flex items-center gap-1 md:gap-2 bg-blue-600 text-white rounded-lg md:rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-100/30 transition-all",
  glass:
    "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",

  outline: "border border-slate-700 text-black hover:bg-white/5",
  danger: "bg-gray-900 hover:bg-red-100 text-white",
  ghost: "bg-transparent hover:bg-white/10 text-slate-300",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-2 md:px-4 py-1  md:py-1.5 text-[12px] md:text-xs",
  md: "px-3 md:px-6 py-1.5 md:py-2.5 text-[12px] md:text-sm",
  lg: "px-4 md:px-8 py-2 md:py-4 text-sm md:text-base",
};

export default function Button({
  text: title,
  isLoading = false,
  onClick,
  headIcon,
  tailIcon,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  disabled = false,
}: IButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 hover:cursor-pointer ",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
    >
      {isLoading ? (
        <FiLoader className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {headIcon && <span className="shrink-0">{headIcon}</span>}
          <span>{title}</span>
          {tailIcon && <span className="shrink-0">{tailIcon}</span>}
        </>
      )}
    </button>
  );
}
