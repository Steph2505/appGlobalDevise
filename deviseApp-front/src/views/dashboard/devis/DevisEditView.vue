<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDevis } from '@/composable/useDevis'
import { useCustomer } from '@/composable/useCustomer'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DevisForm from '@/components/devis/DevisForm.vue'

const route  = useRoute()
const router = useRouter()

const { selectedDevis, loading, errors, fetchOne, update } = useDevis()
const { customers, fetchAll: fetchClients } = useCustomer()
const { show } = useToast()

const id = Number(route.params.id)

async function handleSubmit(formData) {
  const success = await update(id, formData)
  if (success) {
    show({ message: 'Quote updated successfully.' })
    router.push({ name: 'devis.index' })
  }
}

onMounted(() => {
  fetchOne(id)
  fetchClients()
})
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Edit quote">
        <AppButton variant="secondary" @click="router.back()">Back</AppButton>
      </AppHeader>

      <div v-if="loading && !selectedDevis" class="loading">Loading...</div>

      <DevisForm
        v-else
        :devis="selectedDevis"
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

.loading {
  color: var(--text-3);
  font-size: var(--f-base);
}

@media (max-width: 767px) {
  .main { padding: var(--s-lg); }
}
</style>
