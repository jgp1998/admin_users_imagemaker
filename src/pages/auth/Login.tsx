import React, { useState } from 'react'
import {
    Box,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthLayout } from '../../layouts/AuthLayout';
import { EmailField, PasswordField, AuthButton, LinkForm } from '../../components/auth/form/';
import { useAuthStore } from '../../store';


const Login = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setLocalError('');

        // Validaciones básicas
        if (!email || !password) {
            setLocalError('Por favor completa todos los campos');
            return;
        }

        try {
            // Llamar al store para login
            await login(email.split('@')[0], email, 'admin');
            // Navegar al dashboard
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
            setLocalError(errorMessage);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const displayError = localError || error;

    return (
        <AuthLayout>
            {/* Título */}
            <AuthHeader title="Iniciar Sesión" subtitle="Accede al panel de administración" />

            {/* Formulario */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {displayError && <Alert severity="error" sx={{ mb: 2 }}>{displayError}</Alert>}

                {/* Email Field */}
                <EmailField 
                    title="Correo Electrónico" 
                    placeholder="admin@gmail.com" 
                    email={email} 
                    setEmail={setEmail} 
                    isLoading={isLoading} 
                />

                {/* Password Field */}
                <PasswordField 
                    placeholder="********" 
                    title="Contraseña" 
                    password={password} 
                    setPassword={setPassword} 
                    showPassword={showPassword} 
                    handleClickShowPassword={handleClickShowPassword} 
                    isLoading={isLoading} 
                />

                {/* Login Button */}
                <AuthButton isLoading={isLoading} btnName='Iniciar Sesión' />

                {/* Register Link */}
                <LinkForm link="/register" textlink='Regístrate aquí' textquestion='¿No tienes cuenta?' />
            </Box>
        </AuthLayout>
    );
};

export default Login;
