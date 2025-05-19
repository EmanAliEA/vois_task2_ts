import { createPortal } from "react-dom";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalRoot = document.querySelector("#modal");

  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  return createPortal(
    <dialog className="bg-gray-50/0 z-50 fixed flex items-center justify-center py-30 w-screen m-auto outline-none">
      {children}
    </dialog>,
    modalRoot
  );
};

export default Modal;
