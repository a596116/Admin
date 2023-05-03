import type { RouteRecordRaw } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'admin',
        redirect: '/home',
        component: () => import('@/layouts/admin.vue'),

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { guest: true },
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('../views/Login.vue'),
        meta: { guest: true },
    },
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('../views/error/404.vue'),
    },
] as RouteRecordRaw[]