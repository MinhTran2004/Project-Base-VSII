import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from "@mui/material";

// Định nghĩa kiểu props cho CustomTextField
interface CustomTextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  err: string;
  inputRef?: React.RefObject<HTMLInputElement>; // Thêm inputRef vào kiểu props
  icon?: React.ElementType;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type = "text",
  icon: Icon,
  onChange,
  value,
  inputRef,
  err,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      variant="outlined"
      onChange={onChange}
      fullWidth
      inputRef={inputRef} // Truyền inputRef vào TextField
      error={!!err}
      helperText={err}
      required
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ) : null,
      }}
      {...props}
    />
  );
};

export default CustomTextField;
