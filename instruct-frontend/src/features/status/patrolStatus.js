import React from 'react';
import { useSelector } from 'react-redux';
import useFetchPatrolStatus from '../../hooks/useFetchPatrolStatus';
import Loading from '../../components/loading';
import StatusField from './statusField';

const PatrolStatus = () => {
  const patrolStatus = useSelector(state => state.patrolStatus);
  
  useFetchPatrolStatus();

  const isLoading = patrolStatus.isLoading

  const columns = [
    { field: 'place', headerName: '巡回場所', sortable: false, flex: 1 },
    { field: 'is_completed', headerName: '状況' , sortable: false, flex: 1 },
  ]

  return (
    <div>
      {
        isLoading ?
          <Loading open={isLoading}/>
          :
          <StatusField
            rows={patrolStatus.status}
            columns={columns}
            title="巡回時間記録"
          />
      }
    </div>
  )
}

export default PatrolStatus;