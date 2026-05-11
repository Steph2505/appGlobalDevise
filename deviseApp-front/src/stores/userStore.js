import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import userService from '@/services/user'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const selectedUser = ref(null)
  const loading = ref(false)
  const errors = ref({})
  const accessRight = ref([])

  const allUsers = computed(() => users.value)
  const totalUsers = computed(() => users.value.length)
  const isLoading = computed(() => loading.value)

  // get users
  async function fetchAll() {
    loading.value = true
    errors.value  = {}
    try {
      const response = await userService.getAll()
        const result = response.data.data
        users.value = Array.isArray(result) ? result : result.data ?? []
      
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  //show user
  async function fetchOne(id) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await userService.getOne(id)
      selectedUser.value = response.data.data
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  //getCreate user
  async function getCreate() {
    loading.value = true
    try {
        const response = await userService.getCreate()
        const result = response.data
        
        accessRight.value = Array.isArray(result) ? result : result.data ?? []
        
        return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // store user
  async function create(data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await userService.create(data)
      users.value.push(response.data.data)
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // update user
  async function update(id, data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await userService.update(id, data)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response.data.data
      }
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // update password
  async function updatePassword(id, data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await userService.updatePassword(id, data)
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // delete user
  async function remove(id) {
    loading.value = true
    errors.value  = {}
    try {
      await userService.delete(id)
      users.value = users.value.filter(u => u.id !== id)
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  //vider 
  function clearSelected() {
    selectedUser.value = null
  }

  function ResponseError(error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else if (error.response?.data?.message) {
      errors.value = { general: error.response.data.message }
    }
  }

  return {
    users, selectedUser, loading, errors, accessRight,
    allUsers, totalUsers, isLoading,
    fetchAll, fetchOne, create, update, getCreate, updatePassword, remove, clearSelected,
  }
})