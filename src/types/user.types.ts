
export type UserRole = 'admin' | 'editor' | 'viewer';

// Tipos de usuario
export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  claims: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface AssignClaimsPayload {
  userId: string;
  claims: string[];
}

export interface UserListResponse {
  data: UserDto[];
  total: number;
  page: number;
  pageSize: number;
}


export interface UsersListRequest {
  page?: number;
  limit?: number;
}

export interface UserApiResponse {
  id: string;
  name: string;
  email: string;
  rol: string;
  permissions: string[];
  state?: boolean;
  img?: string;
  google?: boolean;
  uid?: string;
}

export interface UsersListResponse {
  totalUsers: number;
  users: UserApiResponse[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  img?: string;
  rol: string;
  state?: boolean;
  google?: boolean;
}

export interface CreateUserResponse {
  msj: string;
  user: UserApiResponse;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  img?: string;
  rol?: string;
  state?: boolean;
  google?: boolean;
}

export interface DeleteUserResponse {
  msj: string;
}

export interface UserMetrics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminCount: number;
  vendedorCount: number;
  usuarioCount: number;
  activePercentage: number;
  permissions: {
    total: number;
    unique: Set<string>;
  };
  users: UserDto[];
}
