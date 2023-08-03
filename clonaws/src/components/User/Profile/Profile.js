import React, { useState } from "react";
import "./Profile.css";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import ImageNoFound from "../../../assets/png/avatar (1).png";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../../Modal/ModalBasic/ModalBasic";
import AvatarForm from "../AvatarForm/AvatarForm";
import useAuth from "../../../hooks/useAuth";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import SettignsForm from "../SettignsForm/SettignsForm";
import Followers from "./Followers/Followers";

function Profile(props) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const { auth } = useAuth();

  const { username, totalPublications } = props;

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  const { getUser } = data;

  const handlerModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);

        break;

      case "settigns":
        setTitleModal("");
        setChildrenModal(
          <SettignsForm
            refetch={refetch}
            getUser={getUser}
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
          />
        );
        setShowModal(true);

      default:
        break;
    }
  };

  return (
    <>
      <div className="profile">
        <div className="profile__left">
          <img
            src={getUser.avatar ? getUser.avatar : ImageNoFound}
            onClick={() => username === auth.username && handlerModal("avatar")}
          />
        </div>
        <div className="profile__right">
          <HeaderProfile
            getUser={getUser}
            auth={auth}
            handlerModal={handlerModal}
          />
          <Followers
            username={username}
            totalPublications={totalPublications}
          />
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                {getUser.siteWeb}
              </a>
            )}
            {getUser.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </div>
      </div>

      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
export default Profile;
