import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./EmailForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UPDATE_USER } from "../../../gql/user";
import { useMutation } from "@apollo/client";

function EmailForm(props) {
  const [updateUser] = useMutation(UPDATE_USER);

  const { currentEmail, setShowModal, refetch } = props;

  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("El email es requerido"),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        className="email-form"
        placeholder="Escribe tu nuevo email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

export default EmailForm;
