import React from 'react';
import PatrolStatus from '../features/patrolStatus';
import CountUsersStatus from '../features/countUsersRecord/countUsersStatus';
import { Box } from '@mui/material';

const Top = () => {
    return (
        <Box>
            <PatrolStatus/>
            <CountUsersStatus/>
        </Box>
    )
}

export default Top;