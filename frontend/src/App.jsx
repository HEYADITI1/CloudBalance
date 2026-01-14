import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/Login/LoginPage";
import UserPage from "./pages/Users/UserPage";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import CostExplorer from "./pages/CostExplorer/CostExplorer";
import NotAuthorized from "./pages/NotAuthorized";  {/* Root → Cost Explorer */}
import ProtectedRoute from "./routes/ProtectedRoutes";
import Onboarding from "./pages/onBoard/Onboarding";

import "./api/axios";

export default function App() {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/cost-explorer" replace />} />

      <Route
        path="/login"
        element={token ? <Navigate to="/cost-explorer" replace /> : <LoginPage />}
      />

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

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
