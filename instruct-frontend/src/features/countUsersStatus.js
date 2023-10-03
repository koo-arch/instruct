import React from 'react';
import { useSelector } from 'react-redux';
import useCurrentTimetable from '../hooks/useCurrentTimetable';
import useFetchCountUsersStatus from '../hooks/useFetchCountUsersStatus';
import Loading from '../components/loading';
import StatusField from './statusField';

const CountUsersStatus = () => {
    const currentTimetable = useSelector(state => state.currentTimetable);
    const countUsersStatus = useSelector(state => state.countUsersStatus);

    useCurrentTimetable();
    useFetchCountUsersStatus();

    const isLoading = countUsersStatus.isLoading

    const columns = [
        { field: 'place', headerName: '巡回場所', sortable: false, flex: 1 },
        { field: 'is_completed', headerName: '状況', sortable: false, flex: 1 },
    ]

    return (
        <div>
            {
                isLoading ?
                    <Loading open={isLoading} />
                    :
                    <StatusField
                        rows={countUsersStatus.status}
                        columns={columns}
                        title="利用人数記録状況"
                    />
            }
        </div>
    )
}

export default CountUsersStatus;