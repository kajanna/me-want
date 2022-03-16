import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  IconButton,
  CardMedia,
  Typography,
  Link,
  CardHeader,
  Divider,
  Grow,
} from "@material-ui/core";
import { Delete, Edit, ExitToApp } from "@material-ui/icons";

import { useAuth } from "../../shared/context/AuthContext";
import useHttpClient from "../../shared/hooks/http-req-hook";
import ErrorModal from "../../shared/UIcustom/ErrorModal";
import DialogModal from "../../shared/UIcustom/DialogModal";
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    [theme.breakpoints.up("sm")]: {
      margin: 20,
      width: 305,
    },
    item: {
      fontSize: 20,
    },
    media: {
      objectFit: "cover",
      width: "100%",
    },
  },
}));

const Item = (props) => {
  const classes = useStyles();
  const { id, item, url, description, pictureUrl, wantedType, creatorId } =
    props;
  const { uid, token } = useAuth();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const openDeleteWarning = () => {
    setShowDeleteWarning(true);
  };
  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
  };

  const deleteItemHandler = async () => {
    setShowDeleteWarning(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${id}`,
        "DELETE",
        { Authorization: `Bearer ${token}` }
      );
      props.onDeleteItem(id);
    } catch (err) {}
  };

  return (
    <>
      { isLoading && <LoadingSpinner/> }
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <DialogModal
        open={!!showDeleteWarning}
        close={closeDeleteWarning}
        onClick={deleteItemHandler}
        title="Usówanie przedmiotu"
        content="Czy na pewno chcesz usunąć przedmiot ze swojej listy?"
      />
      <Grow in={true}>
        <Card className={classes.root} variant="elevation">
          <CardMedia
            className={classes.media}
            component="img"
            alt={item}
            height="305"
            image={pictureUrl}
            title={item}
          />
          <CardHeader
            action={
              <div>
                <IconButton
                  aria-label="go to"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExitToApp />
                </IconButton>
                {uid === creatorId && (
                  <IconButton onClick={openDeleteWarning} aria-label="delete">
                    <Delete />
                  </IconButton>
                )}
                {uid === creatorId && (
                  <Link component={RouterLink} to={`/items/${id}`}>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Link>
                )}
              </div>
            }
            title={
              <Typography variant="body2" color="textSecondary">
                {wantedType}
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Typography
              variant="button"
              color="primary"
              gutterBottom
              className={classes.item}
            >
              {item}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Grow>
    </>
  );
};

export default Item;
