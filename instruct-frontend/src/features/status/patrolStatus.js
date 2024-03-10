import React from 'react';
import useWsPatrolStatus from '../../hooks/useWsPatrolStatus';
import { useSelector } from 'react-redux';
import StatusField from './statusField';


const PatrolStatus = ({ title }) => {
  const patrolStatus = useSelector(state => state.patrolStatus)

  useWsPatrolStatus();

  return (
    <StatusField
      rows={patrolStatus.status}
      title={title}
      isLoading={patrolStatus.isLoading}
    />
  )
}

export default PatrolStatus;