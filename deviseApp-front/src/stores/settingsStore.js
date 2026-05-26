import { defineStore } from 'pinia'
import { ref } from 'vue'
import settingsService from '@/services/settings'

export const useSettingsStore = defineStore('settings', () => {
  const company = ref({
    name: '', address: '', phone: '', email: '',
    website: '', siret: '', logo: '', footer: '',
  })
  const loading = ref(false)
  const errors  = ref({})

  async function fetch() {
    try {
      const res     = await settingsService.get()
      company.value = res.data.data
    } catch {
      //
    }
  }

  async function save(data) {
    loading.value = true
    errors.value  = {}
    try {
      const res     = await settingsService.update(data)
      company.value = res.data.data
      return true
    } catch (e) {
      if (e.response?.data?.errors) errors.value = e.response.data.errors
      return false
    } finally {
      loading.value = false
    }
  }

  return { company, loading, errors, fetch, save }
})
