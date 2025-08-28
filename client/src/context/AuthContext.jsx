import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchUserProfile, logout as backendLogout } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // 🔄 On mount: Check if user has valid session
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await fetchUserProfile();
        console.log("Session verification successful:", data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        if (err.status === 401) {
          // Normal - user not authenticated
          console.log("No valid session found");
        } else {
          console.warn("Unexpected error during session verification:", err);
        }
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    verifyUser();
  }, []); // Run only once on mount

  // 🔐 Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      
      console.log("Login response:", data);

      // If user data is not in login response, fetch it from protected endpoint
      if (data.user) {
        setUser(data.user);
      } else {
        // Fetch user profile after successful login
        const profileData = await fetchUserProfile();
        setUser(profileData.user);
      }
      
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      setError(err.message);
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Signup
  const signup = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    setLoading(true);
    try {
      await backendLogout();
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;