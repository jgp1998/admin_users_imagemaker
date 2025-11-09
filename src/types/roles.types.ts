import type { UserRole } from "./user.types";

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  rol?: string; // Campo de la API
}

export interface RoleApiResponse {
  _id: string;
  rol: string;
  name: string;
}

export interface PermissionApiResponse {
  _id: string;
  rol: string;
  permissions: string[];
}

export interface RolesListResponse {
  totalRoles: number;
  roles: RoleApiResponse[];
}

export interface PermissionsListResponse {
  totalPermissions: number;
  permissions: PermissionApiResponse[];
}


export const ROLES: Record<UserRole, UserRole> = {
  admin: 'admin',
  editor: 'editor',
  viewer: 'viewer',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  editor: 2,
  viewer: 1,
};
