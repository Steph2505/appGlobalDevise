import api from './api'

export default {

  getAll() {
    return api.get('/customers')
  },

  getOne(id) {
    return api.get(`/customers/${id}`)
  },

  create(data) {
    return api.post('/customers/store', data)
  },


  update(id, data) {
    return api.put(`/customers/${id}`, data)
  },

 
  delete(id) {
    return api.delete(`/customers/${id}`)
  },
}