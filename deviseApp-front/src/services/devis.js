import api from './api'

export default {
  getAll(){ 
    return api.get('/devis') 
  },

  getOne(id){ 
    return api.get(`/devis/${id}`) 
  },

  create(data){ 
    return api.post('/devis', data)
  },
  
  update(id, data){ 
    return api.put(`/devis/${id}`, data) 
  },

  delete(id){
     return api.delete(`/devis/${id}`) 
  },
}
