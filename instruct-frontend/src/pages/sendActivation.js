import React from 'react';
import CustomLink from '../components/CustomLink';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import { Typography } from '@mui/material';


const SendActivation = () => {
  const { snackbarStatus } = useCustomContext();
  return (
    <div>
        <Typography component={"h1"} variant="h3" sx={{ mt: 3 }}>
            仮登録完了
        </Typography>
        <Typography variant='body' sx={{ mt: 3 }}>
            メールを送信しました。メールに記載されているURLからアクティベーションを完了してください。<br/>
            メールが届かない場合は、<CustomLink to="/activate/resend">こちら</CustomLink>から再送信してください。
        </Typography>
        <CustomSnackbar {...snackbarStatus} />
    </div>
  )
}

export default SendActivation;