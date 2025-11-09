import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useUsersStore } from '../store/usersStore';
import { useToast } from '../hooks/useToast';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const roleOptions: { value: string; label: string }[] = [
  { value: 'ADMIN_ROLE', label: 'Administrador' },
  { value: 'SALES_ROLE', label: 'Vendedor' },
  { value: 'USER_ROLE', label: 'Usuario' },
];

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rol: 'SALES_ROLE',
    state: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { addUser, invalidateCache } = useUsersStore();
  const { success, error: showError } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.rol) {
      newErrors.rol = 'El rol es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    // Limpiar error de API
    if (apiError) {
      setApiError(null);
    }
  };

  const handleRoleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      rol: event.target.value,
    }));
    // Limpiar error del campo
    if (errors.rol) {
      setErrors((prev) => ({
        ...prev,
        rol: '',
      }));
    }
    // Limpiar error de API
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async () => {
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      // Llamar a la API para crear usuario
      await addUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rol: formData.rol,
        state: formData.state,
        img: '',
        google: false,
      });

      // Invalidar cache para recargar usuarios
      invalidateCache();

      success(`Usuario ${formData.name} creado exitosamente`);

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        password: '',
        rol: 'SALES_ROLE',
        state: true,
      });
      setErrors({});

      // Cerrar modal
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear usuario';
      setApiError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: '',
        email: '',
        password: '',
        rol: 'SALES_ROLE',
        state: true,
      });
      setErrors({});
      setApiError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {apiError && (
            <Alert severity="error" onClose={() => setApiError(null)}>
              {apiError}
            </Alert>
          )}

          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
            placeholder="Juan García"
            autoFocus
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            placeholder="juan@example.com"
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            placeholder="••••••"
          />

          <FormControl fullWidth error={!!errors.rol} disabled={isLoading}>
            <InputLabel>Rol</InputLabel>
            <Select
              name="rol"
              value={formData.rol}
              onChange={handleRoleChange}
              label="Rol"
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.rol && (
              <Box sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: 0.5 }}>
                {errors.rol}
              </Box>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear Usuario'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
