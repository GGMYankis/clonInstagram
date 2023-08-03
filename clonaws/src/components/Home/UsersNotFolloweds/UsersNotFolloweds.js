import React from "react";
import { Image, List } from "semantic-ui-react";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import { Link } from "react-router-dom";
import ImagenNotFound from "../../../assets/png/avatar (1).png";

export default function UsersNotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);
  if (loading) return null;

  const { getNotFolloweds } = data;
  return (
    <div className="users-not-followeds">
      <h3>Usuarios que no sigues</h3>
      {map(getNotFolloweds, (user, index) => (
        <Link key={index} to={`/${user.username}`}>
          <Image src={user.avatar || ImagenNotFound} avatar />
          <span>{user.username}</span>
        </Link>
      ))}
    </div>
  );
}
