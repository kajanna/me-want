
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    logo: {
        fontFamily: 'Norican, cursive',
        color: theme.palette.primary.main
    }

}))

const Logo = () => {
    const classes = useStyles();
    return <p className={classes.logo}>Me Want!</p> 
}

export default Logo;