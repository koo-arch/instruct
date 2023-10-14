import useWebSoket from './useWebSoket';
import { countUsersStatusFetchSuccess, countUsersStatusFetchFailure } from '../redux/countUsersStatusSlice';

import urls from '../api/urls';

const useWsCountUsersStatus = () => {
    const url = 'ws://127.0.0.1:8000/ws' + urls.CountUsersStatus;

    useWebSoket(url, "get_count_users_status", countUsersStatusFetchSuccess, countUsersStatusFetchFailure)
    return null
};

export default useWsCountUsersStatus;