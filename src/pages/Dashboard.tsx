import {
    Box,
    Typography,
    Card,
} from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useUserMetrics } from '../hooks/useUserMetrics';
import { useDashboardHandlers } from '../hooks/useDashboardHandlers';
import { useAuthStore } from '../store';

const Dashboard = () => {
    const metrics = useUserMetrics();
    const { handleLogout, handleProfileClick, handleSettingsClick } = useDashboardHandlers();
    const { userRole } = useAuthStore();

    // Calcular estadísticas filtradas por rol
    const getFilteredMetrics = () => {
        if (userRole === 'admin') {
            // Admin ve todos
            return {
                totalCount: metrics.totalUsers,
                activeCount: metrics.activeUsers,
                activePercent: metrics.activePercentage,
                adminCount: metrics.adminCount,
                vendedorCount: metrics.vendedorCount,
                usuarioCount: metrics.usuarioCount,
                title: 'Todos',
            };
        } else if (userRole === 'editor') {
            // Vendedor ve solo vendedores y usuarios (no admin)
            const vendedorAndUsuario = metrics.vendedorCount + metrics.usuarioCount;
            const activeVendedorUsuario = metrics.users
                .filter(u => (u.role === 'editor' || u.role === 'viewer') && u.isActive)
                .length;
            const activePercent = vendedorAndUsuario > 0 
                ? Math.round((activeVendedorUsuario / vendedorAndUsuario) * 100) 
                : 0;
            return {
                totalCount: vendedorAndUsuario,
                activeCount: activeVendedorUsuario,
                activePercent,
                adminCount: 0,
                vendedorCount: metrics.vendedorCount,
                usuarioCount: metrics.usuarioCount,
                title: 'Vendedores y Usuarios',
            };
        } else {
            // Usuario ve solo usuarios
            const usuarioCount = metrics.usuarioCount;
            const activeUsuarios = metrics.users
                .filter(u => u.role === 'viewer' && u.isActive)
                .length;
            const activePercent = usuarioCount > 0 
                ? Math.round((activeUsuarios / usuarioCount) * 100) 
                : 0;
            return {
                totalCount: usuarioCount,
                activeCount: activeUsuarios,
                activePercent,
                adminCount: 0,
                vendedorCount: 0,
                usuarioCount: usuarioCount,
                title: 'Usuarios',
            };
        }
    };

    const filteredMetrics = getFilteredMetrics();

    // Definir qué tarjetas puede ver cada rol
    const allStats = [
        { 
            title: `Total ${filteredMetrics.title}`, 
            value: filteredMetrics.totalCount.toString(), 
            color: '#1976d2',
            subtitle: `${filteredMetrics.activeCount} activos`,
            roles: ['admin', 'editor', 'viewer']
        },
        { 
            title: `${filteredMetrics.title} Activos`, 
            value: `${filteredMetrics.activePercent}%`, 
            color: '#388e3c',
            subtitle: `${filteredMetrics.activeCount}/${filteredMetrics.totalCount}`,
            roles: ['admin', 'editor', 'viewer']
        },
        { 
            title: 'Permisos Únicos', 
            value: metrics.permissions.total.toString(), 
            color: '#f57c00',
            subtitle: 'Permisos en el sistema',
            roles: ['admin']
        },
        { 
            title: 'Detalles por Rol', 
            value: userRole === 'admin'
                ? `${filteredMetrics.adminCount}A - ${filteredMetrics.vendedorCount}V - ${filteredMetrics.usuarioCount}U`
                : userRole === 'editor'
                ? `${filteredMetrics.vendedorCount}V - ${filteredMetrics.usuarioCount}U`
                : filteredMetrics.usuarioCount.toString(),
            color: '#7b1fa2',
            subtitle: userRole === 'admin' 
                ? `${filteredMetrics.adminCount} Admins, ${filteredMetrics.vendedorCount} Vendedores, ${filteredMetrics.usuarioCount} Usuarios`
                : userRole === 'editor'
                ? `${filteredMetrics.vendedorCount} Vendedores, ${filteredMetrics.usuarioCount} Usuarios`
                : `${filteredMetrics.usuarioCount} Usuarios`,
            roles: ['admin', 'editor', 'viewer']
        },
    ];

    // Filtrar tarjetas según el rol del usuario
    const stats = allStats.filter(stat => stat.roles.includes(userRole || 'viewer'));

    return (
        <DashboardLayout
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Dashboard
                </Typography>

                {/* Stats Cards */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                borderTop: `4px solid ${stat.color}`,
                                '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {stat.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 'bold', color: stat.color }}
                            >
                                {stat.value}
                            </Typography>
                            {stat.subtitle && (
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                                    {stat.subtitle}
                                </Typography>
                            )}
                        </Card>
                    ))}
                </Box>
            </Box>
        </DashboardLayout>
    );
};

export default Dashboard;
