import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSnackbar from '../components/customSnackbar';
import axios from '../api/axios';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';


const Activation = () => {
    const navigation = useNavigate();
    const { uid, token } = useParams();
    const { snackbarStatus, setSnackbarStatus } = useCustomContext();

    const postActivateToken = async () => {
        return await axios.post(urls.Activation, { uid: uid, token: token  });
    }

    useEffect(() => {
        postActivateToken()
            .then(res => {
                console.log(res)
                console.log("アカウント本登録完了");
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "アカウント本登録が完了しました。"
                })
                navigation('/login');
            })
            .catch(err => {
                const errRes = err.response.data
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `アカウント本登録に失敗しました。再度やり直してください。`
                })
                navigation('/activation/resend')
            });
    },[])

    return (
        <>
            <CustomSnackbar {...snackbarStatus} />
        </>
    )
}

export default Activation;