import React from 'react';
import { FormControl, MenuItem, TextField } from '@mui/material';

const DropdownSelect = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth>
            <TextField
                select
                required
                label={label}
                value={value}
                onChange={onChange}
                margin='normal'
            >
                <MenuItem value="">選択してください</MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
}

export default DropdownSelect;
