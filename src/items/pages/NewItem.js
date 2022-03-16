import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Card, CardContent, Typography } from "@material-ui/core";

import ItemForm from "../components/ItemForm";

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
const NewItem = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <Typography variant="h5" color="primary">
          Dodaj coś nowego
        </Typography>
        <CardContent>
          <ItemForm
            formData={{
              item: "",
              url: "",
              description: "",
              pictureUrl: "",
              wantedType: "",
              public: "",
            }}
            reqMethod="POST"
            reqPath={`${process.env.REACT_APP_BACKEND_URL}/items`}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewItem;
