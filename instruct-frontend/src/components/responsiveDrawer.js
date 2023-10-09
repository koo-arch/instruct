import React, { useState } from 'react';
import useFetchUserInfo from '../hooks/useFetchUserInfo';
import AccountButton from './accountButton';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import {
    CssBaseline,
    AppBar,
    IconButton,
    Box,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 350;

const ResponsiveDrawer = ({ children }) => {
    // Reduxから認証情報を取得
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    // ドロワー（サイドメニュー）の状態を管理
    const [open, setOpen] = useState(false);

    // ドロワーの開閉を制御する関数
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    // ドロワー内のリストアイテムの内容を設定
    const drawer = (
        <div>
            <List>
                {isAuthenticated ?
                    // ログインしている場合はユーザー名を表示するリストアイテム
                    <div>
                        <ListItemButton component={Link} to="/account" onClick={handleDrawerToggle}>
                            <ListItemText primary={user.username} />
                        </ListItemButton>
                    </div>
                    :
                    // ログインしていない場合は空のToolbarを表示
                    <Toolbar />
                }
                <Divider />
                {/* 利用人数記録へのリンクを表示するリストアイテム */}
                <ListItemButton component={Link} to="/records" onClick={handleDrawerToggle}>
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="利用人数記録" />
                </ListItemButton>
                {/* 完了したタスクへのリンクを表示するリストアイテム */}
                <ListItemButton component={Link} to="/finished" onClick={handleDrawerToggle}>
                    <ListItemIcon>
                        <DoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="完了したタスク" />
                </ListItemButton>
            </List>
        </div>
    );

    // ユーザー情報をフェッチするカスタムフックを使用
    useFetchUserInfo();

    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
        }}>
            {/* ヘッダーコンポーネント */}
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    {/* メニューアイコン：モバイルデバイスでドロワーを開閉 */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* ページタイトル */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        巡回記録
                    </Typography>
                    {/* アカウント関連のボタン */}
                    <AccountButton />
                </Toolbar>
            </AppBar>
            {/* メインコンテンツ */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* レスポンシブなドロワー（サイドメニュー） */}
                <Drawer
                    open={open}
                    onClose={handleDrawerToggle}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true, // モバイルデバイスでのパフォーマンス向上のため
                    }}
                    sx={{
                        display: { sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* デスクトップバージョンのドロワー */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { sm: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
                </Box>
                {/* メインコンテンツ */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    {children}
                </Box>
            {/* フッター */}
            <Toolbar />
        </Box>
    );
};

export default ResponsiveDrawer;
