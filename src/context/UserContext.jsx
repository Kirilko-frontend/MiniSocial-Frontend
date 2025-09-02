import React, { createContext, useState, useEffect } from "react";
import { getMe } from "../api/userApi";
import { register as registerApi, login as loginApi } from "../api/authApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const register = async (formData) => {
    try {
      await registerApi(formData);
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      await loginApi({ email, password });
      const res = await getMe();
      setUser(res.data.data);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
