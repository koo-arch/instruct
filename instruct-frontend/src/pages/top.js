import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PatrolStatus from '../features/patrolStatus';
import CountUsersStatus from '../features/countUsersRecord/countUsersStatus';
import useFetchUserInfo from '../hooks/useFetchUserInfo';
import useLogout from '../hooks/useLogout';

const Top = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const logout = useLogout();

    useFetchUserInfo();

    return (
        <div>
            <PatrolStatus/>
            <CountUsersStatus/>
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
        </div>
    )
}

export default Top;