import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField
} from 'formik-material-ui';
import {
  Button,
  Box,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

import Fileupload from '../../shared/UIcustom/FileUpload';
import { useAuth } from '../../shared/context/AuthContext';
import ErrorModal from '../../shared/UIcustom/ErrorModal';
import useHttpClient from '../../shared/hooks/http-req-hook';
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Za długie imię")
    .required("Wymagane pole"),
  email: Yup.string()
    .max(50, "Za długi adres email")
    .email("Nieprawidłowy adres email")
    .required("Wymagane pole"),
  password: Yup.string()
    .min(8, "Hasło powinno mieć przynajmniej 8 znaków")
    .max(50, "Za długie hasło")
    .required("Wymagane pole"),
  image: Yup.mixed()
    .test(
      "fileType",
      "Nieprawidłowy format pliku. Formaty akceptowane: jpg, jpeg, png",
      (value) =>
        value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    )
    .required("Wymagane pole"),
});

const Rejestration = () => {
  const history = useHistory();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();
  const { login } = useAuth();

  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          file: null,
        }}
        validationSchema={registrationSchema}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("image", values.image);
            const response = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
              "POST",
              { "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': true},
              formData
            );
            login(response.data.userId, response.data.token);
            history.goBack();
          } catch (err) {}
        }}
      >
        {({ submitForm, touched, isValid, setFieldValue, values }) => {
          return (
            <Form>
              <Box margin={2}>
                <Field
                  fullWidth
                  variant="outlined"
                  component={TextField}
                  type="text"
                  label="imię"
                  name="name"
                  size="small"
                />
              </Box>

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
                <input
                  style={{ display: "none" }}
                  accept=".jpg, .png, .jpeg"
                  id="image"
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <label htmlFor="image">
                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    DODAJ ZDJĘCIE
                  </Button>
                </label>
              </Box>
              <Box margin={2}>
                <Fileupload file={values.image} />
              </Box>
              <Box margin={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  disabled={!isValid || isLoading || !touched}
                  onClick={submitForm}
                >
                  Zarejestruj
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Rejestration;
