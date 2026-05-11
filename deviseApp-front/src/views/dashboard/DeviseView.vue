<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDevise } from '@/composable/useDevise'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import AppModal from '@/components/globales/AppModal.vue'
import DeviseIndex from '@/components/devise/DeviseIndex.vue'
import DeviseListing from '@/components/devise/DeviseListing.vue'
import DeviseCreate from '@/components/devise/DeviseCreate.vue'

const authStore = useAuthStore()
const router = useRouter()
const { show } = useToast()

const {
  devises,
  totalDevises,
  totalActives,
  loading,
  errors,
  fetchAll,
  create,
  remove,
  clearSelected,
} = useDevise()

const showModal = ref(false)
const selectedDevise = ref(null)
const searchQuery = ref('')

const filteredDevises = computed(() =>
  (devises.value ?? []).filter((d) => {
    const name = (d.name ?? '').toLowerCase()
    const code = (d.code ?? '').toLowerCase()
    const query = searchQuery.value.toLowerCase()
    return name.includes(query) || code.includes(query)
  }),
)

function openCreate() {
  selectedDevise.value = null
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedDevise.value = null
  clearSelected()
}

function goToShow(devise) {
  router.push({ name: 'devises.show', params: { id: devise.id } })
}

async function handleSubmit(formData) {
  const success = await create(formData)
  if (success) {
    show({ message: 'Devise créée avec succès.' })
    closeModal()
  }
}

async function handleDelete(id) {
  await remove(id)
}

onMounted(fetchAll)
</script>

<template>
  <div class="layout">
    <AppSidebar />

    <main class="main">
      <AppHeader title="Gestion des devises">
        <AppButton
          v-if="authStore.permission({ permission: 'create_devise' })"
          variant="primary"
          @click="openCreate"
        >
          Ajouter une devise
        </AppButton>
      </AppHeader>

      <DeviseIndex :total-devises="totalDevises" :total-actives="totalActives" />

      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par code ou nom..."
          class="search-input"
        />
      </div>

      <DeviseListing
        :devises="filteredDevises"
        :loading="loading"
        @show="goToShow"
        @delete="handleDelete"
      />
    </main>

    <AppModal :show="showModal" :title="'Ajouter une devise'" @close="closeModal">
      <DeviseCreate
        :errors="errors"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </AppModal>
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
