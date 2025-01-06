import React from "react";
import { Container } from "@mui/material";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default Login;
