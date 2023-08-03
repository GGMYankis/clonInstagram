import React, { useState } from "react";
import "./Actions.css";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, IS_LIKE, DELETE_LIKE, COUNT_LIKE } from "../../../gql/like";

export default function Actions(props) {
  const { publication } = props;
  const [addLike] = useMutation(ADD_LIKE);
  const [loadingAction, setLoadingAction] = useState(false);

  const [deleteLike] = useMutation(DELETE_LIKE);
  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKE, {
    variables: { idPublication: publication.id },
  });

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: { idPublication: publication.id },
  });

  const onAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteLike = async () => {
    try {
      await deleteLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLike) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (loading || loadingCount) return null;
  const { isLike } = data;
  const { countLikes } = dataCount;

  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {countLikes}
    </div>
  );
}
