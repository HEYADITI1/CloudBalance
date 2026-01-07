import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

/**
 * Helper: check if JWT is expired
 */
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (err) {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  /**
   * Auto logout if token already expired (on app load / refresh)
   */
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, []);

  /**
   * Login
   */
  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);
    setToken(data.token);

    return data;
  };

  /**
   * Logout
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook
 */
export function useAuth() {
  return useContext(AuthContext);
}
