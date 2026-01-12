import api from "./axios";

export const getCloudAccounts = () => api.get("/api/cloud-accounts");

export const createCloudAccount = (body) => api.post("/api/cloud-accounts", body);
