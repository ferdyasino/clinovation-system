import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

// Register a new user
export const register = async ({ name, email, password }) => {
  try {
    console.log('🔐 Register payload →', { name, email, password });
    const response = await axios.post(
      `${API_URL}/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error('❌ Register error:', err.response?.data || err.message);
    throw err;
  }
};

// Login user
export const login = async ({ email, password }) => {
  try {
    console.log('🔑 Login payload →', { email, password });
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error('❌ Login error:', err.response?.data || err.message);
    throw err;
  }
};

// Get user profile (requires token)
export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error('❌ Profile fetch error:', err.response?.data || err.message);
    throw err;
  }
};
