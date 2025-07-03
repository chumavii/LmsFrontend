// src/components/private-route.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

function PrivateRoute({ children, allowedRoles }: Props) {
  const { isLoggedIn, roles, authChecked } = useAuth();
  const hasAllowedRole = roles.some(i => allowedRoles.includes(i));

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute