import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isInitializing, setIsInitializing] = useState(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/forgot-password"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/"); // Navigate to login only for protected routes
    }
    setIsInitializing(false); // Mark initialization as done
  }, [token, navigate, location.pathname]);

  const login = (userRole, token) => {
    setToken(token);
    localStorage.setItem("authToken", token);

    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "employee") {
      navigate("/employee/dashboard");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    navigate("/");
  };

  if (isInitializing) {
    return <div>Loading...</div>; // Optional: Add a loading spinner
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
