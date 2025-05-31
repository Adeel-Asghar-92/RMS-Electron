import { toast } from "sonner";
import "./toast.css";
export function toastSuccess(title, options = {}) {
  toast.success(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    classNames: {
      toast: "!bg-green-700 !text-white !font-inter toast-li",
      cancelButton: "!text-white !bg-transparent",
    },
    ...options,
  });
}

export function toastError(title, options = {}) {
  toast.error(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    // style: { padding: "0.5rem !important", border: "1px solid #e000" },
    classNames: {
      toast: "!bg-red-600 !text-white !font-inter toast-li",
      cancelButton: "!text-white !bg-transparent",
    },
    ...options,
  });
}

export function toastWarn(title, options = {}) {
  toast.error(title, {
    cancel: { label: "✕", onClick: () => toast.dismiss() },
    classNames: {
      toast: "!bg-yellow-700 !text-white !font-inter toast-li",
      cancelButton: "!text-white !bg-transparent",
    },
    ...options,
  });
}
