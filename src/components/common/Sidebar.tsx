import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  userRole?: string;
}

const DRAWER_WIDTH = 280;

const menuItems = [
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
    roles: ['admin', 'editor', 'viewer'],
  },
  {
    label: 'Usuarios',
    icon: PeopleIcon,
    path: '/users',
    roles: ['admin', 'editor'],
  },
  {
    label: 'Permisos',
    icon: SecurityIcon,
    path: '/permissions',
    roles: ['admin'],
  },
  {
    label: 'Configuración',
    icon: SettingsIcon,
    path: '/settings',
    roles: ['admin'],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  onNavigate,
  onLogout,
  userRole = 'viewer',
}) => {
  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleNavigation = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            mb: 1,
          }}
        >
          ImageMaker
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2 }}>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon sx={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.95rem',
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout Button */}
      <List sx={{ pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              mx: 1,
              borderRadius: 1,
              color: '#d32f2f',
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon sx={{ color: '#d32f2f' }} />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'block', sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Box sx={{ width: DRAWER_WIDTH }}>{sidebarContent}</Box>
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            mt: 0,
            pt: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};
