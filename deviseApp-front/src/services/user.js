import api from './api'

export default {

  getAll() {
    return api.get('/users')
  },

  getOne(id) {
    return api.get(`/users/${id}`)
  },

  create(data) {
    return api.post('/users', data)
  },


  getCreate() {
    return api.get('/users/create')
  },

  /**
   * Met à jour un utilisateur existant
   * @param {number} id   - Identifiant de l'utilisateur
   * @param {Object} data - Champs à modifier
   */
  update(id, data) {
    return api.put(`/users/${id}`, data)
  },

  /**
   * Met à jour uniquement le mot de passe d'un utilisateur
   * @param {number} id   - Identifiant de l'utilisateur
   * @param {Object} data - { current_password, password, password_confirmation }
   */
  updatePassword(id, data) {
    return api.put(`/users/${id}/password`, data)
  },

  delete(id) {
    return api.delete(`/users/${id}`)
  },
}