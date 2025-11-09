import { create } from 'zustand';
import type { UserRole } from '../types';
import { authApi } from '../api';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userEmail: string;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  isAuthenticated: !!localStorage.getItem('auth_token'),
  userRole: 'viewer',
  userName: '',
  userEmail: '',
  isLoading: false,
  error: null,

  // Login
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // Llamar a la API
      const response = await authApi.login({ email, password });
      
      // Convertir rol de API a nuestro tipo
      const roleMap: Record<string, UserRole> = {
        'ADMIN_ROLE': 'admin',
        'EDITOR_ROLE': 'editor',
        'USER_ROLE': 'viewer',
        'SALES_ROLE': 'viewer',
      };
      
      const userRole = roleMap[response.user.rol] || 'viewer';
      
      set({
        isAuthenticated: true,
        userName: response.user.name,
        userEmail: response.user.email,
        userRole,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Logout
  logout: () => {
    authApi.logout();
    set({
      isAuthenticated: false,
      userRole: 'viewer',
      userName: '',
      userEmail: '',
      isLoading: false,
      error: null,
    });
  },

  // Cambiar estado de carga
  setLoading: (loading) =>
    set({ isLoading: loading }),

  // Establecer error
  setError: (error) =>
    set({ error }),

  // Limpiar error
  clearError: () =>
    set({ error: null }),
}));
