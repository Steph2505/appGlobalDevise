
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export function useAuth() {

  // On récupère le store et le router
  const authStore = useAuthStore()
  const router    = useRouter()

  async function login(data) {
    try {
      await authStore.login(data)
      router.push('/devises')
    } catch (error) {
      console.log('Erreur connexion :', error)
    }
  }

  async function logout() {
    try {
      await authStore.logout()
      router.push('/login')
    } catch (error) {
      console.log('Erreur déconnexion :', error)
    }
  }

  return {
    user: authStore.currentUser,
    isAuthenticated: authStore.isAuthenticated,
    loading: authStore.isLoading,
    errors: authStore.errors,
    login,
    logout,
    fetchMe: authStore.fetchMe,
  }
}