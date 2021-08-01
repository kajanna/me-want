import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Box, 
  CircularProgress
} from '@material-ui/core';
import {
  TextField
} from 'formik-material-ui';

import { useAuth } from '../../shered/context/AuthContext';
import ErrorModal from '../../shered/UIcustom/ErrorModal';
import useHttpClient from '../../shered/hooks/http-req-hook';

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
    <React.Fragment>
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
              {isLoading && <CircularProgress color="secondary" />}
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
    </React.Fragment>
  );
};
export default Login;