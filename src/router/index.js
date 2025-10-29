import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

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
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
    },
    {
      path: '/main-users',
      name: 'users',
      component: MainUsersView,
      meta: { requiresAuth: true }
    },
  ],
});

// Navigation guard to protect routes
router.beforeEach(async (to, from, next) => {
  const { checkAuth } = useAuth()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const authenticated = await checkAuth()
    
    if (!authenticated) {
      // Redirect to sign-in if not authenticated
      next({ name: 'signin' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router