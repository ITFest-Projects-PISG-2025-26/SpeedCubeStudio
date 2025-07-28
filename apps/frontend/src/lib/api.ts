import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data: { name: string; email: string; username: string; password: string }) =>
    api.post('/auth/signup', data),
  
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),
};

export const roomAPI = {
  create: (data: { name: string }) =>
    api.post('/rooms/create', data),
  
  join: (data: { code: string }) =>
    api.post('/rooms/join', data),
  
  getMyRooms: () =>
    api.get('/rooms/my-rooms'),
  
  getRoomDetails: (code: string) =>
    api.get(`/rooms/${code}`),
  
  deleteRoom: (code: string) =>
    api.delete(`/rooms/${code}`),
};

export const solveAPI = {
  getSolves: () =>
    api.get('/solve/history'),
  
  getStats: () =>
    api.get('/stats/personal'),
};

export default api;
