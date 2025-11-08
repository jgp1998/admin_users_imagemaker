// Tipos de usuario
export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
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
  role: 'admin' | 'editor' | 'viewer';
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  role?: 'admin' | 'editor' | 'viewer';
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
