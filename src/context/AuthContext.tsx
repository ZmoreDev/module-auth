import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // สมมติว่าเริ่มต้นยังไม่ได้ล็อกอิน

  const login = () => {
    // ในชีวิตจริง: ตรวจสอบข้อมูลผู้ใช้, ตั้งค่า token/session storage
    setIsLoggedIn(true);
    console.log('User logged in!');
  };

  const logout = () => {
    // ในชีวิตจริง: ลบ token/session storage
    setIsLoggedIn(false);
    console.log('User logged out!');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};