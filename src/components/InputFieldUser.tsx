import { Box, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";

interface Props {
    title?: string,
    name: string,
    disabled?: boolean,
    index?: number,
    value?: string,
    onChange: ( name: string, value: string, index: number) => void,
    placeholder?: string,
    inputRef?: React.RefObject<HTMLInputElement>,
    textError?: string,
    styleInput?: React.CSSProperties,
}

const InputFieldUser = (props: Props) => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            '@media (max-width:440px)': {
                gap: 0,
            },
        }}>
            <FormLabel sx={{ fontWeight: 600,  letterSpacing: 0.5 }}>{props.title}</FormLabel>
            <TextField
                disabled={props.disabled}
                placeholder={props.placeholder}
                fullWidth
                inputRef={props.inputRef}
                value={props.value}
                onChange={(e) => props.onChange( props.name, e.target.value, props.index ? props.index : 0)}
                sx={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiInputBase-input': {
                        '@media (max-width:440px)': {
                            padding: '10px'
                        },
                    },
                    ...props.styleInput
                }} />
            {props.textError && <Typography sx={{ color: 'red', fontSize: 12 }}>{props.textError}</Typography>}
        </Box>
    )
}

export default InputFieldUser;