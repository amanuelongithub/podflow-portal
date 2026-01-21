import axios from "axios";
import { useState } from "react";
import { api } from "./api.tsx";
import { useAuth } from "./auth.tsx";
import { User } from "../../features/model/user_model.ts";
import { profileUrl } from "../../core/config.ts";

export const useUserInfo = () => {
  const { refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [profile, setProfile] = useState<User | null>(null);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      await wait(300);
      const token = (await refreshToken()) ?? null;

      if (!token) {
        setIsError(true);
        setErrorMessage("No access token available");
        return;
      }

      const response = await api(token).get(profileUrl);

      if (response.status === 200) {
        const userData = User.fromMap(response.data.data);
        setProfile(userData);
      } else {
        setIsError(true);
        setErrorMessage(response.data?.error || "Something went wrong");
      }
    } catch (error: unknown) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Request failed");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUserProfile, profile, isLoading, isError, errorMessage };
};
