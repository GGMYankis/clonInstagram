import React from 'react'
import {Form, Button, FormInput, TextArea} from "semantic-ui-react"
import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import "./DescriptionForm.css"
import { useMutation } from '@apollo/client';
import {UPDATE_USER} from "../../../gql/user"
function DescriptionForm(props) {

    const {currentDescription, setShowModal,refetch} = props;

    const[updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues:{
            description:currentDescription || ""
        },
        validationSchema:Yup.object({
            description:Yup.string().required()
        }),
         onSubmit: async (formData) => {

            try {
                await updateUser({
                    variables:{
                        input:formData       
                    }
                })
                refetch()
                setShowModal(false);
            } catch (error) {
                console.log("Error al actualizar tu biografia")
            }
            
        }
    })
  return (
    <Form className='description-form' onSubmit={formik.handleSubmit}>
      <TextArea
      onChange={formik.handleChange}
       className={formik.errors.description && "error"}
       value={formik.values.description}
       name="description"
       />
       <Button type='submit'>Actualizar</Button>
    </Form>
  )
}

export default DescriptionForm