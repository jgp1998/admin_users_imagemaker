import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress,
    Avatar,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Email as EmailIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { AuthLayout } from '../layouts/AuthLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // TODO: Integrar con API
            console.log('Login con:', { email, password });
            // Simular delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            setError('Error al iniciar sesión. Por favor intenta nuevamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <AuthLayout>
            {/* Avatar de usuario */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#1a1f3a',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                    }}
                >
                    👤
                </Avatar>
            </Box>

            {/* Título */}
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Iniciar Sesión
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Accede al panel de administración
                </Typography>
            </Box>

            {/* Formulario */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* Email Field */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: '#1a1f3a' }}>
                        Correo
                    </Typography>
                    <TextField
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        placeholder="admin@gmail.com"
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

                {/* Password Field */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: '#1a1f3a' }}>
                        Contraseña
                    </Typography>
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        disabled={isLoading}
                                        sx={{ p: 0 }}
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

                {/* Login Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={isLoading}
                    sx={{
                        mt: 2,
                        mb: 2,
                        backgroundColor: '#1a1f3a',
                        '&:hover': {
                            backgroundColor: '#2a2f4a',
                        },
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
                </Button>

                {/* Register Link */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #e0e0e0',
                    }}
                >
                    <Typography variant="body2">
                        ¿No tienes cuenta?{' '}
                        <Link
                            href="/register"
                            sx={{
                                cursor: 'pointer',
                                color: '#1976d2',
                                fontWeight: 600,
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Regístrate aquí
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default Login;
