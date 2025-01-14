import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { HeaderStyled } from "./styled";
import Logo from "../../assets/Logo.png";
import Logo2 from "../../assets/Logo2.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <HeaderStyled>
      <img className="header-logo" src={isMobile ? Logo2 : Logo} />
      {!isMobile && (
        <Box className="header-menu">
          <Typography variant="h6">Cho thuê</Typography>
          <Typography variant="h6">Bán </Typography>
          <Typography variant="h6">Danh mục</Typography>
          <Typography variant="h6">Blogs</Typography>
          <Typography variant="h6">FAQ</Typography>
          <Typography variant="h6">Về chúng tôi</Typography>
        </Box>
      )}
      <Button variant="contained" onClick={handleLogout}>
        <Typography>Đăng xuất</Typography>
      </Button>
    </HeaderStyled>
  );
};

export default HeaderComponent;
