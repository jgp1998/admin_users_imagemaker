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
  
  // Acciones
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateUser: (id: string, user: Partial<UserDto>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Datos iniciales para testing
const INITIAL_USERS: UserDto[] = [
  {
    id: '1',
    name: 'Juan García',
    email: 'juan@example.com',
    role: 'admin',
    isActive: true,
    claims: ['view', 'edit', 'delete'],
    createdAt: '2024-01-15',
    updatedAt: '2024-11-08',
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@example.com',
    role: 'editor',
    isActive: true,
    claims: ['view', 'edit'],
    createdAt: '2024-01-20',
    updatedAt: '2024-11-08',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    role: 'viewer',
    isActive: false,
    claims: ['view'],
    createdAt: '2024-02-10',
    updatedAt: '2024-11-08',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana@example.com',
    role: 'editor',
    isActive: true,
    claims: ['view', 'edit'],
    createdAt: '2024-02-15',
    updatedAt: '2024-11-08',
  },
  {
    id: '5',
    name: 'Pedro Sánchez',
    email: 'pedro@example.com',
    role: 'admin',
    isActive: true,
    claims: ['view', 'edit', 'delete'],
    createdAt: '2024-03-01',
    updatedAt: '2024-11-08',
  },
  {
    id: '6',
    name: 'Laura Fernández',
    email: 'laura@example.com',
    role: 'viewer',
    isActive: true,
    claims: ['view'],
    createdAt: '2024-03-10',
    updatedAt: '2024-11-08',
  },
  {
    id: '7',
    name: 'Diego Gómez',
    email: 'diego@example.com',
    role: 'editor',
    isActive: true,
    claims: ['view', 'edit'],
    createdAt: '2024-03-20',
    updatedAt: '2024-11-08',
  },
  {
    id: '8',
    name: 'Sofia Ruiz',
    email: 'sofia@example.com',
    role: 'viewer',
    isActive: false,
    claims: ['view'],
    createdAt: '2024-04-01',
    updatedAt: '2024-11-08',
  },
];

export const useUsersStore = create<UsersState>((set) => ({
  // Estado inicial
  users: INITIAL_USERS,
  isLoading: false,
  error: null,
  searchTerm: '',
  currentPage: 0,
  rowsPerPage: 5,

  // Obtener usuarios
  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await usersApi.getUsers({ page: 0, limit: 15 });
      // Convertir respuesta de API a nuestro tipo
      const users: UserDto[] = response.users.map((user) => ({
        id: user.uid,
        name: user.name,
        email: user.email,
        role: user.rol?.toLowerCase() === 'admin_role' ? 'admin' : 'viewer' as any,
        isActive: user.state !== false,
        claims: user.permissions || [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      }));
      set({ users, isLoading: false });
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
      await usersApi.updateUser(id, updatedData as any);
      
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

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await usersApi.deleteUser(id);
      
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar usuario';
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
}));
