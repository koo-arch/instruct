import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import useAuthAxios from '../hooks/useAuthAxios';
import urls from '../api/urls';
import { useCustomContext } from '../components/customContexts';
import PasswordField from '../components/passwordField';
import { Container, Button, Divider, Typography } from '@mui/material';
import { errorMessage } from '../utils/errorMessage'

const ChangePassword = () => {
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { setSnackbarStatus } = useCustomContext();
    const { register, handleSubmit, getValues, clearErrors, setError, formState: { errors } } = useForm();
    const authAxios = useAuthAxios();

    const postPasswords = async (data) => {
        return await authAxios.post(urls.ChangePassword, data)
    }

    const onSubmit = (data) => {
        clearErrors();
        postPasswords(data)
            .then(res => {
                console.log(res.data)
                console.log("パスワード変更完了");
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "パスワード変更が完了しました。"
                })
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(errRes);
                const message = "パスワード変更に失敗しました。再度入力してください。"
                errorMessage(errRes, setError, setSnackbarStatus, message)
            })
    }
    return (
        <div>
            <Typography variant='body1'>
                現在のパスワード、新しいパスワードを入力してください。
            </Typography>
            <Container maxWidth="xs">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PasswordField
                        required
                        error={!!errors.current_password}
                        margin="normal"
                        fullWidth
                        label="現在のパスワード"
                        helperText={!!errors.current_password && errors.current_password.message}
                        {...register('current_password', {
                            required: "パスワードを入力してください",
                            minLength: { value: 8, message: `8文字以上で入力してください。` },
                        })
                        }
                    />
                    <Divider />
                    <PasswordField
                        required
                        error={!!errors.new_password}
                        margin="normal"
                        fullWidth
                        label="新しいパスワード"
                        helperText={!!errors.new_password && errors.new_password.message}
                        {...register('new_password', {
                            required: "パスワードを入力してください",
                            minLength: { value: 8, message: `8文字以上で入力してください。` },
                        })
                        }
                    />
                    <PasswordField
                        required
                        error={!!errors.re_new_password}
                        margin="normal"
                        fullWidth
                        label="新しいパスワード(確認)"
                        helperText={!!errors.re_new_password && errors.re_new_password.message}
                        {...register('re_new_password', {
                            required: "パスワードを再入力してください",
                            validate: (value) => {
                                return (
                                    value === getValues('new_password') || "パスワードが一致しません"
                                )
                            }
                        })
                        }
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        変更
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default ChangePassword;