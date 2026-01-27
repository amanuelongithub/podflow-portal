import axios from "axios";
import { create } from "zustand";
import { api } from "../../../shared/services/api.tsx";
import { useAuthStore } from "../../../shared/services/auth.tsx";
import { getPodcastsUrl } from "../../../core/config.ts";
import { PodcastModel } from "../model/podcast_model.ts";

interface PodcastState {
  podcasts?: PodcastModel;
  isLoading: boolean;
  isError: boolean;
  unAuthorized: boolean;
  errorMessage: string;
  fetchPodcasts: () => Promise<void>;
}

export const podcastController = create<PodcastState>((set) => ({
  podcasts: undefined,
  isLoading: false,
  isError: false,
  unAuthorized: false,
  errorMessage: "",

  fetchPodcasts: async () => {
    set({
      isLoading: true,
      isError: false,
      unAuthorized: false,
      errorMessage: "",
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { refreshToken } = useAuthStore.getState();

      const token = (await refreshToken()) ?? null;

      if (!token) {
        set({
          unAuthorized: true,
          errorMessage: "No access token available",
          isLoading: false,
        });
        return;
      }

      const response = await api(token).get(getPodcastsUrl);

      if (response.status === 200) {
        const podcastResponse = PodcastModel.fromRawJson(response.data);
        set({
          podcasts: podcastResponse,
          isLoading: false,
        });
      } else if (response.status === 401) {
        set({
          unAuthorized: true,
          errorMessage: "Unauthorized access",
          isLoading: false,
        });
      } else {
        set({
          isError: true,
          errorMessage: response.data?.message || "Something went wrong",
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      let errorMsg = "Network error";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          set({
            unAuthorized: true,
            errorMessage: "Unauthorized",
            isLoading: false,
          });
          return;
        }
        errorMsg = error.response?.data?.error || "Request failed";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      set({
        isError: true,
        errorMessage: errorMsg,
        isLoading: false,
      });
    }
  },

  
}));
