import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Link, Stack } from "@mui/material";

import { useLoginMutation } from "../store/service/api";
import { useNavigate } from "react-router-dom";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";
import { toast } from "react-toastify";
import PageLoading from "../components/PageLoading";
import { useDispatch } from "react-redux";
import { setSession } from "../store/slice/sessionSlice";
import CustomTextField from "../components/CustomTextField";
import CustomTextFieldWithtoggle from "../components/CustomTextFieldWithtoggle";

// Định nghĩa kiểu cho các state
interface LoginFormState {
  username: string;
  password: string;
  showPassword: boolean;
  err: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();
  const [err, setErr] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhoneNumber(username)) {
      setErr("Số điện thoại không hợp lệ!!");
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
      return;
    }
    setErr("");
    try {
      const result = await login({ username, password }).unwrap();

      if (result) {
        toast.success("Đăng nhập thành công!!");
        dispatch(setSession({ sessionId: result.sessionId }));
        navigate("/");
      }
    } catch (e) {
      navigate("/not-found");
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        mx: "auto",
        p: "30px",
        borderRadius: "20px",
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      {isLoading && <PageLoading />}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Đăng nhập
      </Typography>
      <Typography variant="body2" mb={3}>
        Đăng nhập bằng email mà bạn đã đăng ký với chúng tôi.
      </Typography>
      <Stack spacing={3}>
        <CustomTextField
          label="Số điện thoại"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          inputRef={usernameRef}
          err={err}
        />
        <CustomTextFieldWithtoggle
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={password}
          handleShowPassword={handleShowPassword}
          showPassword={showPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Link href="#" variant="body2" underline="hover" align="right">
          Quên mật khẩu?
        </Link>
        <Button
          variant="contained"
          color="warning"
          size="large"
          fullWidth
          sx={{ textTransform: "none", fontSize: 16 }}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </Button>
        {/* {isError && <p>Error: {error}</p>} */}
        <Typography align="center" mt={1}>
          Bạn chưa có tài khoản?
          <Link href="#" underline="hover" fontWeight="bold" mx={1}>
            Đăng ký ngay
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
