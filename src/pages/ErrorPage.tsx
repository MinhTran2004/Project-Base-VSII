import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ErrorPage: React.FC = () => {
  const { status, message } = useSelector((state: RootState) => state.error);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lỗi {status}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
