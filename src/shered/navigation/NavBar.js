import React from 'react';

import { AppBar, IconButton, Slide }  from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import NavLinks from './NavLinks';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
    appBarWelcome: {
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: "#faf1e6",
      paddingLeft: 40,
        [theme.breakpoints.up('sm')]: {
          height: 80,
          justifyContent: 'flex-end'
        }
    },
    appBar: {
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center',
      paddingLeft: 30,
      backgroundColor: '#fdfaf6',
    },

    menuDisplay: {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      },
    },
    navLinks: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        marginLeft: 'auto'
      }
    },
   
  }));

const NavBar = (props) => {
    const classes = useStyles();
    
    return (
      <Slide in={props.show}>
        <AppBar
          className={props.welcome ? classes.appBarWelcome : classes.appBar}
        >
          <IconButton
            edge="start"
            className={classes.menuDisplay}
            aria-label="menu"
            onClick={props.onToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.navLinks} color="secondary">
            <NavLinks />
          </div>
        </AppBar>
      </Slide>
    );
}

export default NavBar;