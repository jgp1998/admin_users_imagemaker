import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userName?: string;
    userRole?: string;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onNavigate?: (path: string) => void;
}

export const DashboardLayout = ({
    children,
    userName = 'Usuario',
    userRole = 'viewer',
    onLogout,
    onProfileClick,
    onSettingsClick,
    onNavigate,
}: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const handleNavigate = (path: string) => {
        onNavigate?.(path);
    };

    const handleLogout = () => {
        handleSidebarClose();
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
                onNavigate={handleNavigate}
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
                    userName={userName}
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
