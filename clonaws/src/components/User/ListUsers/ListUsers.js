import React from "react";
import "./ListUsers.css";
import { size, map } from "lodash";
import ImageNotFound from "../../../assets/png/avatar (1).png";
import { Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function ListUsers(props) {
  const { users, setShowModal } = props;
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };

  return (
    <div className="list-users">
      {size(users) === 0 ? (
        <p className="not_users">No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            key={index}
            className="list-users__user"
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || ImageNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListUsers;
