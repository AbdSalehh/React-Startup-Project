import { create } from "zustand";
import { userApi } from "../api/user.api";

export const useUserStore = create((set) => ({
  users: [],
  isLoading: false,
  isLoadingAction: false,
  error: null,
  errorAction: null,
  metadata: null,

  fetchUsers: async ({ limit = 10, skip = 0, select } = {}) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userApi.getUsers({ limit, skip, select });
      set({
        users: data.users ?? [],
        metadata: {
          total: data.total,
          skip: data.skip,
          limit: data.limit,
        },
        isLoading: false,
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch users";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchAllUsers: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userApi.getAllUsers(params);
      set({
        users: data.users ?? data,
        metadata: data.total
          ? {
              total: data.total,
              skip: data.skip,
              limit: data.limit,
            }
          : null,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch users";
      set({ error: message, isLoading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userApi.getUserById(id);
      set({ isLoading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch user";
      set({ error: message, isLoading: false });
      return null;
    }
  },

  createUser: async (data) => {
    set({ isLoadingAction: true, errorAction: null });
    try {
      const result = await userApi.createUser(data);
      set({ isLoadingAction: false });
      return result;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create user";
      set({ errorAction: message, isLoadingAction: false });
      throw error;
    }
  },

  updateUser: async (id, data) => {
    set({ isLoadingAction: true, errorAction: null });
    try {
      const result = await userApi.updateUser(id, data);
      set({ isLoadingAction: false });
      return result;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update user";
      set({ errorAction: message, isLoadingAction: false });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ isLoadingAction: true, errorAction: null });
    try {
      const result = await userApi.deleteUser(id);
      set({ isLoadingAction: false });
      return result;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete user";
      set({ errorAction: message, isLoadingAction: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearErrorAction: () => set({ errorAction: null }),
}));
