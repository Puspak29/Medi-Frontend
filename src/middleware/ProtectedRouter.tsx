// components/AuthGuard.tsx
import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import routes from "../routes";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuth, currentUser } = useAuth();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const publicPaths = [
    routes.home,
    routes.auth.user.login,
    routes.auth.user.signup,
    routes.auth.doctor.login,
    routes.auth.doctor.signup,
  ];

  if (!isAuth) {
    if (!publicPaths.includes(path)) {
      return <Navigate to={routes.auth.user.login} replace />;
    }
    return <>{children}</>;
  }

  if (!currentUser) {
    // Defensive fallback
    return <Navigate to={routes.auth.user.login} replace />;
  }

  if (currentUser.role === "user") {
    // If trying to access any /doctor/* route or any /auth/* route (login/signup pages)
    if (path.startsWith("/doctor") || path.startsWith("/auth")) {
      return <Navigate to={routes.user.profile} replace />;
    }
  }

  if (currentUser.role === "doctor") {
    // If trying to access any /user/* route or any /auth/* route (login/signup pages)
    if (path.startsWith("/user") || path.startsWith("/auth")) {
      return <Navigate to={routes.doctor.profile} replace />;
    }
  }

  // Allowed route
  return <>{children}</>;
};

export default AuthGuard;
