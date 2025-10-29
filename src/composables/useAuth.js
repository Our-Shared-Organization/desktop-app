import { ref, computed } from 'vue'
import { invoke } from '@tauri-apps/api/core'

// Auth state
const isAuthenticated = ref(false)
const userInfo = ref(null)
const authToken = ref(null)
const isLoading = ref(false)

export function useAuth() {
  /**
   * Login with credentials
   */
  const login = async (username, password) => {
    isLoading.value = true
    try {
      const response = await invoke('authenticate', {
        login: username,
        password: password
      })
      
      // Token is automatically saved to Stronghold by the backend
      authToken.value = response.token
      userInfo.value = {
        userLogin: response.userLogin,
        userName: response.userName,
        role: response.role
      }
      isAuthenticated.value = true
      
      return { success: true, data: response }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout and clear stored credentials
   */
  const logout = async () => {
    try {
      await invoke('logout')
      isAuthenticated.value = false
      userInfo.value = null
      authToken.value = null
      return { success: true }
    } catch (error) {
      console.error('Logout failed:', error)
      return { success: false, error: error }
    }
  }

  /**
   * Check if user is authenticated (has stored token)
   */
  const checkAuth = async () => {
    try {
      const authenticated = await invoke('is_authenticated')
      isAuthenticated.value = authenticated
      
      if (authenticated) {
        // Load user info from Stronghold
        const info = await invoke('get_user_info')
        userInfo.value = info
        
        // Get token for API calls
        const token = await invoke('get_auth_token')
        authToken.value = token
      }
      
      return authenticated
    } catch (error) {
      console.error('Auth check failed:', error)
      isAuthenticated.value = false
      return false
    }
  }

  /**
   * Get the stored auth token for API requests
   */
  const getToken = async () => {
    try {
      if (authToken.value) {
        return authToken.value
      }
      const token = await invoke('get_auth_token')
      authToken.value = token
      return token
    } catch (error) {
      console.error('Failed to get token:', error)
      return null
    }
  }

  /**
   * Make an authenticated API request
   */
  const authenticatedFetch = async (url, options = {}) => {
    try {
      const token = await getToken()
      if (!token) {
        throw new Error('No authentication token available')
      }

      const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const response = await fetch(url, {
        ...options,
        headers
      })

      if (response.status === 401) {
        // Token might be expired, logout
        await logout()
        throw new Error('Authentication expired')
      }

      return response
    } catch (error) {
      console.error('Authenticated request failed:', error)
      throw error
    }
  }

  return {
    // State
    isAuthenticated: computed(() => isAuthenticated.value),
    userInfo: computed(() => userInfo.value),
    isLoading: computed(() => isLoading.value),
    
    // Methods
    login,
    logout,
    checkAuth,
    getToken,
    authenticatedFetch
  }
}
