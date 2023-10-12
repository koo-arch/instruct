import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/useAuthAxios';
import urls from '../../api/urls';
import CountUsersUpdateForm from './countUsersUpdateForm';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import FormDialog from '../../components/formDialog';
import useFetchCountUsersProps from '../../hooks/useFetchCountUsersPrpps';
import { errorMessage } from '../../utils/errorMessage';
import '../../styles/styles.css';


const UpdateCountUsersRecord = (props) => {
    const { 
        id,
        place,
        room_type,
        univ_users_num,
        own_users_num,
        iconSize,
        size 
    } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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
        return await authAxios.patch(urls.CountUsersRecord + `${id}/`, data)
    }
    

    const onSubmit = (data) => {
        console.log(data)
        patchCountUsersRecord(data)
            .then(res => {
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "利用人数記録変更が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch(err => {
                const errRes = err.response.data
                const message = "利用人数変更に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);
            })
    }
    return (
        <div>
            <IconButton color='primary' size={size} onClick={openDialog}>
                <EditIcon sx={iconSize} />
            </IconButton>
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="利用人数変更"
                buttonText="更新"
            >
                <FormProvider {...useFormMethods}>
                    <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                        <CountUsersUpdateForm
                            place={place}
                            room_type={room_type}
                            univ_users_num={univ_users_num}
                            own_users_num={own_users_num}
                        />
                    </form>
                </FormProvider>
            </FormDialog>
        </div>
    )
}

export default UpdateCountUsersRecord;