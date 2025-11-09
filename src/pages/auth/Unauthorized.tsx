import { Box, Typography, Button, Container } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const Unauthorized = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <LockIcon sx={{ fontSize: 80, color: '#d32f2f' }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Acceso Denegado
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          No tienes permisos para acceder a esta sección. Contacta con tu administrador.
        </Typography>
        <Button variant="contained" href="/dashboard">
          Volver al Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
