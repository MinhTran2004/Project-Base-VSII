import { Button, SxProps, Theme } from "@mui/material";

export enum TypeButton {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

interface IButton {
  name: any;
  type?: TypeButton;
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const CustomButton = ({
  name,
  type,
  startIcon,
  sx,
  onClick,
  disabled,
}: IButton) => {
  return (
    <Button
      variant="contained"
      type={type}
      startIcon={startIcon}
      disabled={disabled}
      sx={{
        minWidth: "100px",
        borderRadius: "10px",
        bgcolor: "#FF0000",
        color: "#FFFFFF",
        textTransform: "capitalize",
        transition: "opacity 0.5s ease",
        "&:hover": {
          opacity: 0.6,
        },
        "&.Mui-disabled": {
          bgcolor: "#FF0000",
          cursor: "no-drop",
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
