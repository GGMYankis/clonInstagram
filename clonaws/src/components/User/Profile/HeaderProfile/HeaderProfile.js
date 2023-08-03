import React from "react";
import "./HeaderProfile.css";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from "../../../../gql/follow";

function HeaderProfile(props) {
  const { getUser, auth, handlerModal } = props;

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });

  const [follow] = useMutation(FOLLOW);
  const [unFollow] = useMutation(UN_FOLLOW);

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <button className="btn-danger" onClick={onunFollow}>
          Dejar de seguir
        </button>
      );
    } else {
      return (
        <button className="btn-action" onClick={onFollow}>
          Seguir
        </button>
      );
    }
  };

  const onunFollow = async () => {
    try {
      await unFollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <button onClick={() => handlerModal("settigns")}>Ajustes</button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}

export default HeaderProfile;
