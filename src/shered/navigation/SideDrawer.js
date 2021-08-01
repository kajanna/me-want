import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import NavLinks from './NavLinks';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  SideDrawer: {
    width: 150,
    margin: 30
  }
}));

const SideDrawer = props => {

  const classes = useStyles();

    return (
      <div  onClick={props.closeDrawer}>
        <Drawer open={props.showDrawer}>
          <Box className={classes.SideDrawer}>
            <NavLinks />
          </Box>
        </Drawer>
      </div>

    )
}

export default SideDrawer;