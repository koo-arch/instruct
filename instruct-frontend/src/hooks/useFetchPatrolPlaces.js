import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { patrolPlacesFetchSuccess, patrolPlacesFetchFailure } from '../redux/patrolPlacesSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchPatrolPlaces = () => {
    const dispatch = useDispatch();

    const fetchPatrolPlaces = async () => {
        return await axios.get(urls.PatrolPlaces)
    }

    useEffect(() => {
        fetchPatrolPlaces()
            .then(res => {
                dispatch(patrolPlacesFetchSuccess(res.data));
            })
            .catch(err => {
                dispatch(patrolPlacesFetchFailure(err.message));
            })
    }, [dispatch])

    return null;
}

export default useFetchPatrolPlaces;