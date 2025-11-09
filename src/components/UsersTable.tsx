import  { useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useUsersStore } from '../store';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../hooks/useToast';
import { EditUserModal } from './EditUserModal';

// Función para formatear el rol
const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    'admin': 'Administrador (ADMIN_ROLE)',
    'editor': 'Vendedor (SALES_ROLE)',
    'viewer': 'Usuario (USER_ROLE)',
  };
  return roleMap[role] || role;
};

const UsersTable = () => {
  const {
    users,
    isLoading,
    fetchUsers,
    deleteUser,
    updateUser,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    hasLoaded,
    setHasLoaded,
    deleteDialogOpen,
    selectedUserId,
    selectedUserName,
    openDeleteDialog,
    closeDeleteDialog,
    editModalOpen,
    selectedUser,
    isEditLoading,
    openEditModal,
    closeEditModal,
    setEditLoading,
  } = useUsersStore();
  
  const { userRole } = useAuthStore();
  const { success, error: showError } = useToast();

  // Permisos basados en rol
  const canCreate = userRole === 'admin';
  const canEdit = userRole === 'admin' || userRole === 'editor';
  const canDelete = userRole === 'admin';

  // Cargar usuarios solo una vez al montar el componente
  useEffect(() => {
    if (hasLoaded) return; // Evitar cargas múltiples

    const loadUsers = async () => {
      try {
        await fetchUsers();
        setHasLoaded(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar usuarios';
        showError(errorMessage);
      }
    };

    loadUsers();
  }, []); // Sin dependencias para evitar loop infinito
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (userId: string, userName: string) => {
    openDeleteDialog(userId, userName);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId);
      success(`Usuario ${selectedUserName} desactivado exitosamente`);
      closeDeleteDialog();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al desactivar usuario';
      showError(errorMessage);
    }
  };

  const handleDeleteCancel = () => {
    closeDeleteDialog();
  };

  const handleEditClick = (user: any) => {
    openEditModal(user);
  };

  const handleEditClose = () => {
    closeEditModal();
  };

  const handleEditSave = async (updatedData: any) => {
    if (!selectedUser) return;

    try {
      setEditLoading(true);
      await updateUser(selectedUser.id, updatedData);
      success(`Usuario ${updatedData.name} actualizado exitosamente`);
      handleEditClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar usuario';
      showError(errorMessage);
    } finally {
      setEditLoading(false);
    }
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
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 600 }}>
            Lista de usuarios
          </h2>
        </Box>
        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => console.log('Agregar nuevo usuario')}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            }}
          >
            Agregar usuario
          </Button>
        )}
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
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
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxHeight: { xs: '400px', sm: '600px', md: '800px' },
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <p>No hay usuarios registrados</p>
          </Box>
        ) : (
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', width: { xs: '30%', sm: '25%', md: '20%' } }}>
                  Nombres y apellidos
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', width: { xs: '30%', sm: '25%', md: '25%' }, display: { xs: 'none', sm: 'table-cell' } }}>
                  Correo
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', width: { xs: '25%', sm: '20%', md: '20%' } }}>
                  Role
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', width: { xs: '0%', sm: '15%', md: '15%' }, display: { xs: 'none', sm: 'table-cell' } }}>
                  Estado
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1a1f3a', textAlign: 'center', width: { xs: '15%', sm: '15%', md: '20%' } }}>
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
                  <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          backgroundColor: getAvatarColor(user.name),
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          minWidth: 36,
                          minHeight: 36,
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span>{formatRole(user.role)}</span>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip
                      label={user.isActive ? 'Activo' : 'Inactivo'}
                      color={user.isActive ? 'success' : 'error'}
                      variant="filled"
                    sx={{
                      backgroundColor: user.isActive ? '#4caf50' : '#f44336',
                      color: '#fff',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    {canEdit && (
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(user)}
                          sx={{ color: '#1976d2' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {canDelete && (
                      <Tooltip title="Desactivar">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(user.id, user.name)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        )}
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
          <span>Fila por página:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(0);
            }}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
          <span>
            {currentPage * rowsPerPage + 1}-
            {Math.min((currentPage + 1) * rowsPerPage, filteredUsers.length)} de{' '}
            {filteredUsers.length}
          </span>
          <Box>
            <Button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{ minWidth: 'auto', p: 0.5, fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
            >
              ‹
            </Button>
            <Button
              disabled={
                (currentPage + 1) * rowsPerPage >= filteredUsers.length
              }
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{ minWidth: 'auto', p: 0.5, fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
            >
              ›
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Desactivar usuario</DialogTitle>
        <DialogContent>
          ¿Está seguro de que desea desactivar este usuario? El usuario seguirá
          registrado en el sistema pero no podrá iniciar sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Desactivar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <EditUserModal
        open={editModalOpen}
        user={selectedUser}
        onClose={handleEditClose}
        onSave={handleEditSave}
        isLoading={isEditLoading}
        userRole={userRole}
      />
    </Box>
  );
};

export default UsersTable;
