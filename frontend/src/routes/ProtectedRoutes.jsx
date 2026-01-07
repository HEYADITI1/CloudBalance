import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuth();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if provided)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/users" replace />;
  }

  return children;
}
