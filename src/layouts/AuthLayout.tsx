import React from 'react';
import { Box, Container } from '@mui/material';
import { AvatarUser } from '../components/auth/AvatarUser';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: 1,
        overflow: 'auto',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            p: { xs: 2, sm: 3 },
          }}
        >
          {/* Avatar de usuario */}
          <AvatarUser />
          {children}
        </Box>

      </Container>
    </Box>
  );
};
