import { createRouter, createWebHistory } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'

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
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/main-service',
      name: 'service',
      component: MainServiceView,
    },
    {
      path: '/main-users',
      name: 'users',
      component: MainUsersView,
    },
  ],
});

export default router