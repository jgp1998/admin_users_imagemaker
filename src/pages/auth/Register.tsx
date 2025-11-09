import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Alert,
    InputAdornment,
} from '@mui/material';
import {
    Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthButton, EmailField, LinkForm, PasswordField } from '../../components/auth/form';
import { useAuthStore } from '../../store';

const Register = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setLocalError('');

        if (!name || !email || !password || !confirmPassword) {
            setLocalError('Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setLocalError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            // Registrar y auto-login
            await login(email, password);
            // Navegar al dashboard
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
            setLocalError(errorMessage);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const displayError = localError || error;

    return (
        <AuthLayout>

            <AuthHeader title="Crear Cuenta" subtitle="Regístrate para acceder al panel" />
            {/* Título */}

            {/* Formulario */}



            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {displayError && <Alert severity="error" sx={{ mb: 2 }}>{displayError}</Alert>}

                {/* Nombre Field */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: '#1a1f3a' }}>
                        Nombre
                    </Typography>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        required
                        placeholder="Juan García"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
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

                {/* Email Field */}
                <EmailField title="Correo Electrónico" placeholder="jorge@gmail.com" email={email} setEmail={setEmail} isLoading={isLoading} />

                {/* Password Field */}
                <PasswordField placeholder="********" title="Contraseña" password={password} setPassword={setPassword} showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} isLoading={isLoading} />

                {/* Confirm Password Field */}
                <PasswordField placeholder="********" title="Confirmar Contraseña" password={confirmPassword} setPassword={setConfirmPassword} showPassword={showConfirmPassword} handleClickShowPassword={handleClickShowConfirmPassword} isLoading={isLoading} />



                {/* Register Button */}
                <AuthButton isLoading={isLoading} btnName='Registrarse' />

        

                {/* Login Link */}

                    <LinkForm link="/login" textlink='Inicia sesión aquí' textquestion='¿Ya tienes cuenta?' />
            </Box>
        </AuthLayout>
    );
};

export default Register;
