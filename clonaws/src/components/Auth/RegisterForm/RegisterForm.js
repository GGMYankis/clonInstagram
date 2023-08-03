import React, { useState } from "react";
import "./RegisterForm.css";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";

function RegisterForm(props) {
  const [error, setError] = useState();

  const { setShowLogin } = props;

  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("Tu nombre es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre del usuario no puede tener espacio"
        )
        .required("el nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El email no es  valido")
        .required("El emial es obligatorio"),
      password: Yup.string()
        .required("EL password es obligatorio")
        .oneOf([Yup.ref("repeatPassword")], "Las contrasenas no coinciden"),
      repeatPassword: Yup.string()
        .required("EL password es obligatorio")
        .oneOf([Yup.ref("password")], "Las contrasenas no coinciden"),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        const result = await register({
          variables: {
            input: newUser,
          },
        });

        setShowLogin(true);
      } catch (error) {
        setError(error.message);
      }
    },
  });

  return (
    <>
      <h1 className="register-form-title">
        Registrate para ver foto y videos de tus amigos
      </h1>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          error={formik.errors.name}
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
        />
        <Form.Input
          error={formik.errors.username}
          onChange={formik.handleChange}
          value={formik.values.username}
          type="text"
          placeholder="Nombre de usuario"
          name="username"
        />
        <Form.Input
          error={formik.errors.email}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="text"
          placeholder="Correo electronico"
          name="email"
        />
        <Form.Input
          error={formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          placeholder="Contrasena"
          name="password"
        />
        <Form.Input
          error={formik.errors.repeatPassword}
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          type="password"
          placeholder="Repetir Contrasena"
          name="repeatPassword"
        />
        <button className="btn-submit" type="submit">
          Registrarse
        </button>

        {error ? <label>{error}</label> : ""}
      </Form>
    </>
  );
}

export default RegisterForm;

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
