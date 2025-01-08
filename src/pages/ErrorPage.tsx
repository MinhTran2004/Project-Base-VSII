import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "An unexpected error occurred.";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" mb={3}>
        {message}
      </Typography>
      <Button
        sx={{ backgroundColor: "#b3723d" }}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Return to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
