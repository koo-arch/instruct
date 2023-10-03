import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentTimetableFetchSuccess, currentTimetableFetchFailure } from '../redux/currentTimetableSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useCurrentTimetable = () => {
    const dispatch = useDispatch();

    const fetchCurrentTimetable = async () => {
        try {
            const response =  await axios.get(urls.CurrentTimetable)
            dispatch(currentTimetableFetchSuccess(response.data.school_period))
        }
        catch (err) {
            console.log(err);
            dispatch(currentTimetableFetchFailure(err.message))
        }
    }
    useEffect(() => {
        fetchCurrentTimetable();
        const interval = setInterval(fetchCurrentTimetable, 100000);

        return () => {
            clearInterval(interval);
        }
    },[])

    return null;
}

export default useCurrentTimetable;