import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { authApi } from '../api';

/**
 * Hook para inicializar la autenticación al cargar la app
 * Verifica si hay un token válido y restaura la sesión
 */
export const useAuthInit = () => {
  useEffect(() => {
    const initAuth = async () => {
      const token = authApi.getToken();
      
      // Si no hay token, no hacer nada
      if (!token) return;

      try {
        const isAuthenticated = authApi.isAuthenticated();
        
        if (!isAuthenticated) {
          // Token inválido, limpiar
          authApi.logout();
          useAuthStore.getState().logout();
        }
      } catch (err) {
        console.error('Error al inicializar autenticación:', err);
        // En caso de error, limpiar sesión
        authApi.logout();
        useAuthStore.getState().logout();
      }
    };

    initAuth();
  }, []);
};
