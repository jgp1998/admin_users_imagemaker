
import './App.css'
import { DashboardLayout } from './layouts/DashboardLayout';
import { Box, Typography, Button } from '@mui/material';

const App = () => {
  const handleNavigate = (path: string) => {
    console.log('Navegando a:', path);
  };

  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  const handleProfileClick = () => {
    console.log('Ir a perfil');
  };

  const handleSettingsClick = () => {
    console.log('Ir a configuración');
  };

  return (
    <DashboardLayout
      userName="Juan García"
      userRole="admin"
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onProfileClick={handleProfileClick}
      onSettingsClick={handleSettingsClick}
    >
      {/* Contenido de ejemplo */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Bienvenido al Dashboard
        </Typography>
        
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 2,
            p: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Contenido Principal
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
            Este es el contenido principal del dashboard. Aquí irán los componentes según la sección seleccionada.
          </Typography>
          <Button variant="contained" color="primary">
            Acción Ejemplo
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default App;
