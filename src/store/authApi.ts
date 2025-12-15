import { apiClient } from "../api/axios";

export const loginApi = async (data: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post("/users/login", {
    username: data.username,
    password: data.password,
  });
  return response.data;
};

export const refreshTokenApi = async (refresh_token: string) => {
  const response = await apiClient.post("/users/refresh-token", {
    refresh_token,
  });
  return response.data;
};
