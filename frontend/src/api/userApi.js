import api from "./axios";

export const createUser = (user) => api.post("/api/users", user);

export const getUsers = () => api.get("/api/users");

export const getUserById = (id) => api.get(`/api/users/${id}`);

export const updateUser = (id, user) => api.put(`/api/users/${id}`, user);
