import { create } from "zustand";
import axios from "axios";
import { api } from "./api.tsx";
import { jwtDecode } from "jwt-decode";
import { loginUrl, refreshUrl, signupUrl } from "../../core/config.ts";

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  register: (user: Record<string, any>) => Promise<any>;
  login: (user: Record<string, any>) => Promise<string | undefined>;
  refreshToken: () => Promise<string | null>;
  isTokenExpired: (token: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  isError: false,
  errorMessage: "",

  register: async (user) => {
    set({ isLoading: true, isError: false, errorMessage: "" });

    try {
      const response = await api().post(signupUrl, user);

      if (response.status === 200 || response.status === 201) {
        const tokenData = response.data.token;
        localStorage.setItem("token", JSON.stringify(tokenData));
        return response.data;
      } else {
        set({
          isError: true,
          errorMessage: response.data?.error || "Something went wrong",
        });
      }
    } catch (error) {
      set({
        isError: true,
        errorMessage: axios.isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "Network error",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (user) => {
    set({ isLoading: true, isError: false, errorMessage: "" });

    try {
      const response = await api().post(loginUrl, user);

      // console.log("Login response data:", response.);
      if (response.status === 200) {
        const tokenData = response.data.token;
        localStorage.setItem("token", JSON.stringify(tokenData));
        return tokenData;
      } else {
        set({
          isError: true,
          errorMessage: response.data?.error || "Something went wrong",
        });
      }
    } catch (error) {
      set({
        isError: true,
        errorMessage: axios.isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "Network error",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshToken: async () => {
    set({ isError: false, errorMessage: "" });

    try {
      const storedToken = JSON.parse(localStorage.getItem("token") || "{}");
      console.log("Stored token for refresh:", storedToken);
      const currentAccessToken = storedToken?.access_token;
      const refreshTokenValue = storedToken?.refresh_token;

      if (currentAccessToken && !get().isTokenExpired(currentAccessToken)) {
        return currentAccessToken;
      }

      if (!refreshTokenValue) {
        return;
      }

      const response = await api(refreshTokenValue).get(refreshUrl);

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem(
          "token",
          JSON.stringify({ access_token, refresh_token }),
        );
        return access_token;
      } else {
        set({
          isError: true,
          errorMessage: response.data?.error || "Failed to refresh",
        });
        return null;
      }
    } catch (error) {
      set({
        isError: true,
        errorMessage: axios.isAxiosError(error)
          ? error.response?.data?.error || "Refresh failed"
          : "Network error",
      });
      return null;
    }
  },

  isTokenExpired: (token: string) => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch {
      return true;
    }
  },
}));
