import axios from 'axios'
import { useAuthStore } from '../store/authStore'

// Leer la variable de entorno correctamente para Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

console.log('🔵 API URL:', API_URL) // Debug: verifica qué URL está usando

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
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
