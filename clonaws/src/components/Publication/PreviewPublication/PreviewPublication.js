import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import "./PreviewPublication.css";
import ModalPublication from "../../../Modal/ModalPublication/ModalPublication";
export default function PreviewPublication(props) {
  const [showModal, setShowModal] = useState(false);
  const { publication } = props;
  return (
    <>
      <div className="Preview-Publication" onClick={() => setShowModal(true)}>
        <Image src={publication.file} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
}
