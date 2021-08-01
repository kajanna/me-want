import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Link,
  CardContent,
  CardMedia,
  Tooltip,
  Zoom, 
  Grow
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin:20,
    width: 210,
  },
  media: {
    objectFit: 'cover',
    width: '100%'
  },
  userLink: {
    textDecorationLine: 'none',
    '&:hover': {
      textDecorationLine: 'none',
    },
  }
});

const UserItem = (props) => {
  const classes = useStyles();
  return (
    <Grow in={true}>
      <Card className={classes.root} variant="elevation">
        <CardMedia
          className={classes.media}
          component="img"
          alt={props.name}
          height="200"
          image={props.image}
          title={props.name}
        />
        <CardContent className={classes.cardContent}>
          <Tooltip
            title="Zobacz listę użytkownika"
            arrow
            TransitionComponent={Zoom}
          >
            <Link
              color="primary"
              component={RouterLink}
              to={`/user/${props.id}`}
              className={classes.userLink}
            >
              <Typography variant="button">
                {props.name}
              </Typography>
            </Link>
          </Tooltip>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default UserItem;