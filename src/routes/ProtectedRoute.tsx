import { type JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
