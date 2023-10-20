import React from 'react';
import useWsCountUsersStatus from '../../hooks/useWsCountUsersStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';
import isCompletedField from './isCompletedField';
import Loading from '../../components/loading';

const CountUsersStatus = ({title}) => {
    const countUsersStatus = useSelector(state => state.countUsersStatus)
    const isLoading = countUsersStatus.isLoading
    
    useWsCountUsersStatus();

    const columns = [
        { field: 'place', headerName: '巡回場所', sortable: false, flex: 1 },
        {...isCompletedField}
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
                    title={title}
                />
            }
        </div>
    )
}

export default CountUsersStatus;