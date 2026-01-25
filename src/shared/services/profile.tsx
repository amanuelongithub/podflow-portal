import { create } from "zustand";
import axios from "axios";
import { api } from "./api.tsx";
import { useAuthStore } from "./auth.tsx";
import { User } from "../../features/model/users_model.ts";
import { editProfile, profileUrl } from "../../core/config.ts";
import { UserProfileModel } from "../../features/model/profile_model.ts";

interface UserState {
  profile: User | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  fetchUserProfile: () => Promise<void>;
  editUserProfile: (user: any) => Promise<void>;
}

export const useUserProfile = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  isError: false,
  errorMessage: "",

  fetchUserProfile: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await wait(300);
      const token = (await useAuthStore.getState().refreshToken()) ?? null;

      if (!token) {
        set({
          isError: true,
          errorMessage: "No access token available",
          isLoading: false,
        });
        return;
      }

      const response = await api(token).get(profileUrl);

      if (response.status === 200) {
        const apiResponse = UserProfileModel.fromRawJson(response.data);
        set({ profile: apiResponse.data });
      } else {
        set({
          isError: true,
          errorMessage: response.data?.error || "Something went wrong",
        });
      }
    } catch (error: unknown) {
      let msg = "Network error";
      if (axios.isAxiosError(error))
        msg = error.response?.data?.error || "Request failed";
      else if (error instanceof Error) msg = error.message;

      set({ isError: true, errorMessage: msg });
    } finally {
      set({ isLoading: false });
    }
  },

  editUserProfile: async (user) => {
    set({ isLoading: true, isError: false, errorMessage: "" });

    try {
      const token = (await useAuthStore.getState().refreshToken()) ?? null;

      if (!token) {
        set({
          isError: true,
          errorMessage: "No access token available",
          isLoading: false,
        });
        return;
      }

      const formData = new FormData();
      if (user.full_name) formData.append("full_name", user.full_name);
      if (user.company_name) formData.append("company_name", user.company_name);
      if (user.phone_number) formData.append("phone_number", user.phone_number);
      if (user.bio) formData.append("bio", user.bio);
      if (user.profile_image && user.profile_image instanceof File) {
        formData.append("profile_image", user.profile_image);
      }

      const response = await api(token).put(editProfile, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const apiResponse = UserProfileModel.fromRawJson(response.data);
        set({ profile: apiResponse.data });
      }
    } catch (error: unknown) {
      let msg = "Network error";
      if (axios.isAxiosError(error))
        msg = error.response?.data?.error || "Request failed";
      else if (error instanceof Error) msg = error.message;

      set({ isError: true, errorMessage: msg });
    } finally {
      set({ isLoading: false });
    }
  },
}));
