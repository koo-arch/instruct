import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/authSlice';
import { useCustomContext } from '../components/customContexts';

const useLogout = () => {
    const navigation = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { setSnackbarStatus } = useCustomContext(); 
    const dispatch = useDispatch();

    const removeJWT = () => {
        removeCookie('accesstoken', { path: '/'}, {httpOnly: true});
        removeCookie('refreshtoken', { path: '/'}, {httpOnly: true});
        dispatch(logoutSuccess());
        navigation('/');
        console.log('ログアウト');
        setSnackbarStatus({
                open: true,
                severity: "success",
                message: "ログアウトしました。"
        });
    }
    return removeJWT;
}

export default useLogout;