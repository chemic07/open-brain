import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "danger" | "ghost";
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
  primary: "bg-white hover:bg-blue-700 text-black",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-8 py-3 text-lg",
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
      className={clsx(
        "flex items-center justify-center gap-2 rounded-md font-medium transition",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
    >
      {!isLoading && headIcon}
      <span>{isLoading ? "Loading..." : title}</span>
      {!isLoading && tailIcon}
    </button>
  );
}
