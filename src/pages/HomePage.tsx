import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };  
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #1c1c1c, #666)",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          minHeight: "60px",
        }}
      >
        <Typography variant="body1"></Typography>
        {username ? (
          <>
            <Tooltip title={username} placement="left" sx={{ color: "#fff" }}>
              <Avatar
                sx={{ bgcolor: deepOrange[500], m: 2, cursor: "pointer" }}
                onClick={handleClick}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate(`/user/${username}`)}>Profile</MenuItem>
              <MenuItem onClick={() => (localStorage.removeItem("username"))}><a href="/register" style={{textDecoration:"none", color:"#000"}}>Logout</a></MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ color: "white", m: 2, cursor: "pointer" }}>
            <Link
              to={"/register"}
              style={{
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 18,
              }}
            >
              Đăng nhập
            </Link>
          </Box>
        )}
      </div>
    </div>
  );
};

export default HomePage;
