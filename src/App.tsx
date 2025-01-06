import { useDispatch } from "react-redux";
import Routes from "./routers/Routers";
import { getCookie } from "./utils/getCookie";
import { deleteCookie } from "./utils/deleteCookie";
import { expireSession, setSession } from "./store/slice/sessionSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [timeLeft, setTimeLeft] = useState<number | null>(null); // state có thể là số hoặc null

  useEffect(() => {
    const sessionId = getCookie("sessionId");
    const expirationTime = parseInt(getCookie("expiresAfter") ?? "0", 10);

    if (sessionId && expirationTime) {
      const checkSession = () => {
        const remainingTime = expirationTime - Date.now();

        if (remainingTime <= 0) {
          // Hết hạn, xóa cookie và điều hướng
          deleteCookie("sessionId");
          deleteCookie("expiresAfter");
          dispatch(expireSession());
          navigate("/login");
          toast.error("Phiên đăng nhập đã hết hạn !! Vui lòng đăng nhập lại");
        } else {
          // Đặt timeout kiểm tra lại sau 1 giây hoặc khi hết thời gian
          setTimeout(checkSession, Math.min(remainingTime, 1000));
        }
      };
      checkSession();
    } else {
      dispatch(expireSession());
    }
  }, [dispatch, navigate]);

  return <Routes />;
};

export default App;
