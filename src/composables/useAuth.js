import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

export const useAuth = () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref('')

  const checkAuth = async () => {
    try {
      const authState = await invoke('check_auth')
      if (authState) {
        user.value = {
          login: authState.user_login,
          name: authState.user_name,
          role: authState.role
        }
        token.value = authState.token
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (error) {
      console.error('Error checking auth state:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await invoke('logout')
      user.value = null
      token.value = ''
      isAuthenticated.value = false
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    checkAuth,
    logout
  }
}