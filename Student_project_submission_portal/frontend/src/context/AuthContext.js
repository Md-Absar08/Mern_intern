import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

 
const AuthContext = createContext();

 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await loadUser();
      return { success: true };
    } catch (err) {
      logout();
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', {
      username,
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, error: 'Registration failed - no token received' };
  } catch (err) {
    let errorMessage = 'Registration failed';
    if (err.response) {
      errorMessage = err.response.data.message || errorMessage;
      if (err.response.data.errors) {
        errorMessage = Object.values(err.response.data.errors)
          .map(err => err.message || err)
          .join(', ');
      }
    }
    return { success: false, error: errorMessage };
  }
};
  
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      signup // Make sure to include signup here
    }}>
      {children}
    </AuthContext.Provider>
  );
};

 
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};