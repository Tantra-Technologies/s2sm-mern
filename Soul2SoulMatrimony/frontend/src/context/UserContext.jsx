import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token && !userData) {
      axios
        .get("/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
          localStorage.setItem("userData", JSON.stringify(response.data)); // Persist userData
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          logout(); // Logout on failure
        });
    }
  }, [token, userData, logout]);

  const updateUser = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data)); // Update persisted userData
  };

  const clearUser = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
