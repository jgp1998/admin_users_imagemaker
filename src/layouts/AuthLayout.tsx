import React from 'react';
import { Box, Container } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            p: { xs: 2, sm: 4 },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
