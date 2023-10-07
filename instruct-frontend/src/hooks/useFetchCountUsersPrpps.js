import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { countUsersPropsFetchSuccess, countUsersPropsFetchFailure } from '../redux/countUsersPropsSlice';
import axios from '../api/axios';
import urls from '../api/urls';

const useFetchCountUsersProps = () => {
    const dispatch = useDispatch();

    const fetchCountUsersProps = async () => {
        try {
            const res = await axios.get(urls.CountUsersProps);
            dispatch(countUsersPropsFetchSuccess(res.data));
            return res.data;
        } catch (err) {
            dispatch(countUsersPropsFetchFailure(err.message));
            throw err;
        }
    };

    useEffect(() => {
        fetchCountUsersProps();
    }, [dispatch]);

    // 非同期データの読み込みを待機できるように、fetchCountUsersProps 関数を直接返す
    return fetchCountUsersProps;
}

export default useFetchCountUsersProps;