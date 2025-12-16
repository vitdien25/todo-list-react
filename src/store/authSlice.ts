import { createSlice } from "@reduxjs/toolkit";
import { isTokenExpired } from "../utils/jwt";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || isTokenExpired(access_token)) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return {
      access_token: null,
      refresh_token: null,
      isAuthenticated: false,
    };
  }

  return {
    access_token,
    refresh_token,
    isAuthenticated: true,
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      // Clear localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
