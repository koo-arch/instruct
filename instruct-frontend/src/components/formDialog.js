import React from 'react';
import { 
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, 
    Button,
    Box 
} from '@mui/material';

const FormDialog = (props) => {
    const { open, onClose, color, title, children, buttonText } = props;
    const theme = useTheme();
    const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{ minWidth: '300px' }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Box sx={{ ...(isMobileSize ? { minWidth: 250 } : { minWidth: 400 }), }}>
                    </Box>
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