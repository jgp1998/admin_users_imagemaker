import {
    Box,
    Alert,
} from '@mui/material';

import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthLayout } from '../../layouts/AuthLayout';
import { EmailField, PasswordField, AuthButton, LinkForm } from '../../components/auth/form/';
import { useLoginForm } from '../../hooks/useLoginForm';


const Login = () => {
    const {
        email,
        password,
        showPassword,
        isLoading,
        displayError,
        setEmail,
        setPassword,
        handleClickShowPassword,
        handleSubmit,
    } = useLoginForm();

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
