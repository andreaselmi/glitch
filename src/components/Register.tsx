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
import { facebookSignIn, googleSignIn, register } from "../config/auth";
import SocialButtons from "./containers/SocialButtons";

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
        Register to{" "}
        {
          <img
            src={logo}
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
      <Typography
        style={{ textAlign: "center", margin: "15px 0" }}
        variant="subtitle2"
        color="textPrimary"
      >
        or
      </Typography>
      <SocialButtons
        handleFacebook={() => facebookSignIn()}
        handleGoogle={() => googleSignIn()}
      />
    </>
  );
};

export default Register;
