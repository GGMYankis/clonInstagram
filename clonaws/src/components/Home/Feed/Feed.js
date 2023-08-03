import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import ImageNOtFound from "../../../assets/png/avatar (1).png";
import { Image } from "semantic-ui-react";
import "./Feed.css";
import Actions from "../../../Modal/ModalPublication/Actions/Actions";
import CommentForm from "../../../Modal/ModalPublication/CommentForm/CommentForm";
import ModalPublication from "../../../Modal/ModalPublication/ModalPublication";

export default function Feed() {
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS_FOLLOWEDS
  );
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return null;

  const { getPublicationFolloweds } = data;

  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };
  return (
    <>
      <div className="feed">
        {map(getPublicationFolloweds, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || ImageNOtFound}
                  avatar
                />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed_box-photo"
              style={{ backgroundImage: `url("${publication.file}")` }}
              onClick={() => openPublication(publication)}
            />
            <div className="feed_box_action">
              <Actions publication={publication} />
            </div>
            <div className="feed_box_-form">
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShow={setShowModal}
          publication={publicationSelect}
        />
      )}
    </>
  );
}
