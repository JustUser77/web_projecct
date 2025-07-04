import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 🔁 Cek localStorage saat pertama kali load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLogin = localStorage.getItem('isLoggedIn');

    if (storedUser && storedLogin === 'true') {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // 💾 Simpan ke localStorage setiap kali user atau login status berubah
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn, user]);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        sidebarVisible,
        setSidebarVisible,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};