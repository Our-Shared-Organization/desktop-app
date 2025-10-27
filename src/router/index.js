import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import SignInView from '@/views/SignInView.vue'
import MainServiceView from '@/views/MainServiceView.vue'
import MainUsersView from '@/views/MainUsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/sign-in',
      component: SignInView,
    },
    {
      path: '/main-service',
      component: MainServiceView,
    },
    {
      path: '/main-users',
      component: MainUsersView,
    },
  ],
});

export default router