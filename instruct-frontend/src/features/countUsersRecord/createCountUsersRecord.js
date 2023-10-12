import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/useAuthAxios';
import urls from '../../api/urls';
import CountUsersCreateForm from './countUsersCreateForm';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import FormDialog from '../../components/formDialog';
import useFetchCountUsersProps from '../../hooks/useFetchCountUsersPrpps';
import { errorMessage } from '../../utils/errorMessage';
import '../../styles/styles.css';


const CreateCountUsersRecord = (props) => {
    const { create } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const useFormMethods = useForm();
    const { setError, handleSubmit, reset } = useFormMethods;
    const authAxios = useAuthAxios();
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const fetchCountUsersProps = useFetchCountUsersProps(); // 非同期データの読み込みをトリガー


    const openDialog = async () => {
        await fetchCountUsersProps(); // データの読み込みが完了するまで待つ
        setDialogIsOpen(true); // データが読み込まれたらダイアログを開く
    };
    const closeDialog = () => setDialogIsOpen(false);


    const postNewCountUsersRecord = async (data) => {
        return await authAxios.post(urls.CountUsersRecord, data)
    }

    const onSubmit = (data) => {
        console.log(data)
        postNewCountUsersRecord(data)
            .then(res => {
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "利用人数記録が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch(err => {
                const errRes = err.response.data
                const message = "利用人数記録に失敗しました。"
                errorMessage(errRes, setError, setSnackbarStatus, message);
            })
    }
    return (
        <div>
            {isAuthenticated && 
            <div className='fab-container'>
                <Fab color="primary" onClick={openDialog} ref={create}>
                    <AddIcon fontSize='large' />
                </Fab>
            </div>
            }
            <FormDialog
                open={dialogIsOpen}
                onClose={closeDialog}
                title="利用人数登録"
                buttonText="登録"
            >
                <FormProvider {...useFormMethods}>
                    <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                        <CountUsersCreateForm />
                    </form>
                </FormProvider>
            </FormDialog>
        </div>
    )
}

export default CreateCountUsersRecord;