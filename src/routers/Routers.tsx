import { Route, Routes } from "react-router-dom";
import CreateUser from "../pages/User/CreateUser";
import Error404 from "../components/Error/Error404";
import ErrorPage from "../components/Error/ErrorPage";
import HomePage from "../pages/HomePage";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<CreateUser />}></Route>
        <Route path="/user/:username" element={<CreateUser />}></Route>
        <Route path="/error/:statuscode" element={<ErrorPage />}></Route>
        <Route path="/*" element={<Error404 status="404" />}></Route>
      </Routes>
    </div>
  );
};

export default Routers;
