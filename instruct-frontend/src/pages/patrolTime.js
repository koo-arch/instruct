import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../components/customSnackbar';
import { Container, useMediaQuery, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCustomContext } from '../components/customContexts';
import AccordionMenu from '../components/accordionManu';
import useWsCurrentTimetable from '../hooks/useWsCurrentTimetable';
import PatrolStatus from '../features/status/patrolStatus';
import CreatePatrolRecord from '../features/patrolTime/createPatrolRecord';
import FetchPatrolRecords from '../features/patrolTime/fetchPatrolRecords';


const PatrolTime = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const { snackbarStatus } = useCustomContext();
    const isMobileSize = useMediaQuery('(max-width: 500px');
    const openRef = useRef();

    useWsCurrentTimetable();

    const openCreateRecord = () => openRef.current.click();
    return (
        <div>
            <Container>
                <Grid container sx={{ mt: 3, mb: 3 }}>
                    <Grid item xs>
                        <Typography component={"h1"} variant="h3">
                            巡回時間記録
                        </Typography>
                    </Grid>
                    {isAuthenticated && !isMobileSize &&
                        <Grid>
                            <Fab color='primary' variant='extended' onClick={openCreateRecord}>
                                <AddIcon sx={{ mr: 1 }} />
                                登録
                            </Fab>
                        </Grid>
                    }
                </Grid>
                {
                    isMobileSize ?
                        <PatrolStatus title="巡回状況"/>
                    :
                    <AccordionMenu section="巡回状況">
                        <PatrolStatus />
                    </AccordionMenu>
                }
            </Container>
            <FetchPatrolRecords />
            <CreatePatrolRecord create={openRef} />
            <CustomSnackbar {...snackbarStatus} />
        </div>
    )
}

export default PatrolTime;