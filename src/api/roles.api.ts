import type { PermissionsListResponse, Role, RolesListResponse } from '../types';
import apiClient from './client';

export const rolesAndPermissionsApi = {
  /**
   * Obtener lista de roles
   */
  getRoles: async (): Promise<RolesListResponse> => {
    const { data } = await apiClient.get<RolesListResponse>('/roles');
    return data;
  },

  /**
   * Obtener lista de permisos por rol
   */
  getPermissions: async (): Promise<PermissionsListResponse> => {
    const { data } = await apiClient.get<PermissionsListResponse>('/permissions');
    return data;
  },

  /**
   * Obtener detalles de un rol específico
   */
  getRoleById: async (id: string): Promise<Role> => {
    const { data } = await apiClient.get<Role>(`/roles/${id}`);
    return data;
  },

  /**
   * Crear nuevo rol
   */
  createRole: async (role: Omit<Role, 'id'>): Promise<Role> => {
    const { data } = await apiClient.post<Role>('/roles', role);
    return data;
  },

  /**
   * Actualizar rol
   */
  updateRole: async (id: string, role: Partial<Role>): Promise<Role> => {
    const { data } = await apiClient.put<Role>(`/roles/${id}`, role);
    return data;
  },

  /**
   * Eliminar rol
   */
  deleteRole: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ message: string }>(`/roles/${id}`);
    return data;
  },
};

export default rolesAndPermissionsApi;

