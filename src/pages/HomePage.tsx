import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
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
          <Tooltip title={username} placement="left" sx={{color:"#fff"}}>
            <Avatar
              sx={{ bgcolor: deepOrange[500], m: 2, cursor: "pointer" }}
              onClick={() => navigate(`/user/${username}`)}
            >
              N
            </Avatar>
          </Tooltip>
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
