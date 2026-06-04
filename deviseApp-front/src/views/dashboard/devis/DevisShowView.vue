<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDevis } from '@/composable/useDevis'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DevisShow from '@/components/devis/DevisShow.vue'

const route  = useRoute()
const router = useRouter()
const { show } = useToast()

const { selectedDevis, loading, fetchOne, remove } = useDevis()

const id = Number(route.params.id)

async function handleDelete(devisId) {
  const success = await remove(devisId)
  if (success) {
    show({ message: 'Quote deleted successfully.' })
    router.push({ name: 'devis.index' })
  }
}

function goToEdit() {
  router.push({ name: 'devis.edit', params: { id } })
}

onMounted(() => fetchOne(id))
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Quote details">
        <AppButton variant="secondary" @click="router.back()">Back</AppButton>
      </AppHeader>

      <div v-if="loading" class="loading">Loading...</div> 

      <DevisShow
        v-else-if="selectedDevis"
        :devis="selectedDevis"
        @edit="goToEdit"
        @delete="handleDelete"
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
