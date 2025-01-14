import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiUserCreateForm from "./components/MultiUserCreateForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/ErrorPage";
import ErrorPageNotFound from "./components/ErrorPageNotFound";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute ";

const App: React.FC = () => {
      const isAdmin = localStorage.getItem('role') === 'admin';  // Kiểm tra trong localStorage hoặc context

      return (
<Router>
  <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="/*" element={<ErrorPageNotFound />} />
    
    <Route element={<PrivateRoute />}>
      <Route path="/addListUser" element={<MultiUserCreateForm />} />
    </Route>
  </Routes>
</Router>
      );
};

export default App;
