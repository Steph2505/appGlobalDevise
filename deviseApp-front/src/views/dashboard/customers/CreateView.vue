<script setup>
    import { useRouter } from 'vue-router'
    import { useCustomer } from '@/composable/useCustomer'
    import { useToast } from '@/composable/useToast'

    import AppSidebar from '@/components/globales/AppSidebar.vue'
    import AppHeader from '@/components/globales/AppHeader.vue'
    import AppButton from '@/components/globales/AppButton.vue'
    import Create from '@/components/customer/Create.vue'

    const router = useRouter()
    const { loading, errors, create } = useCustomer()
    const { show } = useToast()

    async function handleSubmit(formData) {
        const success = await create(formData)
        if (success) {
            show({ message: 'Client créé avec succès.' })
            router.push({ name: 'customers.index' })
        }
    }
</script>

<template>
    <div class="layout">
        <AppSidebar />
        <main class="main">
            <AppHeader title="Ajouter un client">
                <AppButton variant="secondary" @click="router.back()"> ← Retour </AppButton>
            </AppHeader>

            <div class="form-wrap">
                <Create
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
    .form-wrap {
        max-width: 520px;
    }

    @media (max-width: 767px) {
        .main {
            padding: var(--s-lg);
        }
    }
</style>