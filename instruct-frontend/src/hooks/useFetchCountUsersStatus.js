import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { countUsersStatusFetchSuccess, countUsersStatusFetchFailure } from '../redux/countUsersStatusSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchCountUsersStatus = () => {
    const dispatch = useDispatch();

    const fetchPatrolStatusProps = async () => {
        return await axios.get(urls.CountUsersStatus);
    }

    useEffect(() => {
        fetchPatrolStatusProps()
            .then(res => {
                dispatch(countUsersStatusFetchSuccess(res.data))
            })
            .catch(err => {
                dispatch(countUsersStatusFetchFailure(err.message))
            })
    }, [dispatch])

    return null;
}

export default useFetchCountUsersStatus;