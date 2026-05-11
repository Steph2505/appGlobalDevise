import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const loading = ref(false)
  const errors = ref({})

  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const isLoading = computed(() => loading.value)
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  // login user
  async function login(data) {
    loading.value = true
    errors.value = {}
    try {
      const response = await authService.login(data)
      _setSession(response.data.data)
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // logout user
  async function logout() {
    loading.value = true
    try {
      await authService.logout()
    } catch (_) {
      // On déconnecte quoi qu'il arrive
    } finally {
      _clearSession()
      loading.value = false
    }
  }

  // show
  async function fetchMe() {
    loading.value = true
    try {
      const response = await authService.me()
      user.value = response.data.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

function permission({ permission }) {

    if (!user || !user.value.access_rights) {
        return false
    }

    return user.value.access_rights.some((right) => {
        return right.name === permission
    })

}

  // je garde le token et les données du user dans le localStorage
  function _setSession({ token: t, user: u }) {
    token.value = t
    user.value = u
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(u))
  }

  // Je vide le localStorage
  function _clearSession() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function ResponseError(error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else if (error.response?.data?.message) {
      errors.value = { general: error.response.data.message }
    }
  }

  function ResponseError(error) {
    const status = error.response?.status

    // Identifiants incorrects
    if (status === 401) {
    errors.value = { general: 'Email ou mot de passe incorrect.' }
    return
    }

    // Erreurs de validation (422)
    if (error.response?.data?.errors) {
    errors.value = error.response.data.errors
    return
    }

    // Message général du backend
    if (error.response?.data?.message) {
    errors.value = { general: error.response.data.message }
    return
    }

    // Erreur inconnue
    errors.value = { general: 'Une erreur est survenue. Réessayez.' }
    }

  return {
    token,
    user,
    loading,
    errors,
    isAuthenticated,
    currentUser,
    isLoading,
    hasErrors,
    permission,
    login,
    logout,
    fetchMe,
  }
})
