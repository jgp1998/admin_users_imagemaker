import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AuthHeaderProps {
    title?: string;
    subtitle?: string;
}
export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {subtitle}
            </Typography>
        </Box>
    )
}
