// src/components/private-route.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PrivateRoute({ children }: Props) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute