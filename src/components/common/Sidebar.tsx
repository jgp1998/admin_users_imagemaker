import { LogoutButton } from '../sidebar/LogoutButton';
import { NavigationMenu } from '../sidebar/NavigationMenu';
import {
    Drawer,
    Divider,
    Box,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Security as SecurityIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { SidebarHeader } from '../sidebar/SidebarHeader';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
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

export const Sidebar = ({
    open,
    onClose,
    onLogout,
    userRole = 'viewer',
}: SidebarProps) => {

    const sidebarContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <SidebarHeader title="ImageMaker" subtitle="Admin Panel" />
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Navigation Menu */}
            <NavigationMenu
                menuItems={menuItems}
                onClose={onClose}
                userRole={userRole}
            />

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Logout Button */}
            <LogoutButton onLogout={onLogout} />
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
                        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
                        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
