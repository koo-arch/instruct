import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/authSlice';
import { useCustomContext } from '../components/customContexts';

const useLogout = () => {
    const navigation = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { setSnackbarStatus } = useCustomContext();
    const dispatch = useDispatch();

    const removeJWT = () => {
        try {
            // Cookieの削除
            removeCookie('accesstoken', { path: '/' });
            removeCookie('refreshtoken', { path: '/' });

            // ログアウト成功のアクションをディスパッチ
            dispatch(logoutSuccess());

            // リダイレクトと成功メッセージ
            navigation('/');
            setSnackbarStatus({
                open: true,
                severity: "success",
                message: "ログアウトしました。"
            });
        } catch (error) {
            console.error("Cookieの削除エラー:", error);

            // エラーメッセージ
            setSnackbarStatus({
                open: true,
                severity: "error",
                message: "ログアウトに失敗しました。もう一度お試しください。"
            });
        }
    };

    return removeJWT;
}

export default useLogout;