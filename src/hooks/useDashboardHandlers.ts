import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

interface UseDashboardHandlersReturn {
  handleLogout: () => void;
  handleProfileClick: () => void;
  handleSettingsClick: () => void;
}

/**
 * Hook personalizado para manejar los eventos del dashboard
 * Incluye logout y navegación a perfil/configuración
 */
export const useDashboardHandlers = (): UseDashboardHandlersReturn => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const handleSettingsClick = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  return {
    handleLogout,
    handleProfileClick,
    handleSettingsClick,
  };
};
