import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useCurrentTimetable from '../hooks/useCurrentTimetable';
import useLogout from '../hooks/useLogout';

const Top = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const schoolPeriod = useCurrentTimetable();
    const getUserInfo = useGetUserInfo();
    const logout = useLogout();

    useEffect(() => {
        getUserInfo();
    },[])

    return (
        <div>
            {isAuthenticated ? 
                <div>
                    <p>ログイン中: {user.username} {user.email}</p>
                    <button onClick={logout}>ログアウト</button>
                </div>
            :
                <div>
                    <p>未ログイン</p>
                    <Link to={'/login'}>ログイン</Link>
                </div>
            }
            <p>{schoolPeriod}</p>
        </div>
    )
}

export default Top;