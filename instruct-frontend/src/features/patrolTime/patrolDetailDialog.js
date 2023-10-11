import React, { useContext, useEffect } from 'react';
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
} from '@mui/material';

const PatrolDetailDialog = (props) => {
    const { url, open, onClose, rowData } = props;
    const { postFlag } = useCustomContext();
    const iconSize = {
        width: 30,
        height: 30,
    }

    useEffect(() => {
        onClose();
    }, [postFlag])

    return (
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
                                secondary={rowData.school_period} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="時刻"
                                secondary={rowData.published_time} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="時間帯"
                                secondary={rowData.AM_or_PM} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="場所"
                                secondary={rowData.name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                sx={{ minWidth: 400 }}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PatrolDetailDialog;