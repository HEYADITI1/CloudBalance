import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";          // adjust path
import UserPage from "./pages/Users/UserPage";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import ClientOnboarding from "./pages/Onboarding/ClientOnboarding";
import CostExplorer from "./pages/CostExplorer/CostExplorer";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import "./api/axios";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login: if already logged in, go straight to /users */}
      <Route
        path="/login"
        element={user ? <Navigate to="/users" replace /> : <LoginPage />}
      />

      {/* Protected routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/add"
        element={
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id/edit"
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cost-explorer"
        element={
          <ProtectedRoute>
            <CostExplorer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client-onboarding"
        element={
          <ProtectedRoute>
            <ClientOnboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/aws-services"
        element={
          <ProtectedRoute>
            <div className="p-6">AWS Services (Coming Soon)</div>
          </ProtectedRoute>
        }
      />



      {/* default route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
