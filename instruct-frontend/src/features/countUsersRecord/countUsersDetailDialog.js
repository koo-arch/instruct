import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomContext } from '../../components/customContexts';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    List, 
    ListItem, 
    ListItemText,
    Button,
    Grid,
 } from '@mui/material';
import UpdateCountUsersRecord from './updateCountUsersReocrd';
import DeleteCountUsersRecord from './deleteCountUsersRecord';


const CountUsersDetailDialog = (props) => {
    const { url, open, onClose, rowData } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { postFlag } = useCustomContext();
    const iconSize = {
        width: 30,
        height: 30,
    }
    
    useEffect(() => {
        onClose();
    },[postFlag])

    return(
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>詳細データ</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="日付"
                                secondary={rowData.published_date}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="時限"
                                secondary={rowData.school_period}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="場所"
                                secondary={rowData.location}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="大学PC数"
                                secondary={rowData.univ_users_num}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="個人PC数"
                                secondary={rowData.own_users_num}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                sx={{ minWidth: 400 }}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <Grid container justifyContent='space-evenly'>
                    { isAuthenticated &&
                        <>
                            <Grid item>
                                <UpdateCountUsersRecord
                                    iconSize={iconSize}
                                    size="large"
                                    {...rowData}
                                />
                            </Grid>
                            <Grid item>
                                <DeleteCountUsersRecord 
                                    iconSize={iconSize}
                                    size="large"
                                    {...rowData}
                                />
                            </Grid>
                        </>
                    }
                </Grid>
                <DialogActions>
                    <Button variant="contained" onClick={onClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CountUsersDetailDialog;