import axios from "axios";
import HTTP_CODE from "../configs/httpCode";

const apiClient = axios.create({
  baseURL: "https://petstore.swagger.io/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      console.error("No response from server, possible network issue:", error);
      return "Network error: Please check your connection.";
    }

    const errorMessage =
      HTTP_CODE[error.response.status] ||
      `Unexpected server error: ${error.response.status}`;
    console.error("Error from server:", {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data,
    });
    return errorMessage;
  }

  console.error("Unexpected error:", error);
  return "An unknown error occurred.";
};

export default apiClient;
