import useWebSoket from './useWebSoket';
import { patrolStatusFetchSuccess, patrolStatusFetchFailure } from '../redux/patrolStatusSlice';
import urls from '../api/urls';

const useWsPatrolStatus = () => {
    const url = urls.PatrolStatus;

    useWebSoket(url, "get_patrol_status", patrolStatusFetchSuccess, patrolStatusFetchFailure)
    
    return null;

};

export default useWsPatrolStatus;