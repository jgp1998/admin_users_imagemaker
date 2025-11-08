import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onMenuToggle: () => void;
  userName?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  userName = 'Usuario',
  onProfileClick,
  onSettingsClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    onProfileClick?.();
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    onSettingsClick?.();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Section - Menu Button & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              fontSize: '1.25rem',
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Right Section - Notifications & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications Icon */}
          <IconButton
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* Profile Avatar */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: '#1976d2',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {getInitials(userName)}
            </Avatar>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {userName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleProfileClick}>Mi Perfil</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Configuración</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
