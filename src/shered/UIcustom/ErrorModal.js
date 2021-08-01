import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { 
    IconButton, 
    Dialog,  
    DialogContent,
    Slide, 
    Typography,
} from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    content: {
       marginTop: 0,
       margin: 10,
       marginBottom:20
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
}));

const ErrorModal = props => {
  const classes = useStyles();
    
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.close}
      onBackdropClick={props.close}
      aria-labelledby="alert-dialog-slide-error"
      aria-describedby="alert-dialog-error-has-occured"
    >
      <IconButton onClick={props.close} className={classes.closeButton}>
        <CloseIcon color="secondary" />
      </IconButton>
      <DialogContent className={classes.content}>
        <Typography color="primary" variant="h6" gutterBottom align="center">
          Bardzo przepraszamy ale coś poszło nie tak.
        </Typography>
        <Typography color="textSecondary" variant="body1" gutterBottom align="center">
          {props.error}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
export default ErrorModal;