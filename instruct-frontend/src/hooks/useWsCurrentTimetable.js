import useWebSoket from './useWebSoket';
import { currentTimetableFetchSuccess, currentTimetableFetchFailure } from '../redux/currentTimetableSlice';
import urls from '../api/urls';

const useWsCurrentTimetable = () => {
    const url = 'ws://127.0.0.1:8000/ws' + urls.CurrentTimetable;

    useWebSoket(url, "get_current_timetable", currentTimetableFetchSuccess, currentTimetableFetchFailure)

    return null;

};

export default useWsCurrentTimetable;