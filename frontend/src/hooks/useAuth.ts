import { useState, useCallback, useEffect } from "react";
import { Credentials, useAuthT } from "../types/auth";
import { API_URL } from "../config";

export const useAuth = (): useAuthT => {
  // Initial state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<string>("");

  // Authentication method
  const login = useCallback(async ({ email, password }: Credentials) => {
    try {
      // Replace with your actual verification endpoint
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Authentication failed");
      }

      // If successful, save and set up credentials
      const { token } = await res.json();
      setToken(token);
      setUsername(email);
      // Encrypt and store credentials

      localStorage.setItem("library-token", token);

      setIsAuthenticated(true);
      setError("");

      return true;
    } catch (error) {
      // Handle login failure
      console.log("Auth error", error);
      setIsAuthenticated(false);
      setUsername(undefined);
      setToken(undefined);
      setError("Authentication failed");

      return false;
    }
  }, []);

  // Logout method
  const logout = useCallback(() => {
    // Remove stored credentials
    localStorage.removeItem("library-token");

    // Reset auth state
    setIsAuthenticated(false);
    setUsername(undefined);
    setToken(undefined);
    setError("");
  }, []);

  // Check and restore session on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("library-token");

    if (savedToken) {
      // Attempt to validate saved credentials
      const validateToken = async () => {
        try {
          const res = await fetch(`${API_URL}/users/token`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${savedToken}`,
            },
          });

          if (!res.ok) {
            throw new Error("Authentication failed");
          }

          const { email } = await res.json();
          setToken(savedToken);
          setUsername(email);
          setIsAuthenticated(true);
          setError("");
        } catch (error) {
          // Clear credentials if validation fails
          console.log("Auth error", error);
          logout();
        }
      };

      validateToken();
    }
  }, []);

  return {
    // Authentication state
    isAuthenticated,

    token: token,

    // Credentials (be careful not to expose password)
    username: username,

    // Authentication methods
    login,
    logout,

    // Error state
    error: error,
  };
};
