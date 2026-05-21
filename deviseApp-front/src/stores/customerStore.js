import {defineStore} from "pinia";
import {ref, computed} from "vue";
import customerService from "@/services/customer";

export const useCustomerStore = defineStore('customer', () => {

    const customers = ref([])
    const selectedCustomer = ref(null)
    const loading = ref(false)
    const errors = ref({})

    const totalCustomers  = computed(() => customers.value.length)
    const isLoading = computed(() => loading.value)

    // Récupérer tous les clients
    async function fetchAll() {
        loading.value = true
        errors.value  = {}
        try {
            const response = await customerService.getAll()
            console.log('Réponse  :', response.data)
            const result = response.data.data

            customers.value = Array.isArray(result) ? result : result.data ?? []

            return response.data
        } catch (error) {
            ResponseError(error)
            throw error
        } finally {
            loading.value = false
        }
    }

    // Show un client
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
    
    // Store un client 
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

    return {
        customers,
        selectedCustomer,
        totalCustomers,
        isLoading,
        fetchAll,
        fetchOne,
        create,
    }
})