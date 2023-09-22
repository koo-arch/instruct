import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import useRefreshToken from './useRefreshToken';

const authAxios = axios.create();

const useAuthAxios = () => {
    const [cookies, ] = useCookies(["accesstoken", "refreshtoken"]);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = authAxios.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"] && !!cookies.accesstoken) {
                    config.headers["Authorization"] = `JWT ${cookies.accesstoken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );


        const responseIntercept = authAxios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log(error.response)
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (newAccessToken === undefined) {
                        return Promise.reject(error);
                    }
                    console.log(newAccessToken);
                    prevRequest.headers["Authorization"] = `JWT ${newAccessToken}`;
                    return authAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            authAxios.interceptors.request.eject(requestIntercept);
            authAxios.interceptors.response.eject(responseIntercept);
        };
    },[cookies, refresh]);

    return authAxios;
}

export default useAuthAxios;