import { useDeviseStore } from '@/stores/deviseStore'
import { storeToRefs } from 'pinia'

export function useDevise() {

    const deviseStore = useDeviseStore()
    const {
    devises,
    activeDevises,
    selectedDevise,
    totalDevises,
    totalActives,
    isLoading,
    errors,
    } = storeToRefs(deviseStore)

  async function fetchAll() {
    try {
      await deviseStore.fetchAll()
    } catch (error) {
      console.log('Erreur chargement devises :', error)
    }
  }

  async function fetchOne(id) {
    try {
      await deviseStore.fetchOne(id)
    } catch (error) {
      console.log('Erreur chargement devise :', error)
    }
  }

  async function create(data) {
    try {
      await deviseStore.create(data)
      return true
    } catch (error) {
      console.log('Erreur création devise :', error)
      return false
    }
  }

  async function update(id, data) {
    try {
      await deviseStore.update(id, data)
      return true
    } catch (error) {
      console.log('Erreur modification devise :', error)
      return false
    }
  }

  async function remove(id) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cette devise ?')
    if (!confirmed) return false
    try {
      await deviseStore.remove(id)
      return true
    } catch (error) {
      console.log('Erreur suppression devise :', error)
      return false
    }
  }

return {
  devises,        // ← c'est un ref([]) réactif
  activeDevises,
  selectedDevise,
  totalDevises,
  totalActives,
  loading:  isLoading,
  errors,
  fetchAll,
  fetchOne,
  create,
  update,
  remove,
  clearSelected: deviseStore.clearSelected,
}
}