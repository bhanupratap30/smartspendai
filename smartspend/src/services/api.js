import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8080/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const { response } = error

    // Network/server offline
    if (!response) {
      toast.error(
        'Network error. Backend server may be offline.'
      )

      return Promise.reject(error)
    }

    // Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('token')

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    // Forbidden
    else if (response.status === 403) {
      toast.error('Access denied.')
    }

    // Server error
    else if (response.status >= 500) {
      toast.error('Server error. Please try again.')
    }

    return Promise.reject(error)
  }
)

export default api