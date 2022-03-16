import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { Button, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import { useAuth } from "../../shared/context/AuthContext";
import ErrorModal from "../../shared/UIcustom/ErrorModal";
import useHttpClient from "../../shared/hooks/http-req-hook";
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";

const Login = () => {
  const history = useHistory();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();

  const { login } = useAuth();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .max(50, "Za długi adres email")
      .email("Nieprawidłowy adres email")
      .required("Wymagane pole"),
    password: Yup.string()
      .min(8, "Za krótkie hasło")
      .max(50, "Za długie hasło")
      .required("Wymagane pole"),
  });

  return (
    <> 
      {isLoading && <LoadingSpinner />}
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          try {
            const response = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/users/login`,
              "POST",
              { "Content-Type": "application/json" },
              {
                email: values.email,
                password: values.password,
              }
            );
            if (response) {
              login(response.data.userId, response.data.token);
              history.push(`/user/${response.data.userId}`);
            }
          } catch (err) {}
        }}
      >
        {({ submitForm, touched, isValid }) => {
          return (
            <Form>
              <Box margin={2}>
                <Field
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  type="email"
                  label="email"
                  name="email"
                  size="small"
                />
              </Box>
              <Box margin={2}>
                <Field
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  type="password"
                  label="hasło"
                  name="password"
                  size="small"
                />
              </Box>
              <Box margin={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  disabled={!isValid || isLoading || !touched}
                  onClick={submitForm}
                >
                  Zaloguj
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Login;
