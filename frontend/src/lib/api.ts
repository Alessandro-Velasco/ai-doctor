import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export const api = axios.create({
  baseURL: 'http://localhost:8000',
})

// Interceptor mejorado
api.interceptors.request.use((config) => {
  // Obtener token directamente del store
  const token = useAuthStore.getState().token
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

export const authApi = {
  register: (data: { username: string; email: string; password: string; fullName?: string }) =>
    api.post('/api/v1/auth/register', data),
  
  login: async (username: string, password: string) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return api.post('/api/v1/auth/login', formData)
  },
  
  getMe: () => api.get('/api/v1/auth/me'),
}

export const chatApi = {
  sendMessage: (message: string) =>
    api.post('/api/v1/chat', { message }),
}
