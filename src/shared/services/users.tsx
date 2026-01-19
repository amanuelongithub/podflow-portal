import axios from "axios";
import { useState } from "react";
import { api } from "./api.tsx";
import { useAuth } from "./auth.tsx";
import { User } from "../../features/model/user_model.ts";
import { usersUrl } from "../../core/constants/config.js";

export const useUserInfo = () => {
  const { refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [users, setUsersData] = useState<User[]>([]);
  
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchUsers = async () => {
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

      const response = await api(token).get(usersUrl);

      if (response.status === 200) {
        const usersArray = response.data.data; // <-- notice the extra .data
        const usersData = usersArray.map((user: any) => User.fromMap(user));
        setUsersData(usersData);
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

  return { fetchUsers, users, isLoading, isError, errorMessage };
};
