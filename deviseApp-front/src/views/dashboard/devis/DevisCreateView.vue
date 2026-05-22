<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDevis } from '@/composable/useDevis'
  import { useCustomer } from '@/composable/useCustomer'
  import { useToast } from '@/composable/useToast'

  import AppSidebar from '@/components/globales/AppSidebar.vue'
  import AppHeader from '@/components/globales/AppHeader.vue'
  import AppButton from '@/components/globales/AppButton.vue'
  import DevisForm from '@/components/devis/DevisForm.vue'

  const router = useRouter()
  const { loading, errors, create } = useDevis()
  const { customers, fetchAll: fetchClients } = useCustomer()
  const { show } = useToast()

  async function handleSubmit(formData) {
    const success = await create(formData)
    if (success) {
      show({ message: 'Quote created successfully.' })
      router.push({ name: 'devis.index' })
    }
  }

  onMounted(fetchClients)
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="New quote">
        <AppButton variant="secondary" @click="router.back()">Back</AppButton>
      </AppHeader>

      <DevisForm
        :clients="customers"
        :errors="errors"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="router.back()"
      />
    </main>
  </div>
</template>

<style scoped>
.main {
  padding: var(--s-2xl);
  background: var(--bg-white);
}

@media (max-width: 767px) {
  .main { padding: var(--s-lg); }
}
</style>
