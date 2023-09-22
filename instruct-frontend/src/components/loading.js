import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = (props) => {
  return (
    <Backdrop open={props.open}>
        <CircularProgress color="inherit"/>
    </Backdrop>
  )
}

export default Loading;