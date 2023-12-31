import React from 'react';
import useWsCountUsersStatus from '../../hooks/useWsCountUsersStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';
import isCompletedField from './isCompletedField';

const CountUsersStatus = ({ title }) => {
    const countUsersStatus = useSelector(state => state.countUsersStatus)

    useWsCountUsersStatus();

    const columns = [
        { field: 'place', headerName: '巡回場所', sortable: false, flex: 1 },
        { ...isCompletedField }
    ]

    return (
        <StatusField
            rows={countUsersStatus.status}
            columns={columns}
            title={title}
        />
    )
}

export default CountUsersStatus;