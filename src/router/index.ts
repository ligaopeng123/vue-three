import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/search',
      name: 'search',
      component: import('../views/SearchInputView.vue')
    },
    {
      path: '/threejs',
      name: 'threejs',
      component: () => import('../views/ThreeDemoView.vue')
    }
  ]
})

export default router
