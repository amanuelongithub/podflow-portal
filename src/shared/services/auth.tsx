// src/shared/hooks/useAuth.js
import axios from "axios";
import { useState } from "react";
import { api } from "./api.tsx";
import { jwtDecode } from "jwt-decode";
import { loginUrl, refreshUrl, signupUrl } from "../../core/config.ts";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (user: Record<string, any>) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await api().post(signupUrl, user);

      if (response.status === 200 || response.status === 201) {
        const tokenData = response.data.token;
        localStorage.setItem("token", JSON.stringify(tokenData));
        console.log("Token object saved to localStorage:", tokenData);
        return response.data;
      } else {
        setIsError(true);
        setErrorMessage(response.data?.error || "Something went wrong");
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Something went wrong");
      } else {
        setErrorMessage("Please check your network and try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (user: Record<string, any>) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await api().post(loginUrl, user);

      console.log("Status code");
      console.log(response.status);

      if (response.status === 200 || response.status === 201) {
        const tokenData = response.data.token;
        localStorage.setItem("token", JSON.stringify(tokenData));
        return tokenData;
      } else {
        setIsError(true);
        setErrorMessage(response.data?.error || "Something went wrong");
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Something went wrong");
      } else {
        setErrorMessage("Please check your network and try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    setIsError(false);
    setErrorMessage("");

    try {
      const storedToken = JSON.parse(localStorage.getItem("token") || "{}");

      const currentAccessToken = storedToken?.access_token;
      const refreshTokenValue = storedToken?.refresh_token;

      if (currentAccessToken && !isTokenExpired(currentAccessToken)) {
        console.log("Token Not Expired ................");
        // console.log(currentAccessToken);
        console.log("RefreshToken ........." + refreshTokenValue);
        return currentAccessToken;
      }
      console.log("RefreshToken2 ........." + refreshTokenValue);
      console.log("Token Expired ................");

      // if (!refreshTokenValue) {
      //   return null;
      // }

      const response = await api(refreshTokenValue).get(refreshUrl);

      if (response.status === 200) {
        console.log("---------- Token refreshed successfully ............");
        const { access_token, refresh_token } = response.data;
        console.log("Access Token XXXXXXX" + access_token);
        localStorage.setItem(
          "token",
          JSON.stringify({ access_token, refresh_token }),
        );
        return access_token;
      } else {
        setIsError(true);
        setErrorMessage(response.data?.error || "Failed to refresh");
        return null;
      }
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Refresh failed");
      } else {
        setErrorMessage("Network error");
      }
      return null;
    }
  };

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000; // current time in seconds
      return decoded.exp < now;
    } catch (err) {
      return true; // if token is invalid, consider it expired
    }
  };

  return {
    register,
    login,
    refreshToken,
    isLoading,
    isError,
    errorMessage,
  };
};
