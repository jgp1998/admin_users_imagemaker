import {
    Box,
    TextField,
    Typography,
    InputAdornment,

} from '@mui/material';
import {
    Email as EmailIcon,
} from '@mui/icons-material';
import { InputField } from '../../InputField';

interface EmailFieldProps {
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    title: string;
    placeholder?: string; 
}

export const EmailField = ({ email, setEmail, isLoading, title, placeholder }: EmailFieldProps) => {
    return (<>
        <InputField title={title} />
        <Box sx={{ mb: 2 }}>
            <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                placeholder={placeholder || ""}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <EmailIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#e0e0e0',
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottom: '2px solid #1976d2',
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                        },
                    },
                }}
            />
        </Box>
    </>

    )
}
