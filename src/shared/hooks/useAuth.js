// src/shared/hooks/useAuth.js
import { useState } from "react";
import { api } from "../services/api"; // your axios instance

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (user) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/register", user);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        setIsError(true);
        setErrorMessage(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      setIsError(true);
      if (!error.response) {
        setErrorMessage("Please check your network and try again");
      } else {
        setErrorMessage(error.response.data?.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, isError, errorMessage };
};
