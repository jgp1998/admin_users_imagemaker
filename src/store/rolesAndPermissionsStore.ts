import { create } from 'zustand';
import { rolesAndPermissionsApi } from '../api';

interface Role {
  id: string;
  rol?: string; // Campo de la API (ADMIN_ROLE, USER_ROLE, SALES_ROLE)
  name: string;
  description?: string;
  permissions: string[]; // Lista de permisos como strings
}

interface RolesAndPermissionsState {
  roles: Role[];
  permissionsByRole: Map<string, string[]>; // rol -> permissions[]
  uniquePermissions: string[]; // Todos los permisos únicos
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean;
  fetchRoles: () => Promise<void>;
  fetchPermissions: () => Promise<void>;
  fetch: () => Promise<void>; // Fetch both roles and permissions
}

export const useRolesAndPermissionsStore = create<RolesAndPermissionsState>((set) => ({
  roles: [],
  permissionsByRole: new Map(),
  uniquePermissions: [],
  isLoading: false,
  error: null,
  hasLoaded: false,

  fetchRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesAndPermissionsApi.getRoles();
      
      // Transform API response
      const transformedRoles: Role[] = response.roles.map((role) => ({
        id: role._id,
        rol: role.rol,
        name: role.name,
        description: role.name,
        permissions: [], // Will be populated by fetchPermissions
      }));

      set({
        roles: transformedRoles,
        isLoading: false,
        hasLoaded: true,
      });
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Fallback a datos mock
      const mockRoles: Role[] = [
        {
          id: '6562179ab537f4d9a111e621',
          rol: 'USER_ROLE',
          name: 'Usuario',
          description: 'Usuario estándar del sistema',
          permissions: ['USER_LIST', 'USER_FILTER', 'USER_DETAILED', 'USER_EDIT'],
        },
        {
          id: '6562179ab537f4d9a111e622',
          rol: 'SALES_ROLE',
          name: 'Ventas',
          description: 'Role de vendedor',
          permissions: ['USER_LIST', 'USER_DETAILED', 'USER_FILTER'],
        },
        {
          id: '6562179ab537f4d9a111e623',
          rol: 'ADMIN_ROLE',
          name: 'Administrador',
          description: 'Administrador del sistema',
          permissions: [
            'USER_LIST',
            'USER_DETAILED',
            'USER_FILTER',
            'USER_ADD_ADMIN',
            'USER_EDIT',
            'USER_DELETE',
          ],
        },
      ];

      set({
        roles: mockRoles,
        isLoading: false,
        hasLoaded: true,
        error: 'Error fetching roles, using mock data',
      });
    }
  },

  fetchPermissions: async () => {
    try {
      const response = await rolesAndPermissionsApi.getPermissions();

      // Build map of permissions by role
      const permissionsByRole = new Map<string, string[]>();
      const allPermissions = new Set<string>();

      response.permissions.forEach((permItem) => {
        permissionsByRole.set(permItem.rol, permItem.permissions);
        permItem.permissions.forEach((p) => allPermissions.add(p));
      });

      set((state) => {
        // Update roles with their permissions from the permissions response
        const updatedRoles = state.roles.map((role) => ({
          ...role,
          permissions: permissionsByRole.get(role.rol || '') || [],
        }));

        return {
          roles: updatedRoles,
          permissionsByRole,
          uniquePermissions: Array.from(allPermissions).sort(),
          hasLoaded: true,
        };
      });
    } catch (error) {
      console.error('Error fetching permissions:', error);
      // Keep existing roles or use mock data
      set((state) => {
        if (state.roles.length === 0) {
          const mockRoles: Role[] = [
            {
              id: '6562179ab537f4d9a111e621',
              rol: 'USER_ROLE',
              name: 'Usuario',
              description: 'Usuario estándar del sistema',
              permissions: ['USER_LIST', 'USER_FILTER', 'USER_DETAILED', 'USER_EDIT'],
            },
            {
              id: '6562179ab537f4d9a111e622',
              rol: 'SALES_ROLE',
              name: 'Ventas',
              description: 'Role de vendedor',
              permissions: ['USER_LIST', 'USER_DETAILED', 'USER_FILTER'],
            },
            {
              id: '6562179ab537f4d9a111e623',
              rol: 'ADMIN_ROLE',
              name: 'Administrador',
              description: 'Administrador del sistema',
              permissions: [
                'USER_LIST',
                'USER_DETAILED',
                'USER_FILTER',
                'USER_ADD_ADMIN',
                'USER_EDIT',
                'USER_DELETE',
              ],
            },
          ];

          return {
            roles: mockRoles,
            hasLoaded: true,
            error: 'Error fetching permissions, using mock data',
          };
        }

        return {
          hasLoaded: true,
          error: 'Error fetching permissions',
        };
      });
    }
  },

  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch roles and permissions in parallel
      await Promise.all([
        (async () => {
          const response = await rolesAndPermissionsApi.getRoles();
          return response.roles.map((role) => ({
            id: role._id,
            rol: role.rol,
            name: role.name,
            description: role.name,
            permissions: [],
          }));
        })(),
        (async () => {
          const response = await rolesAndPermissionsApi.getPermissions();
          return response.permissions;
        })(),
      ]).then(([roles, permissionsData]) => {
        // Build map of permissions by role
        const permissionsByRole = new Map<string, string[]>();
        const allPermissions = new Set<string>();

        permissionsData.forEach((permItem) => {
          permissionsByRole.set(permItem.rol, permItem.permissions);
          permItem.permissions.forEach((p) => allPermissions.add(p));
        });

        // Update roles with their permissions
        const updatedRoles: Role[] = roles.map((role) => ({
          ...role,
          permissions: permissionsByRole.get(role.rol || '') || [],
        }));

        set({
          roles: updatedRoles,
          permissionsByRole,
          uniquePermissions: Array.from(allPermissions).sort(),
          isLoading: false,
          hasLoaded: true,
        });
      });
    } catch (error) {
      console.error('Error fetching roles and permissions:', error);
      // Fallback to mock data
      const mockRoles: Role[] = [
        {
          id: '6562179ab537f4d9a111e621',
          rol: 'USER_ROLE',
          name: 'Usuario',
          description: 'Usuario estándar del sistema',
          permissions: ['USER_LIST', 'USER_FILTER', 'USER_DETAILED', 'USER_EDIT'],
        },
        {
          id: '6562179ab537f4d9a111e622',
          rol: 'SALES_ROLE',
          name: 'Ventas',
          description: 'Role de vendedor',
          permissions: ['USER_LIST', 'USER_DETAILED', 'USER_FILTER'],
        },
        {
          id: '6562179ab537f4d9a111e623',
          rol: 'ADMIN_ROLE',
          name: 'Administrador',
          description: 'Administrador del sistema',
          permissions: [
            'USER_LIST',
            'USER_DETAILED',
            'USER_FILTER',
            'USER_ADD_ADMIN',
            'USER_EDIT',
            'USER_DELETE',
          ],
        },
      ];

      set({
        roles: mockRoles,
        isLoading: false,
        hasLoaded: true,
        error: 'Error fetching data, using mock data',
      });
    }
  },
}));


