import {
    Box,
    Typography,
    Card,
} from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useUserMetrics } from '../hooks/useUserMetrics';
import { useDashboardHandlers } from '../hooks/useDashboardHandlers';

const Dashboard = () => {
    const metrics = useUserMetrics();
    const { handleLogout, handleProfileClick, handleSettingsClick } = useDashboardHandlers();

    const stats = [
        { 
            title: 'Total Usuarios', 
            value: metrics.totalUsers.toString(), 
            color: '#1976d2',
            subtitle: `${metrics.activeUsers} activos` 
        },
        { 
            title: 'Usuarios Activos', 
            value: `${metrics.activePercentage}%`, 
            color: '#388e3c',
            subtitle: `${metrics.activeUsers}/${metrics.totalUsers}` 
        },
        { 
            title: 'Permisos Únicos', 
            value: metrics.permissions.total.toString(), 
            color: '#f57c00',
            subtitle: 'Permisos en el sistema'
        },
        { 
            title: 'Administradores', 
            value: metrics.adminCount.toString(), 
            color: '#7b1fa2',
            subtitle: `${metrics.vendedorCount} Vendedores, ${metrics.usuarioCount} Usuarios` 
        },
    ];

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
