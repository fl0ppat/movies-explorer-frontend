/* eslint-disable react/prop-types */
import React from "react";
import useModal from "../utils/useModal";
import Modal from "../components/Modal/Modal";

let ModalContext;
const { Provider } = (ModalContext = React.createContext());

const ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent, closable, closeModal } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent, closable, closeModal }}>
      <Modal closable={closable} />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
