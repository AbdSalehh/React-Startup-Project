import { axiosInstance } from "@/shared/api";

export const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post("/users/add", userData);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get("/me");
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post("/auth/refresh-token", {
      refresh_token: refreshToken,
    });
    return response.data;
  },
};
