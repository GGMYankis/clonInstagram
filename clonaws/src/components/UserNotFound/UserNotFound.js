

import React from 'react';
import "./UserNotFound.css";
import {Link} from "react-router-dom";

function UserNotFound() {

  return (
    <div className='user-not-found'>
      
       <p>Usuario no encontrado</p>
       <p>Es posible que el enlace que has seguido sea incorrecto o que el usuario se haya eliminado</p>
       <Link to="/">Volver a la Home</Link>
    </div>
  )
  
}

export default UserNotFound
