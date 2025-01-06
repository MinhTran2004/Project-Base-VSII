import React, { ChangeEventHandler } from "react";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Định nghĩa kiểu cho các props
interface CustomTextFieldWithtoggleProps
  extends Omit<TextFieldProps, "ref" | "inputRef"> {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  value: string;
  handleShowPassword: () => void;
  showPassword: boolean;
}

const CustomTextFieldWithtoggle: React.FC<CustomTextFieldWithtoggleProps> = ({
  label,
  onChange,
  type,
  value,
  handleShowPassword,
  showPassword,
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
      required
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleShowPassword} edge="end">
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};

export default CustomTextFieldWithtoggle;
