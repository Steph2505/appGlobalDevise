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

  update(id, data) {
    return api.put(`/users/${id}`, data)
  },

  delete(id) {
    return api.delete(`/users/${id}`)
  },
}