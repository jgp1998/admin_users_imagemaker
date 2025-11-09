import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useToast } from './useToast';

interface UseLoginFormReturn {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  displayError: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleClickShowPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Hook personalizado para manejar la lógica del formulario de login
 * Utiliza el estado global del authStore en lugar de useState
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const navigate = useNavigate();
  const { 
    login, 
    isLoading, 
    error, 
    clearError,
    loginForm,
    setLoginFormEmail,
    setLoginFormPassword,
    toggleLoginFormShowPassword,
    resetLoginForm,
  } = useAuthStore();
  
  const { success, error: showError } = useToast();

  const handleClickShowPassword = useCallback(() => {
    toggleLoginFormShowPassword();
  }, [toggleLoginFormShowPassword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();

      // Validaciones básicas
      if (!loginForm.email || !loginForm.password) {
        const msg = 'Por favor completa todos los campos';
        showError(msg);
        return;
      }

      try {
        // Llamar al store para login con email y password
        await login(loginForm.email, loginForm.password);
        success('¡Bienvenido al panel de administración!');
        resetLoginForm();
        // Navegar al dashboard
        navigate('/dashboard');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
        showError(errorMessage);
      }
    },
    [loginForm.email, loginForm.password, login, clearError, showError, success, navigate, resetLoginForm]
  );

  const displayError = error;

  return {
    email: loginForm.email,
    password: loginForm.password,
    showPassword: loginForm.showPassword,
    isLoading,
    displayError,
    setEmail: setLoginFormEmail,
    setPassword: setLoginFormPassword,
    handleClickShowPassword,
    handleSubmit,
  };
};
