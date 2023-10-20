import React from 'react';
import useWsPatrolStatus from '../../hooks/useWsPatrolStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';
import isCompletedField from './isCompletedField';
import Loading from '../../components/loading';


const PatrolStatus = ({title}) => {
  const patrolStatus = useSelector(state => state.patrolStatus)
  const isLoading = patrolStatus.isLoading
  useWsPatrolStatus();

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
          rows={patrolStatus.status}
          columns={columns}
          title={title}
        />
      }
    </div>
  )
}

export default PatrolStatus;