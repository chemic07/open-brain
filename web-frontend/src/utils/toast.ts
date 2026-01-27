import { toast } from "sonner";

// Use 'type' for the fixed set of strings
type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface ToastOptions {
  description?: string;
  duration?: number;
  id?: string | number;
}

// Fixed interface name and property types
interface IShowToast {
  type: ToastType; // Changed from string to ToastType for better safety
  message: string;
  options?: ToastOptions;
}

export const showToast = ({ type, message, options }: IShowToast) => {
  const { description, duration = 3000, id } = options || {};
  const config = { description, duration, id };

  switch (type) {
    case "success":
      return toast.success(message, config);
    case "error":
      return toast.error(message, config);
    case "warning":
      return toast.warning(message, config);
    case "loading":
      return toast.loading(message, config);
    default:
      return toast(message, config);
  }
};
