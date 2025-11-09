import { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useRolesAndPermissionsStore } from '../store/rolesAndPermissionsStore';
import { useDashboardHandlers } from '../hooks/useDashboardHandlers';
import { useAuthStore } from '../store';

const RolesAndPermissionsPage = () => {
  const {
    roles,
    uniquePermissions,
    isLoading,
    hasLoaded,
    fetch,
  } = useRolesAndPermissionsStore();

  const { handleLogout, handleProfileClick, handleSettingsClick } = useDashboardHandlers();
  const { userRole } = useAuthStore();

  // Solo admin puede ver esta página
  const canAccess = userRole === 'admin';

  useEffect(() => {
    if (!hasLoaded) {
      const loadData = async () => {
        try {
          await fetch();
        } catch (err) {
          console.error('Error al cargar roles y permisos:', err);
        }
      };
      loadData();
    }
  }, [hasLoaded, fetch]);

  if (!canAccess) {
    return (
      <DashboardLayout
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Alert severity="error">
            No tienes permisos para acceder a esta página. Solo administradores pueden ver roles y permisos.
          </Alert>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      onLogout={handleLogout}
      onProfileClick={handleProfileClick}
      onSettingsClick={handleSettingsClick}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Gestión de Roles y Permisos
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Summary Cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 2,
              }}
            >
              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #1976d2' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Roles
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {roles.length}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #f57c00' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Permisos
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                  {uniquePermissions.length}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #388e3c' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Permisos Promedio
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                  {roles.length > 0
                    ? Math.round(
                        roles.reduce((sum, role) => sum + (role.permissions?.length || 0), 0) / roles.length
                      )
                    : 0}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #7b1fa2' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Asignaciones
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  {roles.reduce((sum, role) => sum + (role.permissions?.length || 0), 0)}
                </Typography>
              </Card>
            </Box>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Roles del Sistema
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Rol</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Permisos</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Total Permisos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                          No hay roles registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      roles.map((role) => (
                        <TableRow key={role.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontWeight: '600' }}>{role.name}</TableCell>
                          <TableCell>{role.description || '-'}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {role.permissions && role.permissions.length > 0 ? (
                                role.permissions.slice(0, 3).map((permission) => (
                                  <Chip
                                    key={permission}
                                    label={permission}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))
                              ) : (
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  Sin permisos
                                </Typography>
                              )}
                              {role.permissions && role.permissions.length > 3 && (
                                <Chip
                                  label={`+${role.permissions.length - 3} más`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right', fontWeight: '600' }}>
                            {role.permissions?.length || 0}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Permissions Section */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Permisos Disponibles
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Permiso</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Usado en Roles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uniquePermissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} sx={{ textAlign: 'center', py: 3 }}>
                          No hay permisos registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      uniquePermissions.map((permission) => {
                        const usedInRoles = roles.filter((role) =>
                          role.permissions?.includes(permission)
                        ).length;

                        return (
                          <TableRow key={permission} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                            <TableCell sx={{ fontWeight: '600' }}>{permission}</TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              <Chip
                                label={`${usedInRoles} rol${usedInRoles !== 1 ? 'es' : ''}`}
                                size="small"
                                color={usedInRoles > 0 ? 'success' : 'default'}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Summary Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #1976d2' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Roles
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {roles.length}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #f57c00' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Permisos
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                  {uniquePermissions.length}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #388e3c' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Permisos Promedio
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                  {roles.length > 0
                    ? Math.round(
                        roles.reduce((sum, role) => sum + (role.permissions?.length || 0), 0) / roles.length
                      )
                    : 0}
                </Typography>
              </Card>

              <Card sx={{ p: 2, textAlign: 'center', borderTop: '4px solid #7b1fa2' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Total Asignaciones
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                  {roles.reduce((sum, role) => sum + (role.permissions?.length || 0), 0)}
                </Typography>
              </Card>
            </Box>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default RolesAndPermissionsPage;
