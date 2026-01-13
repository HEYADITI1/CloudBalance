import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import UserPage from "./pages/Users/UserPage";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import CostExplorer from "./pages/CostExplorer/CostExplorer";
import NotAuthorized from "./pages/NotAuthorized"
import ProtectedRoute from "./routes/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import "./api/axios";
import Onboarding from "./pages/onBoard/Onboarding";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Root → Cost Explorer */}
      <Route path="/" element={<Navigate to="/cost-explorer" replace />} />

      {/* Login */}
      <Route
        path="/login"
        element={user ? <Navigate to="/cost-explorer" replace /> : <LoginPage />}
      />

      {/* Protected routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]}>
            <UserPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/add"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]}>
            <AddUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]}>
            <EditUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cost-explorer"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]}>
            <CostExplorer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client-onboarding"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]}>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/aws-services"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]}>
            <div className="p-6">AWS Services (Coming Soon)</div>
          </ProtectedRoute>
        }
      />

      <Route path="/not-authorized" element={<NotAuthorized />} />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
