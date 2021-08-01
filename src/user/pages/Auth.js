import React,  {useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Grow
} from "@material-ui/core";

import Login from '../components/Login';
import Rejestration from '../components/Rejestration';

const useStyles = makeStyles(theme => ({
  root: {
   display: 'flex',
   justifyContent: 'center',
  }, 
  card: {
    paddingTop: 30,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const Auth = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={classes.root}>
      <Grow in={true}>
        <Card variant="outlined" className={classes.card} square>
          <Typography variant="h6" color="primary">
            Zaloguj się
          </Typography>
          <CardContent>
            <Login />
          </CardContent>
          <Typography variant="body2" component="p">
            Nie masz jeszcze konta?
          </Typography>
          <Typography variant="body2" component="p">
            Zarejestruj się.
          </Typography>
          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={expandClickHandler}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon color="primary" />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="h6" color="primary">
              Zarejestruj się
            </Typography>
            <CardContent>
              <Rejestration />
            </CardContent>
          </Collapse>
        </Card>
      </Grow>
    </div>
  );
};


export default Auth;

