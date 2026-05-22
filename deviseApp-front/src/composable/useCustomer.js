import { useCustomerStore } from '@/stores/customerStore'
import { storeToRefs } from 'pinia'

export function useCustomer() {

    const store = useCustomerStore()
    const {
        customers, selectedCustomer, loading, errors, totalCustomers,
    } = storeToRefs(store)

    async function fetchAll() {
        try { await store.fetchAll() }
        catch (e) { console.log('Erreur chargement clients :', e) }
    }

    async function fetchOne(id) {
        try { await store.fetchOne(id) }
        catch (e) { console.log('Erreur chargement client :', e) }
    }

    async function create(data) {
        try { await store.create(data); return true }
        catch (e) { console.log('Erreur création client :', e); return false }
    }

    async function update(id, data) {
        try { await store.update(id, data); return true }
        catch (e) { console.log('Erreur modification client :', e); return false }
    }

    async function remove(id) {
        const confirmed = window.confirm('Are you sure you want to delete this customer?')
        if (!confirmed) return false
        try { await store.remove(id); return true }
        catch (e) { console.log('Erreur suppression client :', e); return false }
    }

    return {
        customers, selectedCustomer, loading, errors, totalCustomers,
        fetchAll, fetchOne, create, update, remove,
        clearSelected: store.clearSelected,
    }
}
