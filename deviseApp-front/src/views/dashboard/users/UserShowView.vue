<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/composable/useUser'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import UserShow from '@/components/user/UserShow.vue'

const route = useRoute()
const router = useRouter()

const { selectedUser, loading, fetchOne, remove } = useUser()

const id = Number(route.params.id)

async function handleDelete(id) {
  const success = await remove(id)
  if (success) router.push({ name: 'users.index' })
}

function goToEdit() {
  router.push({ name: 'users.edit', params: { id } })
}

onMounted(() => fetchOne(id))
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="User details">
        <AppButton variant="secondary" @click="router.back()"> Back </AppButton>
      </AppHeader>

      <div v-if="loading" class="loading">Loading...</div>

      <UserShow
        v-else-if="selectedUser"
        :user="selectedUser"
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
.loading {
  color: var(--text-3);
  font-size: var(--f-base);
}
</style>
