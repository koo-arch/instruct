import useWebSoket from './useWebSoket';
import { countUsersStatusFetchSuccess, countUsersStatusFetchFailure } from '../redux/countUsersStatusSlice';

import urls from '../api/urls';

const useWsCountUsersStatus = () => {
    const url = urls.CountUsersStatus;

    useWebSoket(url, "get_count_users_status", countUsersStatusFetchSuccess, countUsersStatusFetchFailure)
    return null
};

export default useWsCountUsersStatus;