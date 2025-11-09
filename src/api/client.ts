import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { useAuthStore } from '../store';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - agregar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response - manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth_token');
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = '/login';
    }

    // Extraer mensaje de error del backend
    let errorMessage = 'Error desconocido';

    if (error.response?.data) {
      const data = error.response.data;

      // Caso 1: Array de errores de validación
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        errorMessage = data.errors[0].msg || data.errors[0].message || 'Error de validación';
      }
      // Caso 2: Mensaje directo
      else if (data.message) {
        errorMessage = data.message;
      }
      // Caso 3: Campo "msg"
      else if (data.msg) {
        errorMessage = data.msg;
      }
      // Caso 4: Campo "msj" (en español)
      else if (data.msj) {
        errorMessage = data.msj;
      }
    }

    // Rechazar con error que incluya el mensaje extraído
    const customError = new Error(errorMessage);
    return Promise.reject(customError);
  }
);


export default apiClient;
