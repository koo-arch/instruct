import React from 'react';
import { useSelector } from 'react-redux';
import useWsCurrentTimetable from '../../hooks/useWsCurrentTimetable';
import CustomLink from '../../components/CustomLink';
import Loading from '../../components/loading';
import PatrolStatus from './patrolStatus';
import CountUsersStatus from './countUsersStatus';
import { Typography } from '@mui/material';

const RecordStatus = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
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
                        {isAuthenticated ?
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                巡回が未完了の場合は
                                <CustomLink to="/records/patroltime">巡回時間記録</CustomLink>、
                                <CustomLink to="/records/countusers">利用人数記録</CustomLink>
                                をそれぞれのページから記録してください。<br />
                            </Typography>
                            :
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                ログインすると巡回記録を登録できます。<br />
                            </Typography>


                        }
                        <PatrolStatus title="巡回時間記録" />
                        <CountUsersStatus title="利用人数記録" />
                    </div>
                    :
                    <div>
                        {
                            detail ?
                                <Typography component={"h1"} variant='h3'>
                                    授業時間外
                                </Typography>
                            :
                                <Loading open={!detail} />
                        }
                    </div>
                )
            }
        </div>
    )
}

export default RecordStatus;