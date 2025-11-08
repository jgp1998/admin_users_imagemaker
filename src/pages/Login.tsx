import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress,
} from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthHeader } from '../components/auth/AuthHeader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    return (
        <AuthLayout>
            <AuthHeader title="Iniciar Sesión" subtitle="Accede al panel de administración de ImageMaker" />

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    fullWidth
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    margin="normal"
                    required
                    placeholder="usuario@ejemplo.com"
                />

                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    margin="normal"
                    required
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={isLoading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" sx={{ cursor: 'pointer' }}>
                            Regístrate aquí
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default Login;
