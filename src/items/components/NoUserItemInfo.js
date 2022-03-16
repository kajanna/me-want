import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
      margin: 20
    }
});

const NoUserItemInfo = props => {
    const classes = useStyles();
    return (
      <Card className={classes.card} variant="outlined">
        <Box margin={3}>
          <Typography align="center" variant="body1" color="secondary">
            {props.uid === props.userId
              ? "Nie masz żadnych przedmiotów na liście. Może coś dodasz?"
              : "Użytkownik nie ma na liście żadnych przedmiotów"}
          </Typography>
        </Box>
        <Box margin={3} align="center">
          {props.uid === props.userId ? (
            <Link color="primary" to="/new" component={RouterLink}>
              <Typography variant="button" color="inherit">
                Dodaj przedmioty
              </Typography>
            </Link>
          ) : (
            <Link color="primary" to="/" component={RouterLink}>
              <Typography variant="button" color="inherit">
                Wróć do listy
              </Typography>
            </Link>
          )}
        </Box>
      </Card>
    );
}

export default NoUserItemInfo;