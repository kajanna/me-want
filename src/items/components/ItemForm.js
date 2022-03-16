import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

import {
  Button,
  Box,
  FormControlLabel,
  MenuItem,
  FormControl,
  Typography,
  Grow,
} from "@material-ui/core";
import { TextField, Switch } from "formik-material-ui";

import useHttpClient from "../../shared/hooks/http-req-hook";
import ErrorModal from "../../shared/UIcustom/ErrorModal";
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";

const ItemForm = (props) => {
  const history = useHistory();
  const { token, uid } = useAuth();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();
  const { formData } = props;

  const wantedTypeSelection = [
    { value: "książki", label: "książki" },
    { value: "hobby", label: "hobby" },
    { value: "ubranie", label: "ubranie" },
    { value: "inne", label: "inne" },
  ];

  const itemSchema = Yup.object().shape({
    item: Yup.string().max(80, "Za długa nazwa").required("Wymagane pole"),
    url: Yup.string().required("Wymagane pole").url("Nieprawidłowy URL"),
    description: Yup.string()
      .min(8, "Za krótki opis")
      .max(100, "Za długi opis")
      .required("Wymagane pole"),
    pictureUrl: Yup.string().url("Nieprawidłowy URL").required("Wymagane pole"),
    wantedType: Yup.string().required("Wymagane pole"),
    public: Yup.boolean().required("Wymagane pole"),
  });

  return (
    <>
      { isLoading && <LoadingSpinner/> }
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <Formik
        validateOnChange
        enableReinitialize
        initialValues={formData}
        validationSchema={itemSchema}
        onSubmit={async (values) => {
          let itemData;
          if (props.reqMethod === "POST") {
            itemData = {
              item: values.item,
              url: values.url,
              description: values.description,
              pictureUrl: values.pictureUrl,
              wantedType: values.wantedType,
              public: values.public,
              creatorId: uid,
            };
          } else {
            itemData = {
              item: values.item,
              url: values.url,
              description: values.description,
              pictureUrl: values.pictureUrl,
              wantedType: values.wantedType,
              public: values.public,
            };
          }
          try {
            const response = await sendRequest(
              props.reqPath,
              props.reqMethod,
              { Authorization: `Bearer ${token}` },
              itemData
            );
            if (response.statusText === "OK") {
              history.push(`/user/${uid}`);
            }
          } catch (err) {}
        }}
      >
        {({ submitForm, isSubmitting, isValid }) => {
          return (
            <React.Fragment>
              <ErrorModal
                open={!!error}
                close={clearErrorHandler}
                error={error}
              />
              <Grow in={true}>
                <Form>
                  <Box margin={2}>
                    <Field
                      fullWidth
                      variant="outlined"
                      component={TextField}
                      type="text"
                      label="nazwa przedmiotu"
                      name="item"
                      size="small"
                    />
                  </Box>
                  <Box margin={2}>
                    <Field
                      fullWidth
                      variant="outlined"
                      component={TextField}
                      type="text"
                      label="URL"
                      name="url"
                      size="small"
                    />
                  </Box>
                  <Box margin={2}>
                    <Field
                      fullWidth
                      variant="outlined"
                      component={TextField}
                      type="text"
                      label="opis"
                      name="description"
                      size="small"
                    />
                  </Box>
                  <Box margin={2}>
                    <Field
                      fullWidth
                      variant="outlined"
                      component={TextField}
                      type="text"
                      label="URL zdjęcia"
                      name="pictureUrl"
                      size="small"
                    />
                  </Box>
                  <Box margin={1}>
                    <FormControl>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          type="text"
                          name="wantedType"
                          label="kategoria"
                          select
                          variant="outlined"
                          helperText="wybierz którąś z powyższych kategorii"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        >
                          {wantedTypeSelection.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box margin={1}>
                    <FormControlLabel
                      control={
                        <Field
                          component={Switch}
                          type="checkbox"
                          name="public"
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Udostępnij innym
                        </Typography>
                      }
                    />
                  </Box>
                  <Box margin={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      disabled={!isValid && isSubmitting}
                      onClick={submitForm}
                    >
                      Dodaj
                    </Button>
                  </Box>
                </Form>
              </Grow>
            </React.Fragment>
          );
        }}
      </Formik>
    </>
  );
};
export default ItemForm;
