

import React ,{useState}from 'react';
import "./LoginForm.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Form} from "semantic-ui-react"
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../../gql/user";
import {setToken,decodeToken} from "../../../utils/token";
import useAth from "../../../hooks/useAuth";

function LoginForm() {

  const [error, setError] = useState("");
  const [login]= useMutation(LOGIN);

  const {setUser} = useAth();


  const formik = useFormik({

    initialValues:initialValues(),

    validationSchema:Yup.object({

      email:Yup.string().email("El email no es valido").required("El email es obligatorio"),
      password:Yup.string().required("la contrasena es obligatoria"),
    }),

    onSubmit: async (formData) => {
    try {
      const {data} = await login({
        variables:{
          input:formData
        }
      });
      const{token}=data.login;
      
      console.log(token)
      setToken(token);
      setUser(decodeToken(token))

    } catch (error) {
      
      setError(error.message)
    }
          
      }
  })

  return (

  
    <Form className='login-form' onSubmit={formik.handleSubmit}> 

        <h1>Entra para ver fotos y video de tus amigos</h1>
        <Form.Input error={formik.errors.email} onChange={formik.handleChange} type='text' placeholder='correo electronico' name='email'/>
        <Form.Input error={formik.errors.password}   onChange={formik.handleChange}type='password' placeholder='contrasena' name='password'/>
        <button type='submit' className='btn-submit'>Iniciar sesion</button>

        {error && <p className='submit-error'>{error}</p>}
     
    </Form>
  )
}

export default LoginForm


function initialValues(){
  return{
    email:"",
    password:"",
  }
}