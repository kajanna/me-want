import React from 'react';
import { withRouter } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Link, Divider } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'flex-end', 
      }
    },
    logo: {
      marginLeft: 16,
      padding: 3,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
       
      }
    },
    navLink: {
      margin: 6,
      padding: 6,
      textDecorationLine: 'none',
      '&:hover': {
        textDecorationLine: 'none',
      },
    }
  }));


const NavBar = () => {

      const classes = useStyles();

      const { uid, token, logout } = useAuth();
      
      return (
        <Box className={classes.root}>
          <div className={classes.logo}>
            <Logo />
          </div>
          <Divider />
          <Link component={RouterLink} to="/" className={classes.navLink}>
            <Button>home</Button>
          </Link>
          <Divider />
          <Link
            component={RouterLink}
            to={token ? `/user/${uid}` : "/auth"}
            className={classes.navLink}
          >
            <Button>Moja Lista</Button>
          </Link>
          <Divider />
          <Link
            component={RouterLink}
            to={token ? "/new" : "/auth"}
            className={classes.navLink}
          >
            <Button>Dodaj nowe</Button>
          </Link>
          <Divider />
          {!token && (
            <Link component={RouterLink} to="/auth" className={classes.navLink}>
              <Button>Zaloguj</Button>
            </Link>
          )}
          {token && (
            <Link className={classes.navLink}>
              <Button onClick={logout}>Wyloguj</Button>
            </Link>
          )}
          <Divider />
        </Box>
      );
}
       
export default withRouter(NavBar);