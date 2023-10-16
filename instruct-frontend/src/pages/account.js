import React from 'react';
import ChangePassword from '../features/changePassword';
import DeleteAccount from '../features/deleteAccount';
import { useCustomContext } from '../components/customContexts';
import CustomSnackbar from '../components/customSnackbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

const Account = () => {
    const { snackbarStatus } = useCustomContext();
    return (
        <div>
            <Container sx={{ mt: 3, mb: 3 }}>
                <Typography component={"h1"} variant="h3">
                    アカウント設定
                </Typography>
            </Container>
            <Container maxWidth="md">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>パスワード変更</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChangePassword />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>アカウント削除</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DeleteAccount />
                    </AccordionDetails>
                </Accordion>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </div>
    )
}

export default Account;