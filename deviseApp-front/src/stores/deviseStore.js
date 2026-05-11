import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import deviseService from '@/services/devise'

export const useDeviseStore = defineStore('devise', () => {

  const devises = ref([])
  const selectedDevise = ref(null)
  const loading = ref(false)
  const errors = ref({})

  const activeDevises = computed(() => devises.value.filter(c => c.is_active))
  const totalDevises  = computed(() => devises.value.length)
  const totalActives  = computed(() => activeDevises.value.length)
  const isLoading = computed(() => loading.value)


  // Récupérer toutes les devises
  async function fetchAll() {
    loading.value = true
    errors.value  = {}
    try {
        const response = await deviseService.getAll()
        console.log('Réponse  :', response.data)
        const result = response.data.data

        devises.value = Array.isArray(result) ? result : result.data ?? []

        return response.data
    } catch (error) {
        ResponseError(error)
        throw error
    } finally {
        loading.value = false
    }
  }

  // Show une devise
  async function fetchOne(id) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await deviseService.getOne(id)
      selectedDevise.value = response.data.data
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Store une devise
  async function create(data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await deviseService.create(data)
      devises.value.push(response.data.data)
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // Update une devise
  async function update(id, data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await deviseService.update(id, data)
      const index = devises.value.findIndex(c => c.id === id)
      if (index !== -1) {
        devises.value[index] = response.data.data
      }
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // Supprimer une devise
  async function remove(id) {
    loading.value = true
    errors.value  = {}
    try {
      await deviseService.delete(id)
      devises.value = devises.value.filter(c => c.id !== id)
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  // rénitialiser la devise
  function clearSelected() {
    selectedDevise.value = null
  }


  function ResponseError(error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else if (error.response?.data?.message) {
      errors.value = { general: error.response.data.message }
    }
  }

    return {
    // Expose devises directement (pas allDevises)
    devises,          // ← ref([]) directement
    selectedDevise,
    loading,
    errors,
    totalDevises,
    totalActives,
    activeDevises,
    isLoading,
    fetchAll, fetchOne, create, update, remove, clearSelected,
    }
})