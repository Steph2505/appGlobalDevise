import api from './api'

export default {

  /**
   * Connexion d'un utilisateur existant
   * @param {Object} data - { email, password }
   */
  login(data) {
    console.log('Tentative de connexion avec :', data, api)
    return api.post('/login', data)
  },


  logout() {
    return api.post('/auth/logout')
  },


  me() {
    return api.get('/auth/me')
  },
}