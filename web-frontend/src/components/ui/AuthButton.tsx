import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "authPrimary" | "authOutline" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";
type Width = "auto" | "full" | "half";

interface IAuthButtonProps {
  text: string;

  isLoading?: boolean;
  onClick?: () => void;

  headIcon?: ReactNode;
  tailIcon?: ReactNode;

  variant?: Variant;
  size?: Size;
  width?: Width;

  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  authPrimary: "bg-white text-black border border-white hover:bg-gray-200",

  authOutline:
    "bg-black text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-900",

  danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700",

  ghost:
    "bg-transparent text-gray-300 border border-transparent hover:bg-gray-800",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const WIDTH_STYLES: Record<Width, string> = {
  auto: "w-auto",
  full: "w-full",
  half: "w-1/2",
};

export default function AuthButton({
  text,
  isLoading = false,
  onClick,

  headIcon,
  tailIcon,

  variant = "authPrimary",
  size = "md",
  width = "auto",

  type = "button",
  className = "",
  disabled = false,
}: IAuthButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-black",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        WIDTH_STYLES[width],
        className,
      )}
    >
      {isLoading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {headIcon}
          <span>{text}</span>
          {tailIcon}
        </>
      )}
    </button>
  );
}
