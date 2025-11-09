import {
    Box,
    Typography,
} from '@mui/material';

interface SidebarHeaderProps {
    title: string;
    subtitle: string;
}

export const SidebarHeader = ({ title, subtitle }: SidebarHeaderProps) => {
    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                    mb: 1,
                }}
            >
                {title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {subtitle}
            </Typography>
        </Box>
    )
}
