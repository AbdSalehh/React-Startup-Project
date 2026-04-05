import { axiosInstance } from "@/shared/api";

export const userApi = {
  getUsers: async ({
    limit = 10,
    skip = 0,
    select = "firstName,lastName,age,email,image",
  } = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    queryParams.append("skip", skip.toString());
    if (select) queryParams.append("select", select);

    const response = await axiosInstance.get(
      `/users?${queryParams.toString()}`,
    );
    return response.data;
  },

  getAllUsers: async (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.active !== undefined)
      queryParams.append("active", params.active.toString());

    const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (data) => {
    const response = await axiosInstance.post("/users/add", data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};
