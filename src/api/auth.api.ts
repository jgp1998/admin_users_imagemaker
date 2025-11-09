import type { LoginRequest, LoginResponse, RegisterRequest } from '../types';
import apiClient from './client';

export const authApi = {
  /**
   * Registro del usuario
   * Usa el mismo endpoint que crear usuario, pero sin requerir x-token
   */
  register: async (credentials: RegisterRequest): Promise<LoginResponse> => {
    // El registro crea un usuario con rol USER_ROLE por defecto
    const { data } = await apiClient.post<LoginResponse>('/users/user', {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      rol: 'USER_ROLE',
      state: true,
      img: '',
      google: false,
    });
    
    // Guardar token en localStorage si viene en la respuesta
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    
    return data;
  },

  /**
   * Login del usuario
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    
    return data;
  },

  /**
   * Logout del usuario
   */
  logout: (): void => {
    localStorage.removeItem('auth_token');
  },

  /**
   * Obtener token actual
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
};

export default authApi;
