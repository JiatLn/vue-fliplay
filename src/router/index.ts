// import useUserStore from '@/store/modules/useUserStore';
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./modules/*.ts')

for (const path in modules)
  routes.push(...modules[path].default)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    else {
      return { top: 0 }
    }
  },
})

// 全局路由登录拦截
router.beforeEach((to, from, next) => {
  // const userStroe = useUserStore();
  // const isLogin = userStroe.isLogin();
  // if (to.meta.needLogin && !isLogin) {
  //   next({ name: 'Login' });
  // } else if (to.name === 'Login' && isLogin) {
  //   next({ name: 'Home' });
  // }
  next()
})

export default router
