import type { RouteRecordRaw } from 'vue-router'
export default {
  page: {
    auth: true,
    name: 'admin',
    menu: {
      title: 'Member',
      icon: 'Member',
    },
  },
  children: [
    {
      name: 'admin/member/info',
      path: 'member/info',
      component: () => import('@/views/Member.vue'),
      meta: { menu: { title: '用戶資訊', hiddenMenu: true } },
    },
    {
      name: 'admin/member/password',
      path: 'member/password',
      component: () => import('@/views/Member.vue'),
      meta: { menu: { title: '密碼修改', hiddenMenu: true } },
    },
  ],
} as { page: any, children: RouteRecordRaw[] }
