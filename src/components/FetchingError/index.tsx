import { Typography } from "@mui/material";

import { isFetchBaseQueryError } from "../handleFetching";
import { IPropData } from "../../types/types";

const ErrorComponent = ({ propsData }: { propsData: IPropData }) => {
  if (isFetchBaseQueryError(propsData.error)) {
    const status = propsData.error.status;
    const errorMessages: Record<string, string> = {
      400: "Yêu cầu không hợp lệ.",
      404: "Không tìm thấy dữ liệu.",
    };
    const message = errorMessages[status];

    return <Typography variant="h6">{message}</Typography>;
  }
};

export default ErrorComponent;
