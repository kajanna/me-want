import React, { useState, useEffect } from 'react';
import {
    Box,
    Avatar,
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    avatar: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatarPicture: {
      height: 200,
      width: 200
    }
})
const Fileupload = (props) => {
  const classes = useStyles();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!props.file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.file);
  }, [props.file]);

  return (
    <Box margin={2} className={classes.avatar}>
      {previewUrl && <Avatar variant="square" src={previewUrl} className={classes.avatarPicture}/>}
    </Box>
  );
};

export default Fileupload;


