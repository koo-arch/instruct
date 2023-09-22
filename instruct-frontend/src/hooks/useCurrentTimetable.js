import { useState, useEffect } from 'react';
import axios from '../api/axios';
import urls from '../api/urls';

const useCurrentTimetable = () => {
    const [schoolPeriod, setSchoolPeriod] = useState(0);

    const fetchCurrentTimetable = async () => {
        try {
            const response =  await axios.get(urls.CurrentTimetable)
            setSchoolPeriod(response.data.school_period)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCurrentTimetable();
        const interval = setInterval(fetchCurrentTimetable, 5000);

        return () => {
            clearInterval(interval);
        }
    },[])

    return schoolPeriod;
}

export default useCurrentTimetable;