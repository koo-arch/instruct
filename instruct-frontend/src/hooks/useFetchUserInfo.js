import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useCustomContext } from '../components/customContexts';
import useAuthAxios from './useAuthAxios';
import useLogout from './useLogout';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import urls from '../api/urls';


const useFetchUserInfo = () => {
    const [cookies, ] = useCookies(["accesstoken", "refreshtoken"]);
    const authAxios = useAuthAxios();
    const { setSnackbarStatus } = useCustomContext();
    const dispatch = useDispatch();
    const logout = useLogout();

    const fetchUserInfo = async () => {
        try {
            const res = await authAxios.get(urls.UserInfo)
            dispatch(loginSuccess({
                username: res.data.username,
                email: res.data.email,
            }));
            return res.data
        } catch (err) {
            logout();
            console.log(err);
            setSnackbarStatus({
                open: true,
                severity: "error",
                message: `エラーが発生しました。再度ログインしてください。(code:${err.response.status})`,
            });
        }
    }

    useEffect(() => {
        if (!!cookies.accesstoken) {
            fetchUserInfo()
        }
    },[dispatch])

    return fetchUserInfo;
}

export default useFetchUserInfo;