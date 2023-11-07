import React from 'react';
import useWsPatrolStatus from '../../hooks/useWsPatrolStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';
import isCompletedField from './isCompletedField';


const PatrolStatus = ({ title }) => {
  const patrolStatus = useSelector(state => state.patrolStatus)

  useWsPatrolStatus();

  const columns = [
    { field: 'place', headerName: '巡回場所', sortable: false, flex: 1 },
    { ...isCompletedField }
  ]

  return (
    <StatusField
      rows={patrolStatus.status}
      columns={columns}
      title={title}
    />
  )
}

export default PatrolStatus;