import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => useContext(AuthenticationContext);

export const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const login = () => {
    setIsUserAuthenticated(true);
  };

  const logout = () => {
    setIsUserAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isUserAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
