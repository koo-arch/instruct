import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { patrolStatusFetchSuccess, patrolStatusFetchFailure } from '../redux/patrolStatusSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchPatrolStatus = () => {
    const dispatch = useDispatch();

    const fetchPatrolStatusProps = async () => {
        return await axios.get(urls.PatrolStatus);
    }

    useEffect(() => {
        fetchPatrolStatusProps()
            .then(res => {
                dispatch(patrolStatusFetchSuccess(res.data))
            })
            .catch(err => {
                dispatch(patrolStatusFetchFailure(err.message))
            })
    }, [dispatch])

    return null;
}

export default useFetchPatrolStatus;