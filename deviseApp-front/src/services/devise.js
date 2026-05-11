import api from './api'

export default {

  getAll() {
    return api.get('/devises')
  },

  getOne(id) {
    return api.get(`/devises/${id}`)
  },

  create(data) {
    return api.post('/devises/store', data)
  },


  update(id, data) {
    return api.put(`/devises/${id}`, data)
  },

 
  delete(id) {
    return api.delete(`/devises/${id}`)
  },
}