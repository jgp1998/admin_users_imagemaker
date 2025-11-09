import apiClient from './client';

interface LoginRequest {
  email: string;
  password: string;
}

interface UserApiResponse {
  id: string;
  name: string;
  email: string;
  rol: string;
  permissions: string[];
  state?: boolean;
  img?: string;
  google?: boolean;
  uid?: string;
}

interface LoginResponse {
  user: UserApiResponse;
  token: string;
}

export const authApi = {
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
