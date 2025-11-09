import {
    Box,
    Typography,
    Card,
} from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';

const Dashboard = () => {
    const stats = [
        { title: 'Total Usuarios', value: '245', color: '#1976d2' },
        { title: 'Usuarios Activos', value: '198', color: '#388e3c' },
        { title: 'Permisos', value: '12', color: '#f57c00' },
        { title: 'Sesiones Activas', value: '42', color: '#7b1fa2' },
    ];

    const handleLogout = () => {
        console.log('Logout desde Dashboard');
    };

    const handleProfileClick = () => {
        console.log('Ir a perfil');
    };

    const handleSettingsClick = () => {
        console.log('Ir a configuración');
    };

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
                        </Card>
                    ))}
                </Box>

                {/* Content Section */}
                <Card sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Bienvenido al Panel de Administración
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Selecciona una opción del menú lateral para empezar a gestionar usuarios,
                        permisos y configuración.
                    </Typography>
                </Card>
            </Box>
        </DashboardLayout>
    );
};

export default Dashboard;
