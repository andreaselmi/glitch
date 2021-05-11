import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

//types
import { UserFormValues } from "../types/interfaces";

let validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
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
          console.log(values);
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
