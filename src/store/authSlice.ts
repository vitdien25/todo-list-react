import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),
};

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
