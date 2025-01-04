import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import HTTP_CODE from "../../utils/httpcode";

const ErrorPage = () => {
  const { statuscode } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <img
        src="/src/assets/ImageError.webp"
        style={{ width: "200px", height: "200px" }}
        alt="Error"
      />
      <Typography variant="h1">{statuscode}</Typography>
      <Typography variant="h4">
        {HTTP_CODE[parseInt(statuscode || "") as keyof typeof HTTP_CODE]}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
