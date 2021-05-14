import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";

//material ui
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import { TextField } from "formik-material-ui";

//my components
import MyButton from "./common/MyButton";
import logo from "../assets/images/logoWhite.png";
//types
import { UserFormValues } from "../types/interfaces";

//config
import { register } from "../config/auth";

let validationSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const Register = () => {
  const initialValues: UserFormValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const useStyle = makeStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      minHeight: 300,
      minWidth: 250,
      justifyContent: "space-between",
    },
    headerText: {
      marginBottom: 20,
    },
  });

  const classes = useStyle();

  return (
    <>
      <ToastContainer />
      <Typography
        className={classes.headerText}
        variant="h5"
        color="textPrimary"
      >
        Register to{" "}
        {
          <img
            src={logo}
            alt="Logo Glitch"
            width="75"
            style={{ marginLeft: 5, marginBottom: -1 }}
          />
        }
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await register(values);
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="fullName"
              type="fullName"
              label="Full Name"
            />
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
            {isSubmitting && <LinearProgress />}

            <MyButton
              name="Submit"
              disabled={isSubmitting}
              onClick={submitForm}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
