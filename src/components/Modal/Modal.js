import React from "react";
import ReactDOM from "react-dom";

import { ModalContext } from "../../context/modalContext";
import "./Modal.css";

const Modal = () => {
  let { modalContent, handleModal, modal, closable } = React.useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div className='modal'>
        <div className='modal__inner'>
          {closable && (
            <button className='modal__close' onClick={() => handleModal()}>
              &times;
            </button>
          )}
          {modalContent}
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
