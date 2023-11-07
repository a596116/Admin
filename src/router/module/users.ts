import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: '用戶管理',
      icon: 'user',
    },
  },
  children: [
    /**
     * @description: User
     */
    {
      name: 'admin/user',
      path: 'user/',
      component: () => import('@/views/User/User.vue'),
      meta: {
        menu: { title: '用戶' },
        permission: 'view',
        number: 2,
      },
      props: (route) => ({ id: route.params.id || 1 }),
    },
    {
      name: 'admin/user/view',
      path: 'user/:id?',
      component: () => import('@/views/User/UserManage.vue'),
      meta: {
        menu: { title: '用戶', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/userManage',
      path: 'user/edit/:id?',
      component: () => import('@/views/User/UserManage.vue'),
      meta: {
        menu: { title: '編輯用戶', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },

    /**
     * @description: Roles
     */
    {
      name: 'admin/role',
      path: 'role/',
      component: () => import('@/views/User/Role.vue'),
      meta: {
        menu: { title: '角色管理' },
        permission: 'view',
        number: 2,
      },
    },
    {
      name: 'admin/role/view',
      path: 'role/:id?',
      component: () => import('@/views/User/RoleManage.vue'),
      meta: {
        menu: { title: '角色管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/role/create',
      path: 'role/create/',
      component: () => import('@/views/User/RoleManage.vue'),
      meta: {
        menu: { title: '新增角色管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'create',
      },
    },
    {
      name: 'admin/role/edit',
      path: 'role/edit/:id?',
      component: () => import('@/views/User/RoleManage.vue'),
      meta: {
        menu: { title: '編輯角色管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },

    /**
     * @description: Permissions
     */
    {
      name: 'admin/permission',
      path: 'permission/',
      component: () => import('@/views/User/Permission.vue'),
      meta: {
        menu: { title: '權限管理' },
        permission: 'view',
        number: 2,
      },
    },
    {
      name: 'admin/permission/view',
      path: 'permission/:id?',
      component: () => import('@/views/User/PermissionManage.vue'),
      meta: {
        menu: { title: '權限管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/permission/create',
      path: 'permission/create/',
      component: () => import('@/views/User/PermissionManage.vue'),
      meta: {
        menu: { title: '新增權限管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'create',
      },
    },
    {
      name: 'admin/permission/edit',
      path: 'permission/edit/:id?',
      component: () => import('@/views/User/PermissionManage.vue'),
      meta: {
        menu: { title: '編輯權限管理', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },
  ],
} as { page: any; children: RouteRecordRaw[] }
