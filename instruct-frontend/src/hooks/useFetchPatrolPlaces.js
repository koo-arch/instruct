import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { patrolPlacesFetchSuccess, patrolPlacesFetchFailure } from '../redux/patrolPlacesSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchPatrolPlaces = () => {
    const dispatch = useDispatch();

    const fetchPatrolPlaces = async () => {
        try {
            const res = await axios.get(urls.PatrolPlaces);
            dispatch(patrolPlacesFetchSuccess(res.data));
            return res.data;
        } catch (err) {
            dispatch(patrolPlacesFetchFailure(err.message))
            throw err;
        }
    }

    useEffect(() => {
        fetchPatrolPlaces();
    }, [dispatch])

    // 非同期データの読み込みを待機できるように、fetchPatrolPlacesを直接返す
    return fetchPatrolPlaces;
}

export default useFetchPatrolPlaces;