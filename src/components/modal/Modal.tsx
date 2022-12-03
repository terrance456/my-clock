import React from "react";
import { createPortal } from "react-dom";
import { useThemeContext } from "../../context/ThemeContext";
import "./modal.scss";

export interface ModalProps {
  toggle?: boolean;
  onModalClose: () => void;
}

const Modal: React.FC<ModalProps> = (props: React.PropsWithChildren<ModalProps>) => {
  const { theme } = useThemeContext();

  const renderModal = () => {
    return (
      <div className="custom-modal">
        <div className="custom-modal-overlay" onClick={props.onModalClose}></div>
        <div className={`custom-modal-content ${theme.bgBody} ${theme.text}`}>{props.children}</div>
      </div>
    );
  };

  return props.toggle ? createPortal(renderModal(), document.body) : null;
};

export default Modal;
