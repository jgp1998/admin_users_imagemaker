import { useMemo, useEffect } from 'react';
import { useUsersStore } from '../store';
import type {UserMetrics } from '../types';


/**
 * Hook personalizado que calcula métricas sobre los usuarios
 * Utiliza useMemo para optimizar el rendimiento y evitar recálculos innecesarios
 * También se encarga de cargar los usuarios desde la API si no están cargados
 */
export const useUserMetrics = (): UserMetrics => {
  const { users, fetchUsers, hasLoaded } = useUsersStore();

  // Cargar usuarios cuando el hook se monta
  useEffect(() => {
    if (!hasLoaded) {
      fetchUsers();
    }
  }, [hasLoaded, fetchUsers]);

  const metrics = useMemo(() => {
    const totalUsers = users.length;
    
    // Contar usuarios activos e inactivos
    const activeUsers = users.filter(user => user.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    // Contar usuarios por rol
    const adminCount = users.filter(user => user.role === 'admin').length;
    const vendedorCount = users.filter(user => user.role === 'editor').length;
    const usuarioCount = users.filter(user => user.role === 'viewer').length;

    // Calcular porcentaje de usuarios activos
    const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

    // Obtener todos los permisos únicos
    const allPermissions = new Set<string>();
    users.forEach(user => {
      if (user.claims && Array.isArray(user.claims)) {
        user.claims.forEach(permission => {
          allPermissions.add(permission);
        });
      }
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminCount,
      vendedorCount,
      usuarioCount,
      activePercentage,
      permissions: {
        total: allPermissions.size,
        unique: allPermissions,
      },
      users,
    };
  }, [users]);

  return metrics;
};
