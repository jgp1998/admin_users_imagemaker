import { useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    type SvgIconTypeMap,
} from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

interface MenuItem {
    label: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    path: string;
    roles: string[];
}
interface NavigationMenuProps {
    menuItems: MenuItem[],
    onClose: () => void;
    userRole?: string;
}

export const NavigationMenu = ({ menuItems, onClose, userRole }: NavigationMenuProps) => {
    const navigate = useNavigate();

    const filteredItems = menuItems.filter((item) =>
        item.roles.includes(userRole || 'viewer')
    );

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };
    return (
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
                                color: '#ffffff',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: '#ffffff' }}>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
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
                );
            })}
        </List>
    )
}
