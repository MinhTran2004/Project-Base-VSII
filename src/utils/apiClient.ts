import axios from "axios";
import HTTP_CODE from "../configs/httpCode";

const apiClient = axios.create({
  baseURL: "https://petstore.swagger.io/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status as keyof typeof HTTP_CODE;
    const message = HTTP_CODE[status] || "An unexpected error occurred.";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
