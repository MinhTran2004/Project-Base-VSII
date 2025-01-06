import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
// Giả sử bạn có RootState đã được khai báo trong store

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Kiểm tra sessionId và isSessionExpired từ store
  const { sessionId, isSessionExpired } = useSelector(
    (state: RootState) => state.session
  );

  if (isSessionExpired) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
