"use client";

import { toast } from "sonner";

interface Props {
  message: string;
  description?: string;
}

export const showSuccess = ({ message, description }: Props) => {
  toast.success(message, {
    description,
    duration: 3000,
  });
};

export const showError = ({ message, description }: Props) => {
  toast.error(message, {
    description,
    duration: 3000,
  });
};

export const showWarning = ({ message, description }: Props) => {
  toast.warning(message, {
    description,
    duration: 3000,
  });
};

export const showInfo = ({ message, description }: Props) => {
  toast(message, {
    description,
    duration: 3000,
  });
};
