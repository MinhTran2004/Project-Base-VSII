import axios from "axios";

export const api = axios.create({
    baseURL: "https://petstore.swagger.io/v2/",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response?.status === 401){
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)