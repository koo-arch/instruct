import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/useAuthAxios';
import urls from '../../api/urls';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, DialogContentText } from '@mui/material';
import FormDialog from '../../components/formDialog';
import useFetchCountUsersProps from '../../hooks/useFetchCountUsersPrpps';
import { errorMessage } from '../../utils/errorMessage';
import '../../styles/styles.css';


const DeleteCountUsersRecord = (props) => {
    const {
        id,
        iconSize,
        size
    } = props;
    const useFormMethods = useForm();
    const { handleSubmit, reset, setError } = useFormMethods;
    const authAxios = useAuthAxios();
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const fetchCountUsersProps = useFetchCountUsersProps(); // 非同期データの読み込みをトリガー


    const openDialog = async () => {
        await fetchCountUsersProps(); // データの読み込みが完了するまで待つ
        setDialogIsOpen(true); // データが読み込まれたらダイアログを開く
    };
    const closeDialog = () => setDialogIsOpen(false);


    const patchCountUsersRecord = async (data) => {
        return await authAxios.delete(urls.CountUsersRecord + `${id}/`, data)
    }


    const onSubmit = (data) => {
        console.log(data)
        patchCountUsersRecord(data)
            .then(res => {
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "利用人数記録削除が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch(err => {
                const errRes = err.response.data
                const message = "利用人数記録削除に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);
            })
    }
    return (
        <div>
            <IconButton color="error" size={size} onClick={openDialog}>
                <DeleteIcon sx={iconSize} />
            </IconButton>
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="利用人数削除"
                buttonText="削除"
                color="error"
            >
                <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContentText color="error">
                        この項目を削除してよろしいですか？
                    </DialogContentText>
                </form>
            </FormDialog>
        </div>
    )
}

export default DeleteCountUsersRecord;