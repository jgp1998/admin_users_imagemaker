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
  
  // Estado del formulario de Login
  loginForm: {
    email: string;
    password: string;
    showPassword: boolean;
  };
  
  // Estado del formulario de Registro
  registerForm: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
  };
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Acciones para formulario de Login
  setLoginFormEmail: (email: string) => void;
  setLoginFormPassword: (password: string) => void;
  setLoginFormShowPassword: (show: boolean) => void;
  toggleLoginFormShowPassword: () => void;
  resetLoginForm: () => void;
  
  // Acciones para formulario de Registro
  setRegisterFormName: (name: string) => void;
  setRegisterFormEmail: (email: string) => void;
  setRegisterFormPassword: (password: string) => void;
  setRegisterFormConfirmPassword: (password: string) => void;
  setRegisterFormShowPassword: (show: boolean) => void;
  setRegisterFormShowConfirmPassword: (show: boolean) => void;
  toggleRegisterFormShowPassword: () => void;
  toggleRegisterFormShowConfirmPassword: () => void;
  resetRegisterForm: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial - restaurar de localStorage si existe
  isAuthenticated: !!localStorage.getItem('auth_token'),
  userRole: (localStorage.getItem('user_role') as UserRole) || 'viewer',
  userName: localStorage.getItem('user_name') || '',
  userEmail: localStorage.getItem('user_email') || '',
  isLoading: false,
  error: null,
  
  // Estado inicial del formulario de Login
  loginForm: {
    email: '',
    password: '',
    showPassword: false,
  },
  
  // Estado inicial del formulario de Registro
  registerForm: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  },

  // Login
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // Llamar a la API
      const response = await authApi.login({ email, password });
      
      // Convertir rol de API a nuestro tipo
      const roleMap: Record<string, UserRole> = {
        'ADMIN_ROLE': 'admin',
        'SALES_ROLE': 'editor',
        'EDITOR_ROLE': 'editor',
        'USER_ROLE': 'viewer',
      };
      
      const userRole = roleMap[response.user.rol] || 'viewer';
      
      // Guardar información del usuario en localStorage
      localStorage.setItem('user_name', response.user.name);
      localStorage.setItem('user_email', response.user.email);
      localStorage.setItem('user_role', userRole);
      
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

  // Registro
  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // Llamar a la API
      const response = await authApi.register({ name, email, password });
      
      // Convertir rol de API a nuestro tipo
      const roleMap: Record<string, UserRole> = {
        'ADMIN_ROLE': 'admin',
        'SALES_ROLE': 'editor',
        'EDITOR_ROLE': 'editor',
        'USER_ROLE': 'viewer',
      };
      
      const userRole = roleMap[response.user.rol] || 'viewer';
      
      // Guardar información del usuario en localStorage
      localStorage.setItem('user_name', response.user.name);
      localStorage.setItem('user_email', response.user.email);
      localStorage.setItem('user_role', userRole);
      
      set({
        isAuthenticated: true,
        userName: response.user.name,
        userEmail: response.user.email,
        userRole,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Logout
  logout: () => {
    authApi.logout();
    // Limpiar datos del usuario de localStorage
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    
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
  
  // Acciones para formulario de Login
  setLoginFormEmail: (email) =>
    set((state) => ({
      loginForm: { ...state.loginForm, email },
    })),

  setLoginFormPassword: (password) =>
    set((state) => ({
      loginForm: { ...state.loginForm, password },
    })),

  setLoginFormShowPassword: (show) =>
    set((state) => ({
      loginForm: { ...state.loginForm, showPassword: show },
    })),

  toggleLoginFormShowPassword: () =>
    set((state) => ({
      loginForm: { ...state.loginForm, showPassword: !state.loginForm.showPassword },
    })),

  resetLoginForm: () =>
    set({
      loginForm: {
        email: '',
        password: '',
        showPassword: false,
      },
    }),
  
  // Acciones para formulario de Registro
  setRegisterFormName: (name) =>
    set((state) => ({
      registerForm: { ...state.registerForm, name },
    })),

  setRegisterFormEmail: (email) =>
    set((state) => ({
      registerForm: { ...state.registerForm, email },
    })),

  setRegisterFormPassword: (password) =>
    set((state) => ({
      registerForm: { ...state.registerForm, password },
    })),

  setRegisterFormConfirmPassword: (confirmPassword) =>
    set((state) => ({
      registerForm: { ...state.registerForm, confirmPassword },
    })),

  setRegisterFormShowPassword: (show) =>
    set((state) => ({
      registerForm: { ...state.registerForm, showPassword: show },
    })),

  setRegisterFormShowConfirmPassword: (show) =>
    set((state) => ({
      registerForm: { ...state.registerForm, showConfirmPassword: show },
    })),

  toggleRegisterFormShowPassword: () =>
    set((state) => ({
      registerForm: { ...state.registerForm, showPassword: !state.registerForm.showPassword },
    })),

  toggleRegisterFormShowConfirmPassword: () =>
    set((state) => ({
      registerForm: { ...state.registerForm, showConfirmPassword: !state.registerForm.showConfirmPassword },
    })),

  resetRegisterForm: () =>
    set({
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      },
    }),
}));
