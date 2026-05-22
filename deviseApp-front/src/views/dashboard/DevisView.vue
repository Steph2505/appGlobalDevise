<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDevis } from '@/composable/useDevis'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composable/useToast'
import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DevisIndex from '@/components/devis/DevisIndex.vue'
import DevisListing from '@/components/devis/DevisListing.vue'

const authStore = useAuthStore()
const router = useRouter()
const { show } = useToast()

const {
  devis, totalDevis, totalDraftss, totalValides,
  loading, fetchAll, remove,
} = useDevis()

const searchQuery = ref('')

const filteredDevis = computed(() =>
  (devis.value ?? []).filter((d) => {
    const ref   = String(d.id).padStart(4, '0')
    const client = (d.client?.name ?? '').toLowerCase()
    const query  = searchQuery.value.toLowerCase()
    return client.includes(query) || ref.includes(query)
  }),
)

function goToCreate() {
  router.push({ name: 'devis.create' })
}

function goToShow(d) {
  router.push({ name: 'devis.show', params: { id: d.id } })
}

function goToEdit(d) {
  router.push({ name: 'devis.edit', params: { id: d.id } })
}

async function handleDelete(id) {
  const success = await remove(id)
  if (success) show({ message: 'Quote deleted successfully.' })
}

onMounted(fetchAll)
</script>

<template>
  <div class="layout">
    <AppSidebar />

    <main class="main">
      <AppHeader title="Quote management">
        <AppButton variant="primary" @click="goToCreate" v-if="authStore.permission({ permission: 'create_devis' })">
          New quote
        </AppButton>
      </AppHeader>

      <DevisIndex
        :total-devis="totalDevis"
        :total-Draftss="totalDraftss"
        :total-valides="totalValides"
      />

      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by customer or reference..."
          class="search-input"
        />
      </div>

      <DevisListing
        :devis="filteredDevis"
        :loading="loading"
        @show="goToShow"
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
  .main { padding: var(--s-lg); }
  .search-input { max-width: 100%; }
}
</style>
