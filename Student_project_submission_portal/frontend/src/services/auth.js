import api from '../utils/api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    return { success: false, error: errorMessage };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { 
      username, 
      email, 
      password 
    });
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    let errorMessage = 'Registration failed. Please try again.';
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
      
 
      if (error.response.data.errors) {
        errorMessage = Object.values(error.response.data.errors)
          .map(err => err.message)
          .join(', ');
      }
    }
    return { success: false, error: errorMessage };
  }
};