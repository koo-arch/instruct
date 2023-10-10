import React from 'react';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import RecordStatus from '../features/status/recordStatus';
import { Box } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <Box>
            <RecordStatus/>
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;