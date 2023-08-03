import React, { useCallback, useState } from "react";
import "./AvatarForm.css";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UDPADATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import { Button } from "semantic-ui-react";

function AvatarForm(props) {
  const [loading, setLoadind] = useState(false);

  const { setShowModal, auth } = props;

  const [updateAvatar] = useMutation(UDPADATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    try {
      setLoadind(true);
      const result = await updateAvatar({ variables: { file } });
      const { data } = result;

      if (!data.updateAvatar.status) {
        // toast.warning("Error al actualizar el avatar");
        setLoadind(false);
      } else {
        setLoadind(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    nokeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();

      const { data } = result;
      if (!data.deleteAvatar) {
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={onDeleteAvatar}>Eliminar una foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
}

export default AvatarForm;
