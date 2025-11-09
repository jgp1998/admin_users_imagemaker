import { create } from 'zustand';
import type { UserRole } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userEmail: string;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (userName: string, userEmail: string, userRole: UserRole) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  isAuthenticated: true, // true para testing
  userRole: 'admin',
  userName: 'Juan García',
  userEmail: 'juan@example.com',
  isLoading: false,
  error: null,

  // Login
  login: async (userName, userEmail, userRole) => {
    try {
      set({ isLoading: true, error: null });
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({
        isAuthenticated: true,
        userName,
        userEmail,
        userRole,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Logout
  logout: () =>
    set({
      isAuthenticated: false,
      userRole: 'viewer',
      userName: '',
      userEmail: '',
      isLoading: false,
      error: null,
    }),

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
