import React from 'react';
import { TextField, MenuItem } from "@mui/material";
import { Status } from '../../types/types';

interface MuiTextFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    select?: boolean;
    options?: Status[];
    fullWidth?: boolean; // Add the fullWidth prop here
}

const MuiTextField: React.FC<MuiTextFieldProps> = ({ label, name, value, onChange, select = false, options, fullWidth }) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            select={select}
        >
            {select && options && options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default MuiTextField;
