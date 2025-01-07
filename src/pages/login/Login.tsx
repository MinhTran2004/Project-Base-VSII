import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, TextField, Container, Box, Typography, Alert } from "@mui/material";
import { AppDispatch, RootState } from "../../store/store";
import { loginThunk } from "../../store/services/auth.service";
import useResize from "../../hooks/useResize";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const size = useResize();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, token } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={2} boxShadow={3}>
        {size.width > 768 && (
          <Box mb={2}>
            <img src="assets/img/1.jpg" alt="Login" style={{ width: '100%' }} />
          </Box>
        )}
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <Box mt={2} textAlign="center">
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          {token && (
            <Box mt={2}>
              <Alert severity="success">Login successful!</Alert>
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
