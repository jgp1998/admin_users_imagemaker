import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Ventas' | 'usuario';
  status: 'Activo' | 'Inactivo';
}

const UsersTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Datos de ejemplo
  const allUsers: User[] = [
    {
      id: '1',
      name: 'Vinci Guerra',
      email: 'admin@gmail.com',
      role: 'Administrador',
      status: 'Activo',
    },
    {
      id: '2',
      name: 'Vinci Guerra',
      email: 'sales@gmail.com',
      role: 'Ventas',
      status: 'Activo',
    },
    {
      id: '3',
      name: 'Vinci Guerra',
      email: 'user@gmail.com',
      role: 'usuario',
      status: 'Activo',
    },
    {
      id: '4',
      name: 'Vinci Guerra',
      email: 'vinci@gmail.com',
      role: 'Administrador',
      status: 'Activo',
    },
    {
      id: '5',
      name: 'Borrar Usuario',
      email: 'borrar3@gmail.com',
      role: 'usuario',
      status: 'Activo',
    },
    {
      id: '6',
      name: 'Usuario Ejemplo',
      email: 'ejemplo@gmail.com',
      role: 'usuario',
      status: 'Activo',
    },
    {
      id: '7',
      name: 'Admin Test',
      email: 'admintest@gmail.com',
      role: 'Administrador',
      status: 'Activo',
    },
    {
      id: '8',
      name: 'Usuario Test',
      email: 'usertest@gmail.com',
      role: 'usuario',
      status: 'Activo',
    },
  ];

  // Filtrar usuarios por búsqueda
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Eliminar usuario:', selectedUserId);
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleEditClick = (userId: string) => {
    console.log('Editar usuario:', userId);
  };

  const handleAddUser = () => {
    console.log('Agregar nuevo usuario');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#667eea',
      '#764ba2',
      '#f093fb',
      '#4facfe',
      '#00f2fe',
      '#43e97b',
      '#fa709a',
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600 }}>
            Lista de usuarios
          </h2>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Agregar usuario
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600, color: '#1a1f3a' }}>
                Nombres y apellidos
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a1f3a' }}>
                Correo
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a1f3a' }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a1f3a' }}>
                Estado
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', textAlign: 'center' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        backgroundColor: getAvatarColor(user.name),
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                    <span>{user.name}</span>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span>{user.role}</span>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color="success"
                    variant="filled"
                    sx={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(user.id)}
                      sx={{ color: '#1976d2' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(user.id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>Fila por página:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setPage(0);
            }}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>
            {page * rowsPerPage + 1}-
            {Math.min((page + 1) * rowsPerPage, filteredUsers.length)} de{' '}
            {filteredUsers.length}
          </span>
          <Box>
            <Button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              sx={{ minWidth: 'auto', p: 0.5 }}
            >
              ‹
            </Button>
            <Button
              disabled={
                (page + 1) * rowsPerPage >= filteredUsers.length
              }
              onClick={() => setPage(page + 1)}
              sx={{ minWidth: 'auto', p: 0.5 }}
            >
              ›
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Está seguro de que desea eliminar este usuario? Esta acción no se
          puede deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;
