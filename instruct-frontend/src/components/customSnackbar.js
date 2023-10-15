import React, { forwardRef } from 'react';
import { useCustomContext } from './customContexts';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = (props) => {
    const { open, severity, message } = props;
    const { snackbarStatus, setSnackbarStatus } = useCustomContext();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarStatus({ ...snackbarStatus, open: false });
    };

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar;