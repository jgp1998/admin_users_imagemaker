import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { InputField } from '../../InputField';

interface PasswordFieldProps {
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    handleClickShowPassword: () => void;
    isLoading: boolean;
    title: string;
    placeholder?: string;
}
export const PasswordField = ({
    password,
    setPassword,
    showPassword,
    handleClickShowPassword,
    isLoading,
    title,
    placeholder,
}: PasswordFieldProps) => {
    return (
        <>
            <InputField title={title} />
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    variant="outlined"
                    placeholder={placeholder || ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    disabled={isLoading}
                                    sx={{ p: 1.5 }}
                                >
                                    {showPassword ? (
                                        <VisibilityIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                                    ) : (
                                        <VisibilityOffIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                                    )}
                                </IconButton>
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
