
import React, { createContext, useState, useContext } from 'react';
import { getAccessToken, setAccessToken } from '../../tokenStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (token) => {
    await setAccessToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);