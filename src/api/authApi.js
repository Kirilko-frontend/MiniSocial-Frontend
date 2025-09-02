import api from "./axios";

export const register = (formData) =>
  api.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const login = (data) => api.post("/auth/login", data);
