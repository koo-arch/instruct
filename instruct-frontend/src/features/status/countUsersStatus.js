import React from 'react';
import useWsCountUsersStatus from '../../hooks/useWsCountUsersStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';

const CountUsersStatus = ({ title }) => {
    const countUsersStatus = useSelector(state => state.countUsersStatus)

    useWsCountUsersStatus();

    return (
        <StatusField
            rows={countUsersStatus.status}
            title={title}
            isLoading={countUsersStatus.isLoading}
        />
    )
}

export default CountUsersStatus;