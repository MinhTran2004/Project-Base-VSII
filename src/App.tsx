import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUserList from "./pages/CreateUserList";
import ErrorCode404 from "./components/httpcode/ErrorCode404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUserList />} />
        <Route path="*" element={<ErrorCode404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
