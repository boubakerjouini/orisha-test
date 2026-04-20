import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'residents',
      component: () => import('@/pages/ResidentsPage.vue'),
    },
    {
      path: '/resident/:id',
      name: 'resident-detail',
      component: () => import('@/pages/ResidentDetailPage.vue'),
      props: true,
    },
  ],
})

export default router
