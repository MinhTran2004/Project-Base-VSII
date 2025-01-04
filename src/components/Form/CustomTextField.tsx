import { Box, InputAdornment, SxProps, TextField, Theme, Typography } from "@mui/material";
import React from "react";

interface ITextField {
  title: string;
  name: string;
  value?: string | number;
  required?: boolean;
  inputRef?: React.Ref<any>;
  type?: React.HTMLInputTypeAttribute,
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  errorMessage?: string;
  sx?: SxProps<Theme>
}

const CustomTextField = ({
  title,
  name,
  value,
  required,
  icon,
  type,
  onChange,
  inputRef,
  errorMessage,
  sx
}: ITextField) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "100px",
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        {title}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name={name}
        value={value}
        required={required}
        type={type}
        onChange={onChange}
        inputRef={inputRef}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  fontSize: 30,
                  ".Mui-focused &": {
                    color: "#000",
                  },
                }}
              >
                {icon}
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#000",
            },
          },
          ...sx
        }}
        size={"small"}
      />

      <Typography variant="body2" fontWeight={500} color="red">
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default CustomTextField;
