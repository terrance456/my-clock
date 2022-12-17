import React from "react";
import { createPortal } from "react-dom";
import { useThemeContext } from "../../context/ThemeContext";
import "./modal.scss";

export interface ModalProps {
  toggle?: boolean;
  onModalClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = (props: React.PropsWithChildren<ModalProps>) => {
  const { theme } = useThemeContext();

  const renderModal = () => {
    return (
      <div className={`custom-modal ${!!props.className ? props.className : ""}`}>
        <div className="custom-modal-overlay" onClick={props.onModalClose}></div>
        <div className={`custom-modal-content ${theme.nav} ${theme.text}`}>{props.children}</div>
      </div>
    );
  };

  return props.toggle ? createPortal(renderModal(), document.body) : null;
};

export default Modal;
