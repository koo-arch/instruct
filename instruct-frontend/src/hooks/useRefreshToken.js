import { useCookies } from 'react-cookie';
import axios from '../api/axios';
import urls from '../api/urls';
import useLogout from './useLogout';
import { useCustomContext } from '../components/customContexts';


const useRefreshToken = () => {
  const [cookies, setCookie] = useCookies();
  const logout = useLogout();
  const { setSnackbarStatus } = useCustomContext();

  const refresh = async () => {
    // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
    try {
      const response = await axios.post(urls.Refresh, {
        refresh: cookies.refreshtoken,
      });
      setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
      setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
      console.log(response)
      return response.data.access;
    } catch (err) {
      logout();
      setSnackbarStatus({
        open: true,
        severity: "error",
        message: `エラーが発生しました。再度ログインしてください。(code:${err.response.status})`,
      });
    }
  };

  return refresh;
};

export default useRefreshToken;
