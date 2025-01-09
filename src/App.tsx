import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiUserCreateForm from "./components/MultiUserCreateForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";



const App: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<MultiUserCreateForm />} />
                </Routes>
        </Router>
    );
};

export default App;
