import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { 
    IconButton, 
    Dialog,  
    DialogContent,
    Slide, 
    Typography,
    Box,
    Divider
} from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    content: {
       margin: 20,
       marginTop: 0 
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    infoText: {
      marginBottom: 30
    },
    errorText: {
      marginTop: 30,
      marginBottom: 30
    }
}));

const ErrorModal = props => {
  const classes = useStyles();
    
  return (
    <Dialog
      onClick={props.close}
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.close}
      onBackdropClick={props.close}
      aria-labelledby="alert-dialog-slide-error"
      aria-describedby="alert-dialog-error-has-occured"
    >
      <IconButton className={classes.closeButton}>
        <CloseIcon color="secondary" />
      </IconButton>
      <DialogContent className={classes.content}>
        <Typography color="primary" variant="h6" gutterBottom align="center" className={classes.infoText}>
          Coś poszło nie tak
        </Typography>
        <Divider />
        <Typography color="textSecondary" variant="body1" gutterBottom align="center"  className={classes.errorText}>
          {props.error}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
export default ErrorModal;