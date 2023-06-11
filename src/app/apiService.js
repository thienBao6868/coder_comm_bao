import axios from "axios";
import { BASE_URL } from "./config";
export const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  (error) => {
    console.log("Request error");
    return Promise.reject(error);
  }
);
apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  (error) => {
    const message = error.response?.data?.errors?.message || "Unknown Error"
    return Promise.reject({message});       
  }
);
