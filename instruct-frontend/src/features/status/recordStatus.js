import React from 'react';
import { useSelector } from 'react-redux';
import useWsCurrentTimetable from '../../hooks/useWsCurrentTimetable';
import PatrolStatus from './patrolStatus';
import CountUsersStatus from './countUsersStatus';
import { Typography } from '@mui/material';

const RecordStatus = () => {
    const currentTimetable = useSelector(state => state.currentTimetable)
    useWsCurrentTimetable();
    
    const schoolPeriod = currentTimetable.period?.school_period
    
    return (
        <div>
            {schoolPeriod ?
                <div>
                    <Typography component={"h1"} variant='h4' sx={{ mb: 3 }}>
                        {schoolPeriod}限巡回状況
                    </Typography>
                    <PatrolStatus />
                    <CountUsersStatus />
                </div>
                :
                <Typography component={"h1"} variant='h3'>
                    現在は授業時間外です
                </Typography>
            }
        </div>
    )
}

export default RecordStatus;