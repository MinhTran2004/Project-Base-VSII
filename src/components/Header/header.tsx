import { Box, Typography, useMediaQuery } from "@mui/material";
import { HeaderStyled } from "./styled";
import Logo from "../../assets/Logo.png";
import Logo2 from "../../assets/Logo2.png";
const HeaderComponent = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
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
    </HeaderStyled>
  );
};

export default HeaderComponent;
