import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../store';

interface LogoutButtonProps {
    onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout(); // Actualizar store
        onLogout();
        navigate('/login');
    };

    return (
        <List sx={{ pt: 1 }}>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        mx: 1,
                        borderRadius: 1,
                        color: '#ffffff',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: '#ffffff' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Cerrar sesión"
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                color: '#ffffff',
                            },
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
