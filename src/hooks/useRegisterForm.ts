import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useUsersStore } from '../store/usersStore';
import { useToast } from './useToast';

interface UseRegisterFormReturn {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  displayError: string | null;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleClickShowPassword: () => void;
  handleClickShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}
/**
 * Hook personalizado para manejar la lógica del formulario de registro
 * Utiliza el estado global del authStore en lugar de useState
 */
export const useRegisterForm = (): UseRegisterFormReturn => {
  const navigate = useNavigate();
  const { 
    register, 
    isLoading, 
    error, 
    clearError,
    registerForm,
    setRegisterFormName,
    setRegisterFormEmail,
    setRegisterFormPassword,
    setRegisterFormConfirmPassword,
    toggleRegisterFormShowPassword,
    toggleRegisterFormShowConfirmPassword,
    resetRegisterForm,
  } = useAuthStore();
  
  const { success, error: showError } = useToast();

  const handleClickShowPassword = useCallback(() => {
    toggleRegisterFormShowPassword();
  }, [toggleRegisterFormShowPassword]);

  const handleClickShowConfirmPassword = useCallback(() => {
    toggleRegisterFormShowConfirmPassword();
  }, [toggleRegisterFormShowConfirmPassword]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();

      // Validaciones
      if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
        const msg = 'Por favor completa todos los campos';
        showError(msg);
        return;
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        const msg = 'Las contraseñas no coinciden';
        showError(msg);
        return;
      }

      if (registerForm.password.length < 6) {
        const msg = 'La contraseña debe tener al menos 6 caracteres';
        showError(msg);
        return;
      }

      try {
        // Registrar usuario
        await register(registerForm.name, registerForm.email, registerForm.password);
        success('¡Cuenta creada exitosamente! Bienvenido al panel');
        resetRegisterForm();
        
        // Invalidar cache de usuarios para que se recarguen en el dashboard
        useUsersStore.setState({ hasLoaded: false });
        
        // Navegar al dashboard
        navigate('/dashboard');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
        showError(errorMessage);
      }
    },
    [registerForm.name, registerForm.email, registerForm.password, registerForm.confirmPassword, register, clearError, showError, success, navigate, resetRegisterForm]
  );

  const displayError = error;

  return {
    name: registerForm.name,
    email: registerForm.email,
    password: registerForm.password,
    confirmPassword: registerForm.confirmPassword,
    showPassword: registerForm.showPassword,
    showConfirmPassword: registerForm.showConfirmPassword,
    isLoading,
    displayError,
    setName: setRegisterFormName,
    setEmail: setRegisterFormEmail,
    setPassword: setRegisterFormPassword,
    setConfirmPassword: setRegisterFormConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleSubmit,
  };
};
