import axios from "axios";
import { create } from "zustand";
import { api } from "../../../shared/services/api.tsx";
import { useAuthStore } from "../../../shared/services/auth.tsx";
import { getPodcastsUrl, createPodcastUrl } from "../../../core/config.ts"; // Add createPodcastUrl
import { PodcastModel, PodcastRequest } from "../model/podcast_model.ts";

// Define the type for create podcast payload

interface PodcastState {
  podcasts?: PodcastModel;
  isLoading: boolean;
  isError: boolean;
  unAuthorized: boolean;
  errorMessage: string;
  fetchPodcasts: () => Promise<void>;
  createPodcast: (payload: PodcastRequest) => Promise<void>;
  resetMessages: () => void;
}

export const podcastController = create<PodcastState>((set, get) => ({
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

  createPodcast: async (payload: PodcastRequest) => {
    set({
      isLoading: true,
      isError: false,
      unAuthorized: false,
      errorMessage: "",
    });

    try {
      const { refreshToken } = useAuthStore.getState();
      const accessToken = (await refreshToken()) ?? null;

      if (!accessToken) {
        console.log()
        set({
          unAuthorized: true,
          errorMessage: "No access token available",
        });
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("category_id", payload.category_id);

      if (payload.audio_file) {
        formData.append("audio_file", payload.audio_file);
      }

      if (payload.image_file) {
        formData.append("image_file", payload.image_file);
      }

      const response = await api(accessToken).post(createPodcastUrl, formData);

      if (response.status === 201 || response.status === 200) {
        const successMessage = response.data?.message;

        await get().fetchPodcasts();
      } else {
        const errorMsg = response.data?.message || "Failed to create podcast";
        set({
          isError: true,
          errorMessage: errorMsg,
        });
      }
    } catch (error: unknown) {
      let errorMsg = "Network error occurred";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          set({
            unAuthorized: true,
            errorMessage: "Unauthorized access",
          });
        }

        if (error.response?.status === 422) {
          const validationErrors = error.response.data?.errors;
          errorMsg = validationErrors
            ? Object.values(validationErrors).flat().join(", ")
            : "Validation failed";
        } else {
          errorMsg =
            error.response?.data?.message || error.message || "Request failed";
        }
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      set({
        isError: true,
        errorMessage: errorMsg,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  resetMessages: () => {
    set({
      errorMessage: "",
      isError: false,
    });
  },
}));
