import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Intercepter la requete et ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Gestion des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    // Token expiré ou invalide
    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    // Accès refusé
    if (status === 403) {
      console.error('Accès refusé à cette ressource.')
    }

    // Ressource introuvable
    if (status === 404) {
      console.error('Ressource introuvable.')
    }

    // Erreur serveur
    if (status === 500) {
      console.error('Erreur interne du serveur.')
    }

    return Promise.reject(error)
  }
)

export default api