import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface Admin {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface AdminContextType {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token validity
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedAdmin = localStorage.getItem('admin');
      if (storedAdmin) {
        const adminData = JSON.parse(storedAdmin);
        const isValid = await verifyToken(adminData.token);
        if (!isValid) {
          localStorage.removeItem('admin');
          setAdmin(null);
        } else {
          setAdmin(adminData);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      setAdmin(data);
      localStorage.setItem('admin', JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  // Auto-logout on token expiration
  useEffect(() => {
    if (!admin?.token) return;

    const checkTokenValidity = async () => {
      const isValid = await verifyToken(admin.token);
      if (!isValid) {
        logout();
      }
    };

    const interval = setInterval(checkTokenValidity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [admin?.token]);

  return (
    <AdminContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}; 