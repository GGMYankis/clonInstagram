import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./ModalUpload.css";
import { PUBLISH } from "../../gql/publication";
import { useMutation } from "@apollo/client";

export default function ModalUpload(props) {
  const { show, setShow } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];

    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg , image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const { data } = await publish({
        variables: {
          file: fileUpload.file,
        },
      });
      if (!data.publish.status) {
        alert("Error en la publicacion");
        isLoading(false);
      } else {
        onClose();
      }
    } catch (error) {}
  };
  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrastra tu foto o video que quieras publicar</p>
            <input {...getInputProps()} />
          </>
        )}
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}
      {isLoading && (
        <Dimmer active className="publishing">
          <Loader>
            <p>Publicando...</p>
          </Loader>
        </Dimmer>
      )}
    </Modal>
  );
}
