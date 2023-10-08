import React, { useRef } from 'react';
import CreateCountUsersRecord from '../features/countUsersRecord/createCountUsersRecord';
import CustomSnackbar from '../components/customSnackbar';
import { Container, useMediaQuery, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCustomContext } from '../components/customContexts';

const Records = () => {
    const { snackbarStatus } = useCustomContext();
    const isMobileSize = useMediaQuery('(max-width: 500px');
    const openRef = useRef();

    const openCreateRecord = () => openRef.current.click();
    return (
        <div>
            <Container>
                <Grid container sx={{ mt: 3, mb: 3 }}>
                    <Grid item xs>
                        <Typography component={"h1"} variant="h3">
                            利用人数記録表
                        </Typography>
                    </Grid>
                    {!isMobileSize &&
                        <Grid>
                            <Fab color='primary' variant='extended' onClick={openCreateRecord}>
                                <AddIcon sx={{ mr: 1 }} />
                                登録
                            </Fab>
                        </Grid>
                    }
                </Grid>
            </Container>
            <CreateCountUsersRecord create={openRef}/>
        </div>
    )
}

export default Records