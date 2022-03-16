import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { createPortal } from "react-dom";

const useStyles = makeStyles(() => ({
  content: {
    position: "absolute",
    top: "40%",
    width: "100%",
    zIndex: 1000,
    textAlign: "center",
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();
  const Spinner = (
    <div className={classes.content}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" size={80} />
      </div>
    </div>
  );
  return createPortal(Spinner, document.getElementById("loading-spinner"));

  //   <Dialog
  //     PaperProps={{classes :classes.content}}
  //     open={props.isLoading}
  //     disableEscapeKeyDown
  //     TransitionComponent={Transition}
  //     aria-labelledby="circular-progress-loading"
  //     aria-describedby="circular-progress-loading"
  //   >
  //     <div className={classes.content}>
  //       <CircularProgress color="primary" size={80}/>
  //     </div>
  //   </Dialog>
  //);
};

export default LoadingSpinner;
