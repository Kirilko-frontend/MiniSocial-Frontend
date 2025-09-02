import api from "./axios";

export const updateTheme = (data) => api.patch("/user/theme", data);

export const patchUser = (id, data) => api.patch(`/user/${id}`, data);

export const getMe = () => api.get("/user/me");

export const getUserById = (id) => api.get(`/user/${id}`);

export const getAllUsers = () => api.get("/user");

export const deleteUser = () => api.delete("/user");
