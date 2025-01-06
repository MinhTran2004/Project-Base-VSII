// handleError.ts
import { toast } from "react-toastify";
import { deleteCookie } from "./deleteCookie";
import { expireSession } from "../store/slice/sessionSlice";
import { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { navigateToErrorPage } from "../store/slice/errorSlice";

export const handleError = (error: FetchBaseQueryError, api: BaseQueryApi) => {
  const { status } = error;
  //   const dispatch = useDispatch(); // Dispatch Redux action

  switch (status) {
    case 400:
      toast.error(
        "Yêu cầu không hợp lệ. Vui lòng kiểm tra thông tin và nhập lại Username/Password."
      );
      break;

    case 401:
      deleteCookie("sessionId");
      deleteCookie("expiresAfter");
      api.dispatch(expireSession());
      toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
      break;

    default:
      api.dispatch(
        navigateToErrorPage({
          status,
          message: error.data,
        })
      );
      break;
  }
};
