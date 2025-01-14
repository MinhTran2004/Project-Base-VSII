import { Typography } from "@mui/material";
import { ErrorCheckProps } from "../../types/errorType";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ErrorPage = ({ status }: ErrorCheckProps) => {
  const navigate = useNavigate();

  const errorMessages: Record<number, string> = {
    400: "400 Bad Request: Yêu cầu không hợp lệ.",
    404: "404 Not Found: Không tìm thấy tài nguyên.", //*
    403: "403 Not Found: Không được phép truy cập.", //*
  };
  const message =
    errorMessages[status] || `Lỗi không xác định (HTTP ${status})`;

  useEffect(() => {
    if (status === 400) {
      alert("400 Bad Request: Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.");
    }
    if (status === 403) {
      navigate("/error");
    }
  }, [status]);

  return (
    <>
      <Typography color="warning" variant="h3" fontWeight="bold">
        Fetching Error
      </Typography>
      <Typography variant="h6">{message}</Typography>
    </>
  );
};

export default ErrorPage;
