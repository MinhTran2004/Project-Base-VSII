import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { memo, useState } from "react";
import Cookies from "js-cookie";
import sign from "jwt-encode";
import { LoginStyled } from "./styled";
import { UserLogin } from "../../constants/enum";
import { useLoginUserMutation } from "../../store/api/apiCaller";

import { expirationTimeAccessToken } from "./config";

interface Initial {
  username: string;
  password: string;
}

const LogInForm = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [errMessage, setErrMessage] = useState<Initial>({
    username: "",
    password: "",
  });
  const newValid = { ...errMessage };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    properties: string
  ) => {
    if (properties === UserLogin.USERNAME) {
      setInputValue({ ...inputValue, username: e.target.value });
    }
    if (properties === UserLogin.PASSWORD) {
      setInputValue({ ...inputValue, password: e.target.value });

      if (e.target.value) {
        setErrMessage({ ...errMessage, password: "" });
        return false;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.username.trim()) {
      newValid.username = "username is require* ";
    }
    if (!inputValue.password.trim()) {
      newValid.password = "Password is require*";
    } else {
      newValid.password = "";
    }
    if (inputValue.username.trim() && inputValue.password.trim()) {
      try {
        const result = await loginUser({
          username: inputValue.username,
          password: inputValue.password,
        }).unwrap();
        // Cookies.set("token", result.token); // Lưu token vào cookies
        // window.location.reload(); // Reload để cập nhật trạng thái

        const secret = "userLogin";

        const accessToken = sign(result, secret);
        await Cookies.set("token", accessToken, {
          expires: expirationTimeAccessToken(),
          secure: true,
          sameSite: "Lax",
        });

        Cookies.get("token") ? navigate("/") : navigate("/login");
        return true;
      } catch (err) {
        console.error("Đăng nhập thất bại:", err);
      }
    }
    setErrMessage(newValid);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <LoginStyled>
        <Box
          sx={{
            px: { xs: 0, xl: 46 },
            width: "100%",
          }}
        >
          <Grid
            container
            component="main"
            sx={{ width: { xs: "100%", xl: "61vw" }, height: "100vh", mb: 0.5 }}
          >
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://picsum.photos/900/1000?random=1)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Đăng nhập
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => handleInput(e, UserLogin.USERNAME)}
                    error={errMessage.username.length ? true : false}
                    helperText={errMessage.username}
                  >
                    {inputValue.username}
                  </TextField>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => handleInput(e, UserLogin.PASSWORD)}
                    error={errMessage.password.length ? true : false}
                    helperText={errMessage.password}
                  >
                    {inputValue.password}
                  </TextField>

                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lưu tài khoản"
                      />
                    </Grid>
                    <Grid item>
                      <NavLink
                        style={{ color: "#009688" }}
                        to="/forgot-password"
                      >
                        <Typography sx={{ paddingTop: "1px", color: "#000" }}>
                          Quên mật khẩu
                        </Typography>
                      </NavLink>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant="contained"
                      sx={{
                        width: { xs: "90%", xl: "65%" },
                        mt: 3,
                        mb: 2,
                        borderRadius: "25px",
                        height: { xs: "50px" },
                        bgcolor: "#28A745",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </Box>
                  {error && <p>Lỗi: Đăng nhập thất bại</p>}

                  <Box
                    sx={{
                      mt: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <NavLink
                      style={{ color: "#009688", textDecoration: "none" }}
                      to="/register"
                    >
                      <Box
                        sx={{
                          display: " flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ color: "#000" }}>
                          Chưa có tài khoản?
                        </Typography>
                        <Typography
                          sx={{
                            color: "#067ACC",
                            // color: "#000",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          &nbsp;Đăng ký ngay
                        </Typography>
                      </Box>
                    </NavLink>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </LoginStyled>
    </ThemeProvider>
  );
};

export default memo(LogInForm);
