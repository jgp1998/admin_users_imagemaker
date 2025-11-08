import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

const NotFound = () => {
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
        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#1976d2' }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h5">Página no encontrada</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          La página que buscas no existe o ha sido removida.
        </Typography>
        <Button variant="contained" href="/">
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
