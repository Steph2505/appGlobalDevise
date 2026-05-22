import { useUserStore } from '@/stores/userStore'
import { storeToRefs }  from 'pinia'

export function useUser() {

    const userStore = useUserStore()
    const {
        users,
        selectedUser,
        loading,
        errors,
        accessRight,
        totalUsers,
        isLoading,
    } = storeToRefs(userStore)

    async function fetchAll() {
        try {
            await userStore.fetchAll()
        } catch (error) {
            console.log('Erreur chargement utilisateurs :', error)
        }
    }

    async function fetchOne(id) {
        try {
            await userStore.fetchOne(id)
        } catch (error) {
            console.log('Erreur chargement utilisateur :', error)
        }
    }

    async function create(data) {
        try {
            await userStore.create(data)
            return true
        } catch (error) {
            console.log('Erreur création utilisateur :', error)
            return false
        }
    }

    async function update(id, data) {
        try {
            await userStore.update(id, data)
            return true
        } catch (error) {
            console.log('Erreur modification utilisateur :', error)
            return false
        }
    }

    async function remove(id) {
        const confirmed = window.confirm('Are you sure you want to delete this user?')
        if (!confirmed) return false
        try {
            await userStore.remove(id)
            return true
        } catch (error) {
            console.log('Erreur suppression utilisateur :', error)
            return false
        }
    }

    return {
        users,
        selectedUser,
        totalUsers,
        loading:       isLoading,
        errors,
        accessRight,

        fetchAll,
        fetchOne,
        create,
        update,
        remove,
        getCreate:     userStore.getCreate,
        clearSelected: userStore.clearSelected,
    }
}