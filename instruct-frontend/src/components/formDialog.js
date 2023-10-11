import React from 'react';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, 
    List,
    ListItem,
    ListItemText,
    Button 
} from '@mui/material';

const FormDialog = (props) => {
    const { open, onClose, color, title, children, buttonText } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{ minWidth: '300px' }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText sx={{ minWidth: 400 }}>

                            </ListItemText>
                        </ListItem>
                    </List>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={onClose}>キャンセル</Button>
                    <Button variant='contained' type="submit" form="dialog-form" color={color}>{buttonText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialog;