import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import SignInView from '@/views/SignInView.vue'
import MainServiceView from '@/views/MainServiceView.vue'
import MainUsersView from '@/views/MainUsersView.vue'
import { loadToken, clearToken } from '@/lib/stronghold'
import { isTokenValid } from '@/lib/jwt'

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

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    try {
      const token = await loadToken();
      
      if (!token || !isTokenValid(token)) {
        // Token doesn't exist or is expired, clear it and redirect to sign-in
        if (token) {
          await clearToken();
        }
        next({ name: 'signin', query: { redirect: to.fullPath } });
      } else {
        // Authenticated with valid token, proceed
        next();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      // On error, redirect to sign-in to be safe
      next({ name: 'signin' });
    }
  } else {
    // Route doesn't require auth
    next();
  }
});

export default router