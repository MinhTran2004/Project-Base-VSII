import { Box } from "@mui/material";
import { Header } from "../containers/layouts/Header";
import { Footer } from "../containers/layouts/Footer";
import background from "../assets/image/loginImage.png";
import Login from "../auth/login";
function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Login />
      <Footer />
    </Box>
  );
}

export default LoginPage;
