import {
    Box,
    Avatar,
} from '@mui/material';
export const AvatarUser = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar
                sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: '#1a1f3a',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                }}
            >
                👤
            </Avatar>
        </Box>
    )
}
