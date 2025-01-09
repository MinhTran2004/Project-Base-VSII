import React from "react";
import Button from "@mui/material/Button";

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: "#b3723d",
        color: "white",
        borderRadius: "8px",
        padding: {
          xs: "8px 16px",
          sm: "10px 20px",
        },
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
          md: "1rem",
          lg: "1.125rem",
        },
        "&:hover": {
          backgroundColor: "#e1c253",
        },
        boxShadow: "none",
        transition: "background-color 0.3s, transform 0.2s",
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      {text}
    </Button>
  );
};
