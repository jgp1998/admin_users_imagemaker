import {
    Box,
    Typography,
} from '@mui/material';

interface InputFieldProps {
    title: string
}
export const InputField = ({ title }: InputFieldProps) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: '#1a1f3a' }}>
                {title}
            </Typography>
        </Box>
    )
}
