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
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // state có thể là số hoặc null

  useEffect(() => {
    const sessionId = getCookie("sessionId");
    const expirationTime = parseInt(getCookie("expiresAfter") ?? "0", 10);

    if (sessionId && expirationTime) {
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        deleteCookie("sessionId");
        deleteCookie("expiresAfter");
        dispatch(expireSession());
        toast.error("Phiên đăng nhập đã hết hạn !! Vui lòng đăng nhập lại");
        navigate("/login");
      } else {
        setTimeLeft(expirationTime - currentTime);
        dispatch(setSession({ sessionId }));

        // Tính toán lại thời gian hết hạn và chạy setInterval
        if (timeLeft !== null && timeLeft <= 5000 && timeLeft > 0) {
          toast.warning("Phiên đăng nhập của bạn sẽ hết hạn trong 5 giây");
        }

        const interval = setInterval(() => {
          const remainingTime = expirationTime - Date.now();
          setTimeLeft(remainingTime);

          // Nếu thời gian còn lại dưới 1 phút, kiểm tra mỗi giây
          if (remainingTime <= 60 * 1000 && remainingTime > 0) {
            const secondInterval = setInterval(() => {
              const remainingTime = expirationTime - Date.now();
              setTimeLeft(remainingTime);

              // Nếu thời gian còn lại dưới 0, xóa cookie và đăng xuất
              if (remainingTime <= 0) {
                clearInterval(secondInterval); // Dừng interval mỗi giây khi hết thời gian
                clearInterval(interval); // Dừng interval mỗi phút
                deleteCookie("sessionId");
                deleteCookie("expiresAfter");
                dispatch(expireSession());
                toast.error(
                  "Phiên đăng nhập đã hết hạn !! Vui lòng đăng nhập lại"
                );
                navigate("/login");
              }
            }, 1000); // Kiểm tra mỗi giây khi còn dưới 1 phút

            // Chỉ cần dừng interval ban đầu nếu còn dưới 1 phút
            clearInterval(interval);
          }
        }, 60 * 1000); // Kiểm tra mỗi phút

        // Lưu ý: Cần đảm bảo interval được dừng khi component unmount
        return () => clearInterval(interval); // Đảm bảo dừng interval khi không cần thiết nữa

        return () => {
          clearInterval(interval);
        };
      }
    } else {
      dispatch(expireSession());
    }
  }, [dispatch, navigate]);

  return <Routes />;
};

export default App;
