import { Box, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";

interface Props {
    title?: string,
    name: string,
    value?: string,
    onChange: (name: string, value: string) => void,
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
        }}>
            <FormLabel sx={{ fontWeight: 600 }}>{props.title}</FormLabel>
            <TextField
                placeholder={props.placeholder}
                fullWidth
                inputRef={props.inputRef}
                value={props.value}
                onChange={(e) => props.onChange(props.name, e.target.value)}
                sx={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                    ...props.styleInput
                }} />
            {props.textError && <Typography sx={{ color: 'red', fontSize: 12 }}>{props.textError}</Typography>}
        </Box>
    )
}

export default InputFieldUser;