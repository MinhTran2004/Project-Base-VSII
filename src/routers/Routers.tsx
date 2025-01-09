import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindPetsByStatus from "../pages/FindPetsByStatus";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/findPetsByStatus" element={<FindPetsByStatus />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default Routers;
