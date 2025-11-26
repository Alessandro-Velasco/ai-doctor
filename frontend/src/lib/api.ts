import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
console.log('🔵 API URL:', API_URL)

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  console.log('🔑 Token being sent:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.response?.data)
    if (error.response?.status === 401) {
      console.log('🚪 Unauthorized - clearing auth')
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

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
