import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { useAuthStore } from '../store';

interface DashboardLayoutProps {
    children: React.ReactNode;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}

export const DashboardLayout = ({
    children,
    onLogout,
    onProfileClick,
    onSettingsClick,
}: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, userRole } = useAuthStore();

    const handleMenuToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const handleLogout = () => {
        handleSidebarClose();
        logout(); // Actualizar store
        onLogout?.();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onClose={handleSidebarClose}
                onLogout={handleLogout}
                userRole={userRole}
            />

            {/* Main Content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                {/* Header */}
                <Header
                    onMenuToggle={handleMenuToggle}
                    onProfileClick={onProfileClick}
                    onSettingsClick={onSettingsClick}
                />

                {/* Content Area */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    <Container maxWidth="lg" sx={{ py: 2 }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
