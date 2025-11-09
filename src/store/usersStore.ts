import { create } from 'zustand';
import type { UserDto } from '../types';
import { usersApi } from '../api';

interface UsersState {
  users: UserDto[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  rowsPerPage: number;
  hasLoaded: boolean;
  
  // Estados del Modal de Edición
  editModalOpen: boolean;
  selectedUser: UserDto | null;
  isEditLoading: boolean;
  
  // Estados del Diálogo de Eliminación
  deleteDialogOpen: boolean;
  selectedUserId: string | null;
  selectedUserName: string | null;
  
  // Acciones
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateUser: (id: string, user: Partial<UserDto>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  invalidateCache: () => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setHasLoaded: (loaded: boolean) => void;
  
  // Acciones del Modal de Edición
  openEditModal: (user: UserDto) => void;
  closeEditModal: () => void;
  setEditLoading: (loading: boolean) => void;
  
  // Acciones del Diálogo de Eliminación
  openDeleteDialog: (userId: string, userName: string) => void;
  closeDeleteDialog: () => void;
}

// Datos iniciales vacíos (se cargarán desde la API)
const INITIAL_USERS: UserDto[] = [];

export const useUsersStore = create<UsersState>((set) => ({
  // Estado inicial
  users: INITIAL_USERS,
  isLoading: false,
  error: null,
  searchTerm: '',
  currentPage: 0,
  rowsPerPage: 5,
  hasLoaded: false,
  editModalOpen: false,
  selectedUser: null,
  isEditLoading: false,
  deleteDialogOpen: false,
  selectedUserId: null,
  selectedUserName: null,

  // Obtener usuarios (con paginación automática)
  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const allUsers: UserDto[] = [];
      let page = 0;
      let hasMore = true;
      const pageSize = 50; // Obtener 50 usuarios por página
      
      // Mapeo inverso: API → Frontend
      const apiRoleToAppRole: Record<string, string> = {
        'ADMIN_ROLE': 'admin',
        'SALES_ROLE': 'editor',
        'USER_ROLE': 'viewer',
      };
      
      // Obtener todos los usuarios página por página
      while (hasMore) {
        const response = await usersApi.getUsers({ page, limit: pageSize });
        
        if (response.users.length === 0) {
          hasMore = false;
          break;
        }
        
        // Convertir respuesta de API a nuestro tipo
        const users: UserDto[] = response.users.map((user) => ({
          id: user.uid,
          name: user.name,
          email: user.email,
          role: (apiRoleToAppRole[user.rol] || 'viewer') as any,
          isActive: user.state !== false,
          claims: user.permissions || [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        }));
        
        allUsers.push(...users);
        
        // Si obtuvimos menos usuarios que el pageSize, significa que es la última página
        if (response.users.length < pageSize) {
          hasMore = false;
        }
        
        page++;
      }
      
      set({ users: allUsers, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar usuarios';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Agregar usuario
  addUser: async (user) => {
    try {
      set({ isLoading: true, error: null });
      const response = await usersApi.createUser({
        name: user.name,
        email: user.email,
        password: 'temp123',
        rol: 'USER_ROLE',
        state: user.isActive,
      });
      
      const newUser: UserDto = {
        id: response.user.uid,
        name: response.user.name,
        email: response.user.email,
        role: 'viewer',
        isActive: true,
        claims: response.user.permissions || [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      
      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear usuario';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Actualizar usuario
  updateUser: async (id, updatedData) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mapeo: Frontend → API
      const appRoleToApiRole: Record<string, string> = {
        'admin': 'ADMIN_ROLE',
        'editor': 'SALES_ROLE',
        'viewer': 'USER_ROLE',
      };

      // Mapear datos del frontend al formato de la API
      const apiUpdateData: any = {
        name: updatedData.name,
        email: updatedData.email,
        state: updatedData.isActive !== undefined ? updatedData.isActive : true,
      };

      // Mapear role a rol y convertir formato
      if (updatedData.role) {
        const mappedRole = appRoleToApiRole[updatedData.role];
        if (!mappedRole) {
          throw new Error(`Rol inválido: ${updatedData.role}`);
        }
        apiUpdateData.rol = mappedRole;
      }

      await usersApi.updateUser(id, apiUpdateData);
      
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id 
            ? { 
                ...user, 
                ...updatedData,
                updatedAt: new Date().toISOString().split('T')[0],
              } 
            : user
        ),
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar usuario';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Eliminar usuario (cambiar estado a inactivo)
  deleteUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      // Usar el endpoint DELETE que solo requiere el ID en la URL
      await usersApi.deleteUser(id);
      
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id 
            ? { ...user, isActive: false }
            : user
        ),
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al desactivar usuario';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Búsqueda
  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 0 });
  },

  // Paginación
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setRowsPerPage: (rows) => {
    set({ rowsPerPage: rows, currentPage: 0 });
  },

  // Estado de carga
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  // Error
  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  // Manejo del estado hasLoaded
  setHasLoaded: (loaded) => {
    set({ hasLoaded: loaded });
  },

  // Acciones del Modal de Edición
  openEditModal: (user) => {
    set({ editModalOpen: true, selectedUser: user });
  },

  closeEditModal: () => {
    set({ editModalOpen: false, selectedUser: null, isEditLoading: false });
  },

  setEditLoading: (loading) => {
    set({ isEditLoading: loading });
  },

  // Acciones del Diálogo de Eliminación
  openDeleteDialog: (userId, userName) => {
    set({ deleteDialogOpen: true, selectedUserId: userId, selectedUserName: userName });
  },

  closeDeleteDialog: () => {
    set({ deleteDialogOpen: false, selectedUserId: null, selectedUserName: null });
  },

  // Invalidar cache para forzar recarga de usuarios
  invalidateCache: () => {
    set({ hasLoaded: false });
  },
}));
