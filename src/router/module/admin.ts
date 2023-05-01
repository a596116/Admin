import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Dashboard',
      icon: 'Dashboard',
    },
  },
  children: [
    {
      name: 'admin/home',
      path: '/admin',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        menu: { title: '工作台' }
        , number: 1,
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
