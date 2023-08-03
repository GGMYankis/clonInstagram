import React from 'react';
import "./PasswordForm.css";
import {Form, Button, FormInput} from "semantic-ui-react"
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import {UPDATE_USER} from "../../../gql/user"
import {toast} from "react-toastify";
function PasswordForm(props) {


  const {logout} = props;

  const[updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            currentPassword:Yup.string().required(),
            newPassword:Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword:Yup.string().required().oneOf([Yup.ref("newPassword")]),
        }),
          onSubmit: async(formValue) => {

            try {
               const resul = await updateUser({variables:{input:{
                currentPassword:formValue.currentPassword,
                newPassword:formValue.newPassword
               }}})

              if(!resul.data.updateUser){
                alert("Error al cambiar la contrasena")
              }else{
                logout();
              }
              
            } catch (error) {
              console.log("Error al cambiar la contrasena")
            }
        }

    })

  return (
    <Form className='password-form' onSubmit={formik.handleSubmit}>  
      
       <Form.Input
        type='password'
        placeholder="Contrasena actual" 
        name="currentPassword"
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
       />
       
       <Form.Input
        type='password'
        placeholder="Nueva Contrasena" 
        name="newPassword"
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}

       />
         <Form.Input
        type='password'
        placeholder="Repetir nueva  Contrasena" 
        name="repeatNewPassword"
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
       />

       <Button type='submit' className='btn-submit'>Actualizar</Button>
    </Form>
  )
   
}

export default PasswordForm


function initialValues(){
    return {
        currentPassword:"",
        newPassword:"",
        repeatNewPassword:""
    }
}