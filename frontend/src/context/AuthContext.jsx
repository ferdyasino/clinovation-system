import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as apiLogin, register as apiRegister, getProfile } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await apiLogin(email, password);
    localStorage.setItem('token', data.token);
    setUser(jwtDecode(data.token));
  };

  const register = async (name, email, password) => {
    const { data } = await apiRegister(name, email, password);
    localStorage.setItem('token', data.token);
    setUser(jwtDecode(data.token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        logout(); // invalid or expired token
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
