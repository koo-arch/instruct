import { useCookies } from 'react-cookie';
import { useCustomContext } from '../components/customContexts';
import useAuthAxios from './useAuthAxios';
import useLogout from './useLogout';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import urls from '../api/urls';


const useGetUserInfo = () => {
    const [cookies, ] = useCookies(["accesstoken", "refreshtoken"]);
    const authAxios = useAuthAxios();
    const { setSnackbarStatus } = useCustomContext();
    const dispatch = useDispatch();
    const logout = useLogout();

    const getUserInfo = async () => {
        return await authAxios.get(urls.UserInfo)
    }

    const onSubmit = () => {
        if (!!cookies.accesstoken) {
            getUserInfo()
                .then(res => {
                    dispatch(loginSuccess({ 
                        username: res.data.username,
                        email: res.data.email,
                    }));
                })
                .catch(err => {
                    logout();
                    console.log(err)
                    console.log(err.response.data)
                    setSnackbarStatus({
                        open: true,
                        severity: "error",
                        message: `エラーが発生しました。再度ログインしてください。(code:${err.response.status})`,
                    });
                })
        }
    }

    return onSubmit;
}

export default useGetUserInfo;