import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import devisService from '@/services/devis'

export const useDevisStore = defineStore('devis', () => {

  const devis         = ref([])
  const selectedDevis = ref(null)
  const loading       = ref(false)
  const errors        = ref({})

  const totalDevis      = computed(() => devis.value.length)
  const totalDraftss = computed(() => devis.value.filter(d => d.status === 'Drafts').length)
  const totalValides    = computed(() => devis.value.filter(d => d.status === 'Validated').length)

  async function fetchAll() {
    loading.value = true
    errors.value  = {}
    try {
      const response = await devisService.getAll()
      const result   = response.data.data
      devis.value    = Array.isArray(result) ? result : result.data ?? []
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    loading.value = true
    errors.value  = {}
    try {
      const response   = await devisService.getOne(id)
      selectedDevis.value = response.data.data
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function create(data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await devisService.create(data)
      devis.value.push(response.data.data)
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function update(id, data) {
    loading.value = true
    errors.value  = {}
    try {
      const response = await devisService.update(id, data)
      const index    = devis.value.findIndex(d => d.id === id)
      if (index !== -1) devis.value[index] = response.data.data
      return response.data
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function remove(id) {
    loading.value = true
    errors.value  = {}
    try {
      await devisService.delete(id)
      devis.value = devis.value.filter(d => d.id !== id)
    } catch (error) {
      ResponseError(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function clearSelected() {
    selectedDevis.value = null
  }

  function ResponseError(error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else if (error.response?.data?.message) {
      errors.value = { general: error.response.data.message }
    }
  }

  return {
    devis, selectedDevis, loading, errors,
    totalDevis, totalDraftss, totalValides,
    fetchAll, fetchOne, create, update, remove, clearSelected,
  }
})
