import {useCustomerStore} from "@/stores/customerStore";
import {storeToRefs} from "pinia";

export function useCustomer() {

    const customerStoreInstance = useCustomerStore()
    const {
        customers,
        selectedCustomer,
        totalCustomers,
        isLoading,
        errors,
    } = storeToRefs(customerStoreInstance)

    async function fetchAll() {
        try {
            await customerStoreInstance.fetchAll()
        } catch (error) {
            console.log('Erreur chargement clients :', error)
        }
    }

    async function fetchOne(id) {
        try {
            await customerStoreInstance.fetchOne(id)
        } catch (error) {
            console.log('Erreur chargement client :', error)
        }
    }

    async function create(data) {
        try {
            await customerStoreInstance.create(data)
            return true
        } catch (error) {
            console.log('Erreur création client :', error)
            return false
        }
    }

    async function update(id, data) {
        try {
            await customerStoreInstance.update(id, data)
            return true
        } catch (error) {
            console.log('Erreur modification client :', error)
            return false
        }
    }

    async function remove(id) {
        const confirmed = window.confirm('Voulez-vous vraiment supprimer ce client ?')
        if (!confirmed) return false
        try {
            await customerStoreInstance.delete(id)
            return true
        } catch (error) {
            console.log('Erreur suppression client :', error)
            return false
        }
    }

    return {
        customers,
        selectedCustomer,
        totalCustomers,
        isLoading,
        errors,
        fetchAll,
        fetchOne,
        create,
        update,
        remove,
    }
}   