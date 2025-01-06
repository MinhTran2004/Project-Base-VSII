import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const PageLoading: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed", // Đảm bảo loading page phủ toàn màn hình
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Nền trắng mờ (thay đổi tùy ý)
        zIndex: 1300, // Đảm bảo nằm trên các thành phần khác
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} sx={{ mb: 2, color: "#3f51b5" }} />

      <Typography variant="h6" color="textSecondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default PageLoading;
