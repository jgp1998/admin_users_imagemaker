import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormControlLabel,
  Switch,
  Chip,
  Typography,
} from '@mui/material';
import type { UserDto } from '../types';

interface EditUserModalProps {
  open: boolean;
  user: UserDto | null;
  onClose: () => void;
  onSave: (user: Partial<UserDto>) => Promise<void>;
  isLoading?: boolean;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<UserDto>>({
    name: '',
    email: '',
    role: 'viewer',
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos del usuario cuando se abre el modal
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
      setErrors({});
    }
  }, [user, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.role) {
      newErrors.role = 'El rol es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
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
  };

  const handleToggleActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      // El error se maneja en el componente padre
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Nombre */}
          <TextField
            label="Nombre"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
          />

          {/* Rol */}
          <FormControl fullWidth error={!!errors.role} disabled={isLoading}>
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              value={formData.role || 'viewer'}
              onChange={handleChange as any}
              label="Rol"
            >
              <MenuItem value="admin">Administrador (ADMIN_ROLE)</MenuItem>
              <MenuItem value="editor">Vendedor (SALES_ROLE)</MenuItem>
              <MenuItem value="viewer">Usuario (USER_ROLE)</MenuItem>
            </Select>
          </FormControl>

          {/* Estado */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 1.5,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
          }}>
            <Typography sx={{ fontWeight: 500 }}>Estado del usuario</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive || false}
                  onChange={handleToggleActive}
                  disabled={isLoading}
                />
              }
              label={formData.isActive ? 'Activo' : 'Inactivo'}
              sx={{ m: 0 }}
            />
          </Box>

          {/* Permisos */}
          {user?.claims && user.claims.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>
                Permisos del usuario:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.claims.map((permission) => (
                  <Chip
                    key={permission}
                    label={permission}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
