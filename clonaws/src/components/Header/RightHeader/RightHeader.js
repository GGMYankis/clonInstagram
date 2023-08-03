import React, { useState } from "react";
import "./RightHeader.css";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import ImageNoFound from "../../../assets/png/avatar (1).png";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import ModalUpload from "../../../Modal/ModalUpload/ModalUpload";

function RightHeader() {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="rightHeader">
        <Link to="/" name="home">
          Home
        </Link>
        <p onClick={() => setShowModal(true)}>+</p>
        <Link to={`/${auth.username}`}>
          <img src={getUser.avatar ? getUser.avatar : ImageNoFound} />
        </Link>
      </div>

      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
}

export default RightHeader;
