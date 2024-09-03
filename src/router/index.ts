import { createRouter, createWebHashHistory } from 'vue-router'
import SearchInputView from '../views/SearchInputView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchInputView
    },
    {
      path: '/threejs',
      name: 'threejs',
      component: () => import('../views/ThreeDemoView.vue')
    }
  ]
})

export default router
