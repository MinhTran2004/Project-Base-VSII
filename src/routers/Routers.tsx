import React from "react";
import { Route, Routes } from "react-router-dom";
import { Router } from "../constants/Router";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// Kiểu cho SwitchRoutes component
const SwitchRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={Router.login.index} element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default SwitchRoutes;
