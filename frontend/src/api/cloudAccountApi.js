import api from "./axios";

export const getCloudAccounts = () => api.get("/api/cloud-accounts");
