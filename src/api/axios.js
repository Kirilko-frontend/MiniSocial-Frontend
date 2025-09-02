import axios from "axios";

const api = axios.create({
  baseURL: "https://minisocial-backend-91oo.onrender.com",
  withCredentials: true,
});

export default api;
