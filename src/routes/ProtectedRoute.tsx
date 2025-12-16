import { type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import type { RootState } from "../store";
import { isTokenExpired } from "../utils/jwt";
import { logout } from "../store/authSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, access_token } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (access_token && isTokenExpired(access_token)) {
      dispatch(logout());
    }
  }, [access_token, dispatch]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
