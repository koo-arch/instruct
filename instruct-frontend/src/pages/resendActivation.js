import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSnackbar from '../components/customSnackbar';
import axios from '../api/axios';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';
import {
    Button,
    Box,
    Container,
    Typography,
    TextField,
    Avatar,
    Grid,
} from '@mui/material';
import CustomLink from '../components/CustomLink';
import EmailIcon from '@mui/icons-material/Email';


const ResendActivation = () => {
    const navigation = useNavigate();
    const { uid, token } = useParams();
    const { snackbarStatus, setSnackbarStatus } = useCustomContext();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const resendEmail = async () => {
        return await axios.post(urls.ResendActivation)
    }

    const onSubmit = (data) => {
        resendEmail(data)
            .then(res => {
                console.log(res)
                console.log("メール送信完了");
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "メールを送信しました。"
                })
                navigation('/login');
            })
            .catch(err => {
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `アクティブ化可能なアカウントではありません。`
                })
            });

    }
    return (
        <>
            <Container component={"main"} maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EmailIcon />
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        メール再送信
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            送信
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <CustomLink to="/login" variant="body2">
                                    ログイン
                                </CustomLink>
                            </Grid>
                            <Grid item>
                                <CustomLink to="/register" variant="body2">
                                    新規登録
                                </CustomLink>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </>
    )
}

export default ResendActivation;