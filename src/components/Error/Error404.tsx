import { Box, Typography } from "@mui/material";

interface IError {
  status?: string;
}

const Error404 = ({ status }: IError) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <img src="/src/assets/ImageError.webp" style={{ width: "200px", height: "200px" }} alt="Error" />
      <Typography variant="h1">{status}</Typography>
      <Typography variant="h4">Not found</Typography>
    </Box>
  );
};

export default Error404;
