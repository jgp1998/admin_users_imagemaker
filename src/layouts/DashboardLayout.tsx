import React from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { useSidebar } from '../hooks/useSidebar';

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
    const { sidebarOpen, userRole, handleMenuToggle, handleSidebarClose, handleLogout } = useSidebar();

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
                onLogout={() => handleLogout(onLogout)}
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
                        width: '100%',
                    }}
                >
                    <Container maxWidth="lg" sx={{ py: 2, px: { xs: 1, sm: 2, md: 3 } }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
