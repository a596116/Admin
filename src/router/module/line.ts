import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Line',
      icon: 'line',
    },
  },
  children: [
    /**
     * @description: line user
     */
    {
      name: 'admin/lineUser',
      path: 'lineUser/',
      component: () => import('@/views/Line/LineUser.vue'),
      meta: {
        menu: { title: 'Line用戶' },
        permission: 'view',
        number: 3,
      },
      props: (route) => ({ id: route.params.id || 1 }),
    },
    {
      name: 'admin/lineUser/view',
      path: 'lineUser/:id?',
      component: () => import('@/views/Line/LineUserManage.vue'),
      meta: {
        menu: { title: 'Line用戶', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/lineUserManage',
      path: 'lineUser/edit/:id?',
      component: () => import('@/views/Line/LineUserManage.vue'),
      meta: {
        menu: { title: '編輯Line用戶', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },
    /**
     * @description: nike
     */
    {
      name: 'admin/nike',
      path: 'nike/',
      component: () => import('@/views/Line/Nike.vue'),
      meta: {
        menu: { title: 'Nike發售預告' },
        permission: 'view',
        number: 3,
      },
      props: (route) => ({ id: route.params.id || 1 }),
    },
    {
      name: 'admin/nike/view',
      path: 'nike/:id?',
      component: () => import('@/views/Line/NikeManage.vue'),
      meta: {
        menu: { title: 'Nike發售預告', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/nikeManage',
      path: 'nike/edit/:id?',
      component: () => import('@/views/Line/NikeManage.vue'),
      meta: {
        menu: { title: '編輯Nike發售預告', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },
    /**
     * @description: hypebeast
     */
    {
      name: 'admin/hypebeast',
      path: 'hypebeast/',
      component: () => import('@/views/Line/HypeBeast.vue'),
      meta: {
        menu: { title: 'HypeBeast球鞋資訊' },
        permission: 'view',
        number: 3,
      },
      props: (route) => ({ id: route.params.id || 1 }),
    },
    {
      name: 'admin/hypebeast/view',
      path: 'hypebeast/:id?',
      component: () => import('@/views/Line/HypeBeastManage.vue'),
      meta: {
        menu: { title: 'HypeBeast球鞋資訊', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/hypebeastManage',
      path: 'hypebeast/edit/:id?',
      component: () => import('@/views/Line/HypeBeastManage.vue'),
      meta: {
        menu: { title: '編輯HypeBeast球鞋資訊', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },
    /**
     * @description: ithome
     */
    {
      name: 'admin/ithome',
      path: 'ithome/',
      component: () => import('@/views/Line/IThome.vue'),
      meta: {
        menu: { title: 'IThome資訊' },
        permission: 'view',
        number: 3,
      },
      props: (route) => ({ id: route.params.id || 1 }),
    },
    {
      name: 'admin/ithome/view',
      path: 'ithome/:id?',
      component: () => import('@/views/Line/IThomeManage.vue'),
      meta: {
        menu: { title: 'IThome資訊', hiddenMenu: true, hiddenHistory: true },
        permission: 'view',
      },
    },
    {
      name: 'admin/ithomeManage',
      path: 'ithome/edit/:id?',
      component: () => import('@/views/Line/IThomeManage.vue'),
      meta: {
        menu: { title: '編輯IThome資訊', hiddenMenu: true, hiddenHistory: true },
        permission: 'edit',
      },
    },
  ],
} as { page: any; children: RouteRecordRaw[] }
