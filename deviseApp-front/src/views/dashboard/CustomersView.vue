<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useCustomer } from '@/composable/useCustomer'
    import { useAuthStore } from '@/stores/authStore'
    import { useToast } from '@/composable/useToast'

    import AppSidebar from '@/components/globales/AppSidebar.vue'
    import AppHeader from '@/components/globales/AppHeader.vue'
    import AppButton from '@/components/globales/AppButton.vue'
    import AppModal from '@/components/globales/AppModal.vue'
    import Index from '@/components/customer/Index.vue'
    import Listing from '@/components/customer/Listing.vue'
    import Create from '@/components/customer/Create.vue' 

    const authStore = useAuthStore()
    const router = useRouter()
    const { show } = useToast()
    const { customers, totalCustomers, loading, errors, fetchAll, create, remove } = useCustomer()
    const showModal = ref(false)
    const searchQuery = ref('')
    const filteredCustomers = computed(() =>
        (customers.value ?? []).filter((c) => {
            const name = (c.name ?? '').toLowerCase()
            const email = (c.email ?? '').toLowerCase()
            const query = searchQuery.value.toLowerCase()
            return name.includes(query) || email.includes(query)
        }),
    )

    function openCreate() {
        showModal.value = true
    }

    function closeModal() {
        showModal.value = false
    }   

    function goToShow(customer) {
        router.push({ name: 'customers.show', params: { id: customer.id } })
    }

    function goToEdit(customer) {
        router.push({ name: 'customers.edit', params: { id: customer.id } })
    }

    async function handleDelete(id) {
        const success = await remove(id)
        if (success) show({ message: 'Client supprimé avec succès.' })
    }   

    onMounted(() => fetchAll())
</script>

<template>
    <div class="layout">
        <AppSidebar />
        <main class="main">
            <AppHeader title="Clients">
                <AppButton variant="primary" @click="openCreate" v-if="authStore.permission({ permission: 'create_customer' })">
                    + Ajouter
                </AppButton>
            </AppHeader>

            <div class="search-wrap">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Rechercher par nom ou email..."
                    class="search-input"
                />
            </div>

            <div v-if="loading" class="loading">Chargement...</div>

            <Index v-else :total="totalCustomers">
                <Listing
                    v-for="customer in filteredCustomers"
                    :key="customer.id"
                    :customer="customer"
                    @show="goToShow"
                    @edit="goToEdit"
                    @delete="handleDelete"
                />
            </Index>

            <AppModal title="Ajouter un client" :show="showModal" @close="closeModal">
                <Create
                    :errors="errors"
                    :loading="loading"
                    @submit="
                        async (formData) => {
                            const success = await create(formData)
                            if (success) {
                                show({ message: 'Client créé avec succès.' })
                                closeModal()
                            }
                        }
                    "
                    @cancel="closeModal"
                />
            </AppModal>
        </main>
    </div>
</template>

<style scoped>
.main {
  padding: var(--s-2xl);
  background: var(--bg-white);
}

.search-bar {
  margin-bottom: var(--s-lg);
}

.search-input {
  width: 100%;
  max-width: 360px;
  height: 38px;
  padding: 0 var(--s-lg);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  font-size: var(--f-base);
  color: var(--text);
  transition: border-color var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--border-focus);
}

@media (max-width: 768px) {
  .main {
    padding: var(--s-lg);
  }

  .search-input {
    max-width: 100%;
  }
}
</style>