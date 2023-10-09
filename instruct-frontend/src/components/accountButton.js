import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AccountButton = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const logout = useLogout();

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sginButton = (
        location.pathname === "/login" ?
            <Button
                color='inherit'
                variant="outlined"
                component={Link}
                to={"/register"}
            >
                新規登録
            </Button>
            :
            <Button
                variant="contained"
                sx={{
                    background: "#ffffff",
                    color: '#3f50b5',
                    ":hover": { background: "#ffffff" },
                }}
                component={Link}
                to={"/login"}
            >
                ログイン
            </Button>
    )
    return (
        <div>
            {isAuthenticated ?
            <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to={"/account"} onClick={handleClose}>
                        アカウント設定
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            logout();
                        }}
                    >
                        ログアウト
                    </MenuItem>
                </Menu>
            </div> 
            :
            sginButton
            }
        </div>
    )
}

export default AccountButton;