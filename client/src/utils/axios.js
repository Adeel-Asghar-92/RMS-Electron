import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
  // baseURL: "https://rms-backend-sigma.vercel.app/v1",
  headers: {
    Authorization: localStorage.getItem("admin_auth_token"),
  },
});
