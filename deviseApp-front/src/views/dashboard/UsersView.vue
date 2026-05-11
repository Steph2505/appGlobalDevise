<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import AppModal from '@/components/globales/AppModal.vue'
import UserIndex from '@/components/user/UserIndex.vue'
import UserTable from '@/components/user/UserListing.vue'
import UserCreate from '@/components/user/UserCreate.vue'

const router = useRouter()
const userStore = useUserStore()
const { show } = useToast()

const { users, totalUsers, loading, errors, accessRight } = storeToRefs(userStore)

const showModal = ref(false)
const selectedUser = ref(null)
const searchQuery = ref('')

const filteredUsers = computed(() =>
  (users.value ?? []).filter((u) => {
    const name = (u.name ?? '').toLowerCase()
    const email = (u.email ?? '').toLowerCase()
    const query = searchQuery.value.toLowerCase()
    return name.includes(query) || email.includes(query)
  }),
)

function openCreate() {
  selectedUser.value = null
  showModal.value = true
}

function openEdit(user) {
  selectedUser.value = user
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedUser.value = null
  userStore.clearSelected()
}

function goToShow(user) {
  router.push({ name: 'users.show', params: { id: user.id } })
}

async function handleSubmit(formData) {
  try {
    if (selectedUser.value) {
      await userStore.update(selectedUser.value.id, formData)
      show({ message: 'Utilisateur modifié avec succès.' })
    } else {
      await userStore.create(formData)
      show({ message: 'Utilisateur créé avec succès.' })
    }
    closeModal()
  } catch {
    // Les erreurs de validation sont affichées dans le formulaire via errors
  }
}

async function handleDelete(id) {
  const confirmed = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')
  if (confirmed) await userStore.remove(id)
}

onMounted(() => {
  userStore.fetchAll()
  userStore.getCreate()
})
</script>

<template>
  <div class="layout">
    <AppSidebar />

    <main class="main">
      <AppHeader title="Gestion des utilisateurs">
        <AppButton variant="primary" @click="openCreate"> Ajouter un utilisateur </AppButton>
      </AppHeader>

      <UserIndex :total-users="totalUsers" />

      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par nom ou email..."
          class="search-input"
        />
      </div>

      <UserTable
        :users="filteredUsers"
        :loading="loading"
        @show="goToShow"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </main>

    <AppModal
      :show="showModal"
      :title="selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'"
      @close="closeModal"
    >
      <UserCreate
        :user="selectedUser"
        :errors="errors"
        :loading="loading"
        :profils="accessRight?.profils ?? []"
        :access="accessRight?.access ?? []"
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
