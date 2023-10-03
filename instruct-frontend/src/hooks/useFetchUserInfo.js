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
        return await authAxios.get(urls.UserInfo)
    }

    useEffect(() => {
        if (!!cookies.accesstoken) {
            fetchUserInfo()
                .then(res => {
                    dispatch(loginSuccess({ 
                        username: res.data.username,
                        email: res.data.email,
                    }));
                })
                .catch(err => {
                    logout();
                    console.log(err)
                    setSnackbarStatus({
                        open: true,
                        severity: "error",
                        message: `エラーが発生しました。再度ログインしてください。(code:${err.response.status})`,
                    });
                })
        }
    },[dispatch])

    return null;
}

export default useFetchUserInfo;