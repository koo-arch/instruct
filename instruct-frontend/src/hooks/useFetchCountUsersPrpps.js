import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { countUsersPropsFetchSuccess, countUsersPropsFetchFailure } from '../redux/countUsersPropsSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchCountUsersProps = () => {
    const dispatch = useDispatch();

    const fetchCountUsersProps = async () => {
        return await axios.get(urls.CountUsersProps);
    }

    useEffect(() => {
        fetchCountUsersProps()
            .then(res => {
                dispatch(countUsersPropsFetchSuccess(res.data))
            })
            .catch(err => {
                dispatch(countUsersPropsFetchFailure(err.message))
            })
    }, [dispatch])

    return null;
}

export default useFetchCountUsersProps;