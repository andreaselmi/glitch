import React from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

//types
import { UserFormValues } from "../types/interfaces";
import { auth } from "../config/firebase";

let validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
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

  const login = async (values: UserFormValues) => {
    try {
      const res = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log(res);
      history.push("/explore");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyle();

  return (
    <>
      <Typography
        className={classes.headerText}
        variant="h5"
        color="textPrimary"
      >
        Login to GLITCH
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values);
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

export default Login;
