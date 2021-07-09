import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MdClose } from 'react-icons/md';

const Modal = ({modalTitre, ...props }) => {
  const { modal, handleModal, modalContent } = useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div onClick={() => handleModal()} className="modal_backdrop">
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <Container maxWidth="lg">
            <div className="modal_header">
              <div className="modal_close" onClick={() => handleModal()}><MdClose /></div>
            </div>
            {modalContent}
          </Container>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
