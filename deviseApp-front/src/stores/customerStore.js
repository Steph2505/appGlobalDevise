import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import customerService from '@/services/customer'

export const useCustomerStore = defineStore('customer', () => {

    const customers       = ref([])
    const selectedCustomer = ref(null)
    const loading          = ref(false)
    const errors           = ref({})

    const totalCustomers = computed(() => customers.value.length)

    async function fetchAll() {
        loading.value = true
        errors.value  = {}
        try {
            const response = await customerService.getAll()
            const result   = response.data.data
            customers.value = Array.isArray(result) ? result : result.data ?? []
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
            const response = await customerService.getOne(id)
            selectedCustomer.value = response.data.data
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
            const response = await customerService.create(data)
            customers.value.push(response.data.data)
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
            const response = await customerService.update(id, data)
            const index = customers.value.findIndex(c => c.id === id)
            if (index !== -1) customers.value[index] = response.data.data
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
            await customerService.delete(id)
            customers.value = customers.value.filter(c => c.id !== id)
        } catch (error) {
            ResponseError(error)
            throw error
        } finally {
            loading.value = false
        }
    }

    function clearSelected() {
        selectedCustomer.value = null
    }

    function ResponseError(error) {
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors
        } else if (error.response?.data?.message) {
            errors.value = { general: error.response.data.message }
        }
    }

    return {
        customers, selectedCustomer, loading, errors,
        totalCustomers,
        fetchAll, fetchOne, create, update, remove, clearSelected,
    }
})
