import React, { useState } from 'react'
import {
    Box,
    Alert,
} from '@mui/material';

import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthLayout } from '../../layouts/AuthLayout';
import { EmailField, PasswordField, AuthButton, LinkForm } from '../../components/auth/form/';


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
            {/* Título */}
            <AuthHeader title="Iniciar Sesión" subtitle="Accede al panel de administración" />

            {/* Formulario */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* Email Field */}
                <EmailField title="Correo Electrónico" placeholder="admin@gmail.com" email={email} setEmail={setEmail} isLoading={isLoading} />

                {/* Password Field */}

                <PasswordField placeholder="********" title="Contraseña" password={password} setPassword={setPassword} showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} isLoading={isLoading} />
                {/* Login Button */}
                <AuthButton isLoading={isLoading} btnName='Iniciar Sesión' />

                {/* Register Link */}
                <LinkForm link="/register" textlink='Regístrate aquí' textquestion='¿No tienes cuenta?' />
            </Box>
        </AuthLayout>
    );
};

export default Login;
