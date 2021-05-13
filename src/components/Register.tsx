import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { UserFormValues } from "../types/interfaces";
import { useHistory } from "react-router";
import { auth } from "../config/firebase";

let validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Register = () => {
  const history = useHistory();

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

  const register = async (values: UserFormValues) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
    } catch (error) {
      //TODO error handling
      console.log(error);
    }
  };

  return (
    <>
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
        onSubmit={(values, { setSubmitting }) => {
          register(values);
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
