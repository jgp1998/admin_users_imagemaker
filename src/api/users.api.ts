import apiClient from './client';
import type { UserDto } from '../types';

interface UsersListRequest {
  page?: number;
  limit?: number;
}

interface UserApiResponse {
  permissions: string[];
  name: string;
  email: string;
  img?: string;
  rol: string;
  state: boolean;
  google?: boolean;
  uid: string;
}

interface UsersListResponse {
  totalUsers: number;
  users: UserApiResponse[];
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  img?: string;
  rol: string;
  state?: boolean;
  google?: boolean;
}

interface CreateUserResponse {
  msj: string;
  user: UserApiResponse;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  img?: string;
  rol?: string;
  state?: boolean;
  google?: boolean;
}

interface DeleteUserResponse {
  msj: string;
}

export const usersApi = {
  /**
   * Obtener lista de usuarios con paginación
   */
  getUsers: async (params?: UsersListRequest): Promise<UsersListResponse> => {
    const { data } = await apiClient.get<UsersListResponse>('/users', {
      params: {
        page: params?.page || 0,
        limit: params?.limit || 15,
      },
    });
    return data;
  },

  /**
   * Obtener detalles de un usuario
   */
  getUserById: async (uid: string): Promise<UserDto> => {
    const { data } = await apiClient.get<UserDto>(`/users/${uid}`);
    return data;
  },

  /**
   * Crear nuevo usuario
   */
  createUser: async (user: CreateUserRequest): Promise<CreateUserResponse> => {
    const { data } = await apiClient.post<CreateUserResponse>('/users/user', user);
    return data;
  },

  /**
   * Actualizar usuario
   */
  updateUser: async (uid: string, updates: UpdateUserRequest): Promise<UserDto> => {
    const { data } = await apiClient.put<UserDto>(`/users/${uid}`, updates);
    return data;
  },

  /**
   * Eliminar usuario
   */
  deleteUser: async (uid: string): Promise<DeleteUserResponse> => {
    const { data } = await apiClient.delete<DeleteUserResponse>(`/users/${uid}`);
    return data;
  },

  /**
   * Buscar usuarios
   */
  searchUsers: async (query: string, page?: number): Promise<UsersListResponse> => {
    const { data } = await apiClient.get<UsersListResponse>('/users', {
      params: {
        search: query,
        page: page || 0,
        limit: 15,
      },
    });
    return data;
  },
};

export default usersApi;
