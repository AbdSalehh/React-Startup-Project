import { create } from "zustand";
import { authApi } from "../api/auth.api";
import { tokenService } from "@/shared/lib/tokenService";
import { getUserFromToken } from "@/shared/lib/jwtDecode";
import { toast } from "sonner";

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

      const user = getUserFromToken(data.access_token);
      set({ user, isLoadingAction: false });
      toast.success(response.data.message || "Login berhasil! Selamat datang.");

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
    const accessToken = tokenService.getAccessToken();
    const refreshToken = tokenService.getRefreshToken();

    if (!accessToken && !refreshToken) {
      set({ isInitialized: true });
      return;
    }

    try {
      const user = getUserFromToken(accessToken || refreshToken);
      set({ user, isInitialized: true });
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({ isInitialized: true });
    }
  },

  logout: async () => {
    try {
      tokenService.clearTokens();
      set({ user: null, error: null });
      // await authApi.logout();
    } catch (error) {
      tokenService.clearTokens();
      set({ user: null, error: null });
    }
  },

  clearError: () => set({ error: null }),

  isAuthenticated: () => tokenService.hasValidAccessToken(),
}));
