import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUserList from "./pages/home/CreateUserList";
import HttpCodeError from "./components/HttpCodeError";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUserList />} />
        <Route path="/*" element={<HttpCodeError />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
