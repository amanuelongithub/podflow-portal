import axios from "axios";

export const api = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
  });
