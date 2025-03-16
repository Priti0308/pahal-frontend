import { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Check if token exists on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("token");
      const storedAdmin = localStorage.getItem("admin");
      
      if (storedToken && storedAdmin) {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and admin data
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      
      setToken(data.token);
      setAdmin(data.admin);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;

  const value = {
    admin,
    token,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};