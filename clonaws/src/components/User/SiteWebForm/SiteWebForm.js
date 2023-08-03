import React from 'react';
import {Button, Form} from "semantic-ui-react";
import "./SiteWebForm.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@apollo/client"
import {UPDATE_USER} from "../../../gql/user"
 

function SiteWebForm(props) {

    const {currentSiteWeb,setShowModal,refetch} = props;
    const[updateUser] = useMutation(UPDATE_USER);


    
    const formik = useFormik({
        initialValues:{
            siteWeb:currentSiteWeb || ""
        }
        ,
        validationSchema:Yup.object({
            siteWeb:Yup.string().required()
        }),
        onSubmit:async (formData) => {
            try {
                await updateUser({variables:{input:formData}})
                refetch();
                setShowModal(false);
            } catch (error) {
                alert("error al actualizar tu sitio web")
            }
        }

    })

  return ( 
    <Form className='site-web-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
         placeholder="URL WEB"
         name="siteWeb"
         value={formik.values.siteWeb}
         onChange={formik.handleChange}
         error={formik.errors.siteWeb ?  true : false}

        />
        <Button type='submit' className='btn-submit'>Actualizar</Button>
    </Form>
  )
}

export default SiteWebForm

