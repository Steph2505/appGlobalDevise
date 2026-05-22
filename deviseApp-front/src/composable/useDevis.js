import { useDevisStore } from '@/stores/devisStore'
import { storeToRefs } from 'pinia'

export function useDevis() {

  const store = useDevisStore()
  const {
    devis, selectedDevis, loading, errors,
    totalDevis, totalDraftss, totalValides,
  } = storeToRefs(store)

  async function fetchAll() {
    try { await store.fetchAll() }
    catch (e) { console.log('Erreur chargement devis :', e) }
  }

  async function fetchOne(id) {
    try { await store.fetchOne(id) }
    catch (e) { console.log('Erreur chargement devis :', e) }
  }

  async function create(data) {
    try { await store.create(data); return true }
    catch (e) { console.log('Erreur création devis :', e); return false }
  }

  async function update(id, data) {
    try { await store.update(id, data); return true }
    catch (e) { console.log('Erreur modification devis :', e); return false }
  }

  async function remove(id) {
    const confirmed = window.confirm('Are you sure you want to delete this quote?')
    if (!confirmed) return false
    try { await store.remove(id); return true }
    catch (e) { console.log('Erreur suppression devis :', e); return false }
  }

  return {
    devis, selectedDevis, loading, errors,
    totalDevis, totalDraftss, totalValides,
    fetchAll, fetchOne, create, update, remove,
    clearSelected: store.clearSelected,
  }
}
