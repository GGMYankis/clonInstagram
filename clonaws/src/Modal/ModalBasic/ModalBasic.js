import React from "react";
import "./ModalBasic.css";
import { Modal } from "semantic-ui-react";
import AvatarForm from "../../components/User/AvatarForm";

function ModalBasic(props) {
  const { show, setShow, title, children } = props;

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
}

export default ModalBasic;
