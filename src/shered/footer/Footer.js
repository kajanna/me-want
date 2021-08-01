import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
      toolBar: {
        width: '100%',
        marginTop: 40,
        bottom: 0,
        backgroundColor: theme.palette.secondary.light,
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center'
      },
      footerText: {
          fontSize: 8
      }
}));

const Footer = () => {
  const classes = useStyles();

  return (

      <Toolbar className={classes.toolBar}>
        <Typography  className={classes.footerText}>
          Kaja Szokalska 2021
        </Typography>
      </Toolbar>

  );
};
        
export default Footer;