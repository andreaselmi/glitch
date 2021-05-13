import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";

//material ui
import {
  Button,
  LinearProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";

//types
import { UserFormValues } from "../types/interfaces";

//config
import { register } from "../config/auth";

let validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Register = () => {
  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const useStyle = makeStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      minHeight: 200,
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
        Register to GLITCH
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

            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
