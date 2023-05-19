import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: '用戶管理',
      // icon: 'user',
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
        menu: { title: '用戶', }, permission: 'create', number: 2
      },
      props: (route) => ({ id: route.params.id || 1 })
    },
    {
      name: 'admin/userManage',
      path: 'user/edit/:id?',
      component: () => import('@/views/User/UserManage.vue'),
      meta: {
        menu: { title: '編輯用戶', hidden: true }, permission: 'edit'
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
        menu: { title: '角色管理', }, permission: 'create', number: 2
      },
    },
    {
      name: 'admin/roleCreateManage',
      path: 'role/create/',
      component: () => import('@/views/User/RoleManage.vue'),
      meta: {
        menu: { title: '新增角色管理', hidden: true }, permission: 'create'
      },
    },
    {
      name: 'admin/roleEditManage',
      path: 'role/edit/:id?',
      component: () => import('@/views/User/RoleManage.vue'),
      meta: {
        menu: { title: '編輯角色管理', hidden: true }, permission: 'edit'
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
        menu: { title: '權限管理' }, permission: 'create', number: 2
      },
    },
    {
      name: 'admin/permissionCreateManage',
      path: 'permission/create/',
      component: () => import('@/views/User/PermissionManage.vue'),
      meta: {
        menu: { title: '新增權限管理', hidden: true }, permission: 'create'
      },
    },
    {
      name: 'admin/permissionEditManage',
      path: 'permission/edit/:id?',
      component: () => import('@/views/User/PermissionManage.vue'),
      meta: {
        menu: { title: '編輯權限管理', hidden: true }, permission: 'edit'
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
