import Header from "../components/FindPetsByStatus/Header";
import backgroundImg from "../assets/3.jpg";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(236, 231, 231, 0.5)",
            zIndex: 0,
          }}
        />
        <Box sx={{ p: 4, zIndex: 1 }}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
              },
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#332113",
              mt: 4,
            }}
          >
            HomePage
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
