import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LogInForm from "./pages/LogIn";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="*" element={<ErrorPage status={403} />} />
      </Routes>
    </>
  );
}

export default App;
