import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthAxios from '../hooks/useAuthAxios';
import FormDialog from '../components/formDialog';
import { useCustomContext } from '../components/customContexts';
import PasswordField from '../components/passwordField';
import useLogout from '../hooks/useLogout';
import urls from '../api/urls';
import { Button, Container, DialogContentText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorMessage } from '../utils/errorMessage';

const DeleteAccount = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm();
    const { setSnackbarStatus } = useCustomContext();
    const authAxios = useAuthAxios();
    const logout = useLogout();

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const deleteAccount = async (data) => {
        return await authAxios.delete(urls.UserInfo, { data: data })
    }

    const onSubmit = (data) => {
        clearErrors();
        deleteAccount(data)
            .then(res => {
                console.log(res)
                console.log('削除完了')
                closeDialog();
                logout();
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "アカウント削除が完了しました。"
                });
            })
            .catch(err => {
                console.log(err.response)
                const errRes = err.response.data
                const message = "アカウント削除に失敗しました。再度入力してください。"
                errorMessage(errRes, setError, setSnackbarStatus, message)
            })
    }
    return (
        <div>
            <Typography variant='body1'>
                アカウントとデータをすべて削除します。
            </Typography>
            <Container maxWidth="xs">
                <Button
                    startIcon={<DeleteIcon />}
                    variant='contained'
                    color="error"
                    size="large"
                    fullWidth
                    onClick={openDialog}
                    sx={{ mt: 3, mb: 2 }}
                >
                    アカウント削除
                </Button>
            </Container>
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="アカウント削除"
                buttonText="削除"
                color="error"
            >
                <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContentText color="error">
                        アカウントとデータを全て削除します。
                        よろしいですか？
                    </DialogContentText>
                    <PasswordField
                        required
                        error={!!errors.current_password}
                        margin='normal'
                        fullWidth
                        label="パスワード"
                        helperText={!!errors.current_password && errors.current_password.message}
                        {...register('current_password', { required: "パスワードを入力してください" })}
                    />
                </form>
            </FormDialog>
        </div>
    )
}

export default DeleteAccount;