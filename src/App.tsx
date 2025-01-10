import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiUserCreateForm from "./components/MultiUserCreateForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/ErrorPage";
import ErrorPageNotFound from "./components/ErrorPageNotFound";



const App: React.FC = () => {
    return (
        <Router>  {/* Bọc toàn bộ ứng dụng trong Router */}
        <Routes>
          {/* Định nghĩa các routes */}
          <Route path="/" element={<MultiUserCreateForm />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPageNotFound />} />
        </Routes>
      </Router>
    );
};

export default App;
