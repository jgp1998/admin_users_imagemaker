import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { UserRole } from '../types';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  userRole?: UserRole;
  requiredRoles: UserRole[];
}

/**
 * Componente que protege rutas basadas en roles
 * Muestra un mensaje de acceso denegado si el rol no coincide
 */
export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  userRole,
  requiredRoles,
}) => {
  if (!userRole || !requiredRoles.includes(userRole)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Acceso Denegado
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          No tienes permisos para acceder a esta sección.
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.history.back()}
        >
          Volver
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};
