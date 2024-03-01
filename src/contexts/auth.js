import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api/api";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        const { data: user } = await api.get("users/me");
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await api.post("auth/login", { email, password });
    const token = data.token;
    if (token) {
      Cookies.set("token", token, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await api.get("users/me");
      setUser(user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
