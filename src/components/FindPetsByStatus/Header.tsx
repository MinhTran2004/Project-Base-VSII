import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handlePetsClick = () => {
    navigate("/findpetsbystatus");
  };

  const handleLogoutClick = () => {
    Cookies.remove("sessionId");
    navigate("/login");
  };

  const sessionId = Cookies.get("sessionId");

  const buttons = [
    { label: "Home", onClick: handleHomeClick },
    { label: "Find Pets By Status", onClick: handlePetsClick },
    sessionId
      ? { label: "Logout", onClick: handleLogoutClick }
      : { label: "Login", onClick: handleLoginClick },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", color: "#8f582c" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          PetStore
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={button.onClick}
              sx={{ fontWeight: "bold" }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
