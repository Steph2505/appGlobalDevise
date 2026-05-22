<script setup>
    import { onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useCustomer } from '@/composable/useCustomer'

    import AppSidebar from '@/components/globales/AppSidebar.vue'
    import AppHeader from '@/components/globales/AppHeader.vue'
    import AppButton from '@/components/globales/AppButton.vue'
    import Show from '@/components/customer/Show.vue'

    const route  = useRoute()
    const router = useRouter()
    const { selectedCustomer, loading, fetchOne, remove } = useCustomer()
    const id = Number(route.params.id)
    async function handleDelete(id) {
        const success = await remove(id)
        if (success) router.push({ name: 'customers.index' })
    }
    function goToEdit() {
        router.push({ name: 'customers.edit', params: { id } })
    }

    onMounted(() => fetchOne(id))
</script>

<template>
    <div class="layout">
        <AppSidebar />
        <main class="main">
            <AppHeader title="Customer details">
                <AppButton variant="secondary" @click="router.back()"> Back </AppButton>
            </AppHeader>

            <div v-if="loading" class="loading">Loading...</div>

            <Show
                v-else-if="selectedCustomer"
                :customer="selectedCustomer"
                @edit="goToEdit"
                @delete="handleDelete"
            />
        </main>
    </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  padding: 2rem;
  background: var(--bg-white);
}
</style>