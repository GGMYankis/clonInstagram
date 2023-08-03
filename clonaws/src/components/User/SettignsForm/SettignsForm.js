import React from "react";
import "./SettignsForm.css";
import { Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm/PasswordForm";
import EmailForm from "../EmailForm/EmailForm";
import DescriptionForm from "../DescriptionForm/DescriptionForm";
import SiteWebForm from "../SiteWebForm/SiteWebForm";

export default function SettignsForm(props) {
  const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } =
    props;
  const { logout } = useAuth();
  const cliente = useApolloClient();
  const history = useHistory();

  const onChangePassword = () => {
    setTitleModal("Cambiar tu contrasena");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar tu contrasena");
    setChildrenModal(
      <EmailForm
        refetch={refetch}
        currentEmail={getUser.email}
        setShowModal={setShowModal}
      />
    );
  };
  const onChangeDescription = () => {
    setTitleModal("Actualizar tu biografia");
    setChildrenModal(
      <DescriptionForm
        refetch={refetch}
        currentDescription={getUser.description}
        setShowModal={setShowModal}
      />
    );
  };

  const onChangeSiteWeb = () => {
    setTitleModal("Actualizar tu sitio web");
    setChildrenModal(
      <SiteWebForm
        refetch={refetch}
        currentSiteWeb={getUser.siteWeb}
        setShowModal={setShowModal}
      />
    );
  };

  const onLogout = () => {
    cliente.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="settigns-form">
      <Button onClick={onChangePassword}>Cambiar contrasena</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Description</Button>
      <Button onClick={onChangeSiteWeb}>SiteWeb</Button>
      <Button onClick={onLogout}>Cerrar sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
