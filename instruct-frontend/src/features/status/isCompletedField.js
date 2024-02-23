import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const IsCompletedField = ({ isCompleted }) => {
    const fontSize = 45;
    return isCompleted ?
        <CheckIcon color='success' sx={{ fontSize: fontSize }} />
        : 
        <ClearIcon color='error' sx={{ fontSize: fontSize }} />
}

export default IsCompletedField;