import React from 'react';
import { useSelector } from 'react-redux';
import useFetchCountUsersStatus from '../../hooks/useFetchCountUsersStatus';
import Loading from '../../components/loading';
import StatusField from './statusField';

const CountUsersStatus = () => {
    const countUsersStatus = useSelector(state => state.countUsersStatus);

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
                        title="利用人数記録"
                    />
            }
        </div>
    )
}

export default CountUsersStatus;