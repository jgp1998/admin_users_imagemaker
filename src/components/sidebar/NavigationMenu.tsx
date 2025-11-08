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
    onNavigate: (path: string) => void;
    onClose: () => void;
    userRole?: string;
}

export const NavigationMenu = ({ menuItems, onNavigate, onClose, userRole }: NavigationMenuProps) => {

    const filteredItems = menuItems.filter((item) =>
        item.roles.includes(userRole || 'viewer')
    );

    const handleNavigation = (path: string) => {
        onNavigate(path);
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
    )
}
