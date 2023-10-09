import React from 'react';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import PatrolStatus from '../features/patrolStatus';
import CountUsersStatus from '../features/countUsersRecord/countUsersStatus';
import { Box } from '@mui/material';

const Top = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <Box>
            <PatrolStatus/>
            <CountUsersStatus/>
            <CustomSnackbar {...snackbarStatus} />
        </Box>
    )
}

export default Top;