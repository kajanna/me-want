import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button, 
    Dialog,  
    DialogContent,
    Slide, 
    Typography
  } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
    },
    content: {
      paddingBottom: 28
    },
    buttonsSection: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'space-around'
    }

}));

const DialogModal = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      classs={classes.root}
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.close}
      onBackdropClick={props.close}
      aria-labelledby="alert-dialog-delete-warning"
      aria-describedby="alert-dialog-delete-warning"
    >
      <DialogContent className={classes.content}>
        <Typography
          color="primary"
          variant="h6"
          paragraph={true}
          align="center"
        >
          {props.title}
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="body2"
          paragraph={true}
        >
          {props.content}
        </Typography>
        <div className={classes.buttonsSection}>
          <Button variant="outlined" color="secondary" onClick={props.close}>
            nie
          </Button>
          <Button variant="outlined" color="primary" onClick={props.onClick}>
            tak
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;