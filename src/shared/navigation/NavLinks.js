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
      }
    },
    navLinkBtn: {
      color: theme.palette.secondary.light,
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
            <Button className={classes.navLinkBtn}>home</Button>
          </Link>
          <Divider />
          <Link
            component={RouterLink}
            to={token ? `/user/${uid}` : "/auth"}
            className={classes.navLink}
          >
            <Button className={classes.navLinkBtn}>Moja Lista</Button>
          </Link>
          <Divider />
          <Link
            component={RouterLink}
            to={token ? "/new" : "/auth"}
            className={classes.navLink}
          >
            <Button className={classes.navLinkBtn}>Dodaj nowe</Button>
          </Link>
          <Divider />
          {!token && (
            <Link component={RouterLink} to="/auth" className={classes.navLink}>
              <Button className={classes.navLinkBtn}>Zaloguj</Button>
            </Link>
          )}
          {token && (
            <Link className={classes.navLink}>
              <Button onClick={logout} className={classes.navLinkBtn}>Wyloguj</Button>
            </Link>
          )}
          <Divider />
        </Box>
      );
}
       
export default withRouter(NavBar);