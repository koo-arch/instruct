import React from 'react';
import axios from '../api/axios';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';
import CustomSnackbar from '../components/customSnackbar';
import {
    Button,
    Box,
    Container,
    CssBaseline,
    Typography,
    TextField,
    Avatar,
    Grid,
} from "@mui/material";
import CustomLink from '../components/CustomLink';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PasswordField from '../components/passwordField';
import { loginErrorMessage } from '../utils/errorMessage';

const Login = () => {
    const navigation = useNavigate();
    const { snackbarStatus, setSnackbarStatus } = useCustomContext();
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const postLogin =  async(data) => {
        return await axios.post(urls.Login, data);
    }

    const getJwt = (data) => {
        clearErrors();
        postLogin(data)
            .then(res => {
                setCookie('accesstoken', res.data.access, { path: '/' }, { httpOnly: true })
                setCookie('refreshtoken', res.data.refresh, { path: '/' }, { httpOnly: true })
                dispatch(loginSuccess({}))
                navigation('/');
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(err.response.status)
                const defaultMessage = "ログインに失敗しました。"
                loginErrorMessage(errRes, setError, setSnackbarStatus, defaultMessage);
            });
    };
    return (
        <div>
            <Container component={"main"} maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        ログイン
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(getJwt)} sx={{ mt: 1 }}>
                        <TextField
                            required
                            error={!!errors.email}
                            margin='normal'
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            helperText={!!errors.email && errors.email.message}
                            {...register('email', { required: "メールアドレスを入力してください" })}
                        />
                        <PasswordField
                            required
                            error={!!errors.password}
                            margin='normal'
                            fullWidth
                            label="パスワード"
                            helperText={!!errors.password && errors.password.message}
                            {...register('password', { required: "パスワードを入力してください" })} />
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid item xs>
                            <CustomLink to="/password/reset" variant="body2">
                                パスワードを忘れた
                            </CustomLink>
                        </Grid>
                        <Grid item>
                            <CustomLink to="/register" variant="body2">
                                新規登録はこちら
                            </CustomLink>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </div>
    );
};

export default Login;