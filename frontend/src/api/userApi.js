import api from "./axios";

// CREATE user
export const createUser = (user) => api.post("/api/users", user);

// GET all users
export const getUsers = () => api.get("/api/users");

// GET user by id
export const getUserById = (id) => api.get(`/api/users/${id}`);

// UPDATE
export const updateUser = (id, user) => api.put(`/api/users/${id}`, user);

// DELETE
export const deleteUser = (id) => api.delete(`/api/users/${id}`);
