import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Đường dẫn về trang chủ
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "10rem", fontWeight: "bold", color: "#FFA21A" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </Typography>
      <Button
        variant="contained"
        onClick={handleBackToHome}
        sx={{
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          backgroundColor: "#FFA21A",
        }}
      >
        Back to home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
