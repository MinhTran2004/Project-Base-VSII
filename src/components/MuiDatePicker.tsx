import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, TextFieldProps } from '@mui/material';
import { Dayjs } from 'dayjs';

interface MuiDatePickerProps extends Omit<DatePickerProps<Dayjs>, 'renderInput'> {
    label: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
    fullWidth?: boolean;
    style?: React.CSSProperties;
    sx?: any;
}

const MuiDatePicker: React.FC<MuiDatePickerProps> = ({ label, value, onChange, fullWidth = true, style, sx }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth={fullWidth} style={style} sx={sx} />}
            />
        </LocalizationProvider>
    );
}

export default MuiDatePicker;
