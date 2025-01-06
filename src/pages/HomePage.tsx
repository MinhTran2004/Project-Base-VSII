import { Box, Container, Typography } from "@mui/material";
import { Header } from "../containers/layouts/Header";
import { Footer } from "../containers/layouts/Footer";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Box flexGrow={1}>
        <Container maxWidth="xl">
          <Typography>Welcome to Petstore</Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
