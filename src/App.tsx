import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CreateUserList from "./pages/home/CreateUserList";
import HttpCodeError from "./components/HttpCodeError";
import Login from "./pages/authencation/login";
import Register from "./pages/authencation/register";

function App() {
  // const storeAccount = localStorage.getItem('account');
  // const account = JSON.parse(storeAccount || '');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<CreateUserList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<HttpCodeError />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
