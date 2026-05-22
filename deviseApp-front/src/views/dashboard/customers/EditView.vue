<script setup>
    import { onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useCustomer } from '@/composable/useCustomer'
    import { useToast } from '@/composable/useToast'

    import AppSidebar from '@/components/globales/AppSidebar.vue'
    import AppHeader from '@/components/globales/AppHeader.vue'
    import AppButton from '@/components/globales/AppButton.vue'
    import Create from '@/components/customer/Create.vue'

    const route  = useRoute()
    const router = useRouter()

    const { selectedCustomer, loading, errors, fetchOne, update } = useCustomer()
    const { show } = useToast()

    const id = Number(route.params.id)
    async function handleSubmit(formData) {
        const success = await update(id, formData)
        if (success) {
            show({ message: 'Customer updated successfully.' })
            router.push({ name: 'customers.index' })
        }
    }

    onMounted(() => fetchOne(id))
</script>

<template>
    <div class="layout">
        <AppSidebar />
        <main class="main">
            <AppHeader title="Edit customer">
                <AppButton variant="secondary" @click="router.back()"> Back </AppButton>
            </AppHeader>

            <div v-if="loading && !selectedCustomer" class="loading">Loading...</div>

            <div v-else class="form-wrap">
                <Create
                    :customer="selectedCustomer"
                    :errors="errors"
                    :loading="loading"
                    @submit="handleSubmit"
                    @cancel="router.back()"
                />
            </div>
        </main>
    </div>
</template>

<style scoped>
    .main {
        padding: var(--s-2xl);
        background: var(--bg-white);
    }
    .loading {
        color: var(--text-3);
        font-size: var(--f-base);
    }

    @media (max-width: 767px) {
        .main {
            padding: var(--s-lg);
        }
    }
</style>