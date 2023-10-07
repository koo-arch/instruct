import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const NumberInput = (props) => {
    const { value, onChange, name, label, max } = props;

    const handleIncrement = () => {
        if (value < max || max === undefined) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    // 文字列の構成が0~9のみかつ、maxより小さい場合に入力を受け付ける
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
            if ((numericValue >= 0) && (numericValue <= max || max === undefined)) {
                onChange(numericValue);
            }
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton
                color="primary"
                onClick={handleDecrement}
            >
                <RemoveIcon />
            </IconButton>
            <TextField
                label={label}
                name={name}
                margin='normal'
                variant="outlined"
                value={value === '' ? '' : value}
                inputProps={{
                    style: { textAlign: 'center' },
                }}
                onChange={handleInputChange}
                style={{ flex: 1 }}
            />
            <IconButton
                color="primary"
                onClick={handleIncrement}
            >
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default NumberInput;
