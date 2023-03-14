import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import skeletonDetails from '@/App.vue';
import { routes as routeChild } from '@/core/utils'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/thank-you',
    component: skeletonDetails,
    children: routeChild,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return scrollTo({ top: 0 })
  }
})

export default router
