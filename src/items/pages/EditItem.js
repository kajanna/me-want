import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Link,
} from "@material-ui/core";

import ItemForm from "../components/ItemForm";
import useHttpClient from "../../shared/hooks/http-req-hook";
import ErrorModal from "../../shared/UIcustom/ErrorModal";
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";
import { useAuth } from "../../shared/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    paddingTop: 20,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "40%",
    },
  },
}));

const EditItem = () => {
  const classes = useStyles();
  const { uid, token } = useAuth();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState();
  const [loadedItemData, setLoadedItemData] = useState();
  const itemId = useParams().itemId;

  const setForm = useCallback(async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}`,
        "GET",
        { Authorization: `Bearer ${token}` }
      );
      setLoadedItem(response.data.item);
      setLoadedItemData({
        item: response.data.item.item,
        url: response.data.item.url,
        description: response.data.item.description,
        pictureUrl: response.data.item.pictureUrl,
        wantedType: response.data.item.wantedType,
        public: response.data.item.public,
      });
    } catch (err) {}
  }, [itemId, token, sendRequest]);

  useEffect(() => {
    setForm();
  }, [setForm, token]);

  return (
    <>
      { isLoading && <LoadingSpinner/> }
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <Container className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            {!loadedItem && !isLoading && (
              <div>
                <Typography variant="subtitle2" color="secondary">
                  Niestety nie znaleźliśmy twojego przedmiotu. Pewnie utknął w
                  tym samym miejscu co znikające skarpety
                </Typography>
                <Link component={RouterLink} to={`/user/${uid}`}>
                  <Typography variant="button">Wróć do swojej listy</Typography>
                </Link>
              </div>
            )}
            {loadedItemData && (
              <div>
                <Typography variant="h5" color="primary">
                  Edytuj przedmiot
                </Typography>
                <ItemForm
                  formData={loadedItemData}
                  reqMethod="PATCH"
                  reqPath={`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}`}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EditItem;
