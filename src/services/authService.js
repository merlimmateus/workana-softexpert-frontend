import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); 
  }
};

const authService = {
  login,
};

export default authService;
