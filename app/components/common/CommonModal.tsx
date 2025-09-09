import React, { useEffect } from "react";
import { Modal } from "antd";
import { CommonModalProps } from "@/app/types/CommonType";

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  title,
  loading,
  centered,
  children,
  description,
  setOpen,
  footer = true,
  width = 520,
  className = "",
  cancelText = "Cancel",
  destroyOnClose = true,
  onClose = () => {},
  confirmText = "Confirm",
  onConfirm = () => {},
}) => {
  const handleConfirm = () => {
    onConfirm();
    if (destroyOnClose) setOpen(false);
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
    <Modal
      centered={centered}
      open={open}
      title={title}
      onCancel={() => {
        setOpen(false);
        onClose();
      }}
      onOk={handleConfirm}
      okText={confirmText}
      cancelText={cancelText}
      width={width}
      confirmLoading={loading}
      destroyOnHidden={destroyOnClose}
      footer={footer ? undefined : null}
      className={className}
    >
      {description && (
        <p className="text-sm mb-4 text-gray-500">{description}</p>
      )}
      <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {children}
      </div>
    </Modal>
  );
};

export default CommonModal;
