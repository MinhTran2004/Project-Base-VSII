import { Typography } from "@mui/material";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Typography
      component={"div"}
      py={2}
      textAlign={"center"}
      sx={{ backgroundColor: "#fff" }}
    >
      © 2025 comacPro. Ltd. All Rights Reserved
    </Typography>
  );
};
