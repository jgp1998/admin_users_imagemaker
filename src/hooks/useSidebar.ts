import { useState, useCallback } from 'react';
import { useAuthStore } from '../store';

interface UseSidebarReturn {
  sidebarOpen: boolean;
  userRole: string | undefined;
  handleMenuToggle: () => void;
  handleSidebarClose: () => void;
  handleLogout: (onLogout?: () => void) => void;
}

/**
 * Hook personalizado para manejar la lógica del sidebar
 * Incluye el estado del sidebar y los handlers para abrir/cerrar y logout
 */
export const useSidebar = (): UseSidebarReturn => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, userRole } = useAuthStore();

  const handleMenuToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleLogout = useCallback((onLogout?: () => void) => {
    handleSidebarClose();
    logout(); // Actualizar store
    onLogout?.();
  }, [handleSidebarClose, logout]);

  return {
    sidebarOpen,
    userRole,
    handleMenuToggle,
    handleSidebarClose,
    handleLogout,
  };
};
