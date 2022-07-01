import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/Error/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '404',
    },
  },
]

export default routes
