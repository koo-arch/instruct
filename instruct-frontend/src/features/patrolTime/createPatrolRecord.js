import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/useAuthAxios';
import urls from '../../api/urls';
import PatrolCreateForm from './patrolCreateForm';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import FormDialog from '../../components/formDialog';
import useFetchPatrolPlaces from '../../hooks/useFetchPatrolPlaces';
import '../../styles/styles.css';


const CreatePatrolRecord = (props) => {
    const { create } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const useFormMethods = useForm();
    const { register, setValue, getValues, handleSubmit, reset, formState: { errors } } = useFormMethods;
    const authAxios = useAuthAxios();
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const fetchPatrolPlaces = useFetchPatrolPlaces(); // 非同期データの読み込みをトリガー


    const openDialog = async () => {
        await fetchPatrolPlaces(); // データの読み込みが完了するまで待つ
        setDialogIsOpen(true); // データが読み込まれたらダイアログを開く
    };
    const closeDialog = () => setDialogIsOpen(false);


    const postNewPatrolRecord = async (data) => {
        return await authAxios.post(urls.PatrolRecord, data)
    }

    const onSubmit = (data) => {
        console.log(data)
        postNewPatrolRecord(data)
            .then(res => {
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "巡回時間記録が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
                reset();
            })
            .catch(err => {
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `巡回時間記録に失敗しました。(code:${err.response.status})`,
                });
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
                title="巡回時間登録"
                buttonText="登録"
            >
                <FormProvider {...useFormMethods}>
                    <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
                        <PatrolCreateForm />
                    </form>
                </FormProvider>
            </FormDialog>
        </div>
    )
}

export default CreatePatrolRecord;