import React from 'react';
import { useSelector } from 'react-redux';
import useWsCurrentTimetable from '../../hooks/useWsCurrentTimetable';
import Loading from '../../components/loading';
import PatrolStatus from './patrolStatus';
import CountUsersStatus from './countUsersStatus';
import { Typography } from '@mui/material';

const RecordStatus = () => {
    const currentTimetable = useSelector(state => state.currentTimetable)
    useWsCurrentTimetable();

    const schoolPeriod = currentTimetable.period?.school_period
    const detail = currentTimetable.period?.detail
    const isLoading = currentTimetable.isLoading

    const isLoadingWebsocket = isLoading && !schoolPeriod && !detail

    return (
        <div>
            {isLoadingWebsocket ?
                <Loading open={isLoadingWebsocket} />
                :
                (schoolPeriod ?
                    <div>
                        <Typography component={"h1"} variant='h3' sx={{ mb: 3 }}>
                            {schoolPeriod}限巡回状況
                        </Typography>
                        <PatrolStatus title="巡回時間記録" />
                        <CountUsersStatus title="利用人数記録" />
                    </div>
                    :
                    <Typography component={"h1"} variant='h3'>
                        授業時間外
                    </Typography>
                )
            }
        </div>
    )
}

export default RecordStatus;