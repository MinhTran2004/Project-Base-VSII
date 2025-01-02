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
    <Button onClick={onClick} variant="contained">
      {text}
    </Button>
  );
};
