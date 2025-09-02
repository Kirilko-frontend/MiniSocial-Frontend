import api from "./axios";

export const createPost = (formData) =>
  api.post("/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getPosts = () => api.get("/post");

export const getPostById = (id) => api.get(`/post/${id}`);

export const likePost = (id) => api.patch(`/post/${id}/like`);

export const deletePost = (id) => api.delete(`/post/${id}`);
