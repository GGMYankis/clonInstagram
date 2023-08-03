import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import "./Auth.css"

import React, { useState } from 'react'

function Auth() {

  const[showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="auth">
      <h1>Mensager</h1>
      <div className="container-form">
      {showLogin ? <LoginForm/> : <RegisterForm setShowLogin={setShowLogin}/> } 
         
      </div>

      <div className="change-form">
        <p>
       { showLogin ? (
        <>
        No tienes cuenta?
        <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
        </>
       ) : (
        <>
        Entra con tu cuenta?
        <span onClick={() => setShowLogin(!showLogin)}>Iniciar sesion</span>
        </>
       )} 
       </p>
      </div>

    </div>
  )
}

export default Auth;