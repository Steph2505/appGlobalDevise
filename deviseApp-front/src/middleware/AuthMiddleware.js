import { useAuthStore } from '@/stores/authStore'

//Middleware qui vérifie si l'utilisateur est connecté
export function authMiddleware(to, from) {
  const authStore = useAuthStore()

  // Je verifie si la route nécessite une authentification
  const requiresAuth = to.meta.requiresAuth

  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  if (requiresGuest && authStore.isAuthenticated) {
    return { path: '/devise' }
  }

  return true
}
