import { create } from "zustand";
import { authApi } from "../api/auth.api";
import { tokenService } from "@/shared/lib/tokenService";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isLoadingAction: false,
  isInitialized: false,
  error: null,

  login: async (credentials) => {
    set({ isLoadingAction: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { data } = response;

      tokenService.setTokens(data.access_token, data.refresh_token);

      set({
        user: {
          id: data.user.id,
          username: data.user.username,
          name: data.user.name,
          nickname: data.user.nickname,
          email: data.user.email,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        },
        isLoadingAction: false,
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      set({ error: message, isLoadingAction: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoadingAction: true, error: null });
    try {
      const data = await authApi.register(userData);
      set({ isLoadingAction: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      set({ error: message, isLoadingAction: false });
      throw error;
    }
  },

  getMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.getMe();
      set({ user: data, isLoading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch user";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  initializeAuth: async () => {
    if (!tokenService.getAccessToken() && !tokenService.getRefreshToken()) {
      set({ isInitialized: true });
      return;
    }
    try {
      await get().getMe();
    } catch {
      // interceptor handles redirect on 401 refresh failure
    } finally {
      set({ isInitialized: true });
    }
  },

  logout: () => {
    tokenService.clearTokens();
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),

  isAuthenticated: () => tokenService.hasValidAccessToken(),
}));
