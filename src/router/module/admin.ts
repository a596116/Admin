import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: '首頁',
      icon: 'home',
    },
  },
  children: [
    {
      name: 'admin/home',
      path: '/admin',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        menu: { title: '首頁' }
        , number: 1,
      },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
