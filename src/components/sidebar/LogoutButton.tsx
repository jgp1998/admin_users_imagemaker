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
interface LogoutButtonProps {
    onLogout: () => void;
}
export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    return (
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
    )
}
