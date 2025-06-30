import { useEffect } from "react";
import { CommonModalProps } from "@/app/types/CommonType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import CommonButton from "./CommonButton";

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  title,
  children,
  description,
  onOpenChange,
  footer = true,
  className = "",
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm = () => {},
}) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter>
            <DialogClose asChild>
              <CommonButton
                className="bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
                label={cancelText}
                onClick={() => onOpenChange(false)}
              />
            </DialogClose>
            <CommonButton onClick={handleConfirm} label={confirmText} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
