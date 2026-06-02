import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onBackdropClick: () => void;
  children: ReactNode;
}

export function Modal({ open, onBackdropClick, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[8px]"
        onClick={onBackdropClick}
      />
      {children}
    </>
  );
}
