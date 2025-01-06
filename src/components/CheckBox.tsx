import React from 'react';
import { Checkbox, FormControlLabel } from "@mui/material";

interface MuiCheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MuiCheckbox: React.FC<MuiCheckboxProps> = ({ label, name, checked, onChange }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
            }
            label={label}
        />
    );
}

export default MuiCheckbox;
