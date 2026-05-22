<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/composable/useUser'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import UserCreate from '@/components/user/UserCreate.vue'

const route = useRoute()
const router = useRouter()

const { selectedUser, loading, errors, accessRight, fetchOne, update, getCreate } = useUser()
const { show } = useToast()

const id = Number(route.params.id)

async function handleSubmit(formData) {
  const success = await update(id, formData)
  if (success) {
    show({ message: 'User updated successfully.' })
    router.push({ name: 'users.index' })
  }
}

onMounted(() => {
  fetchOne(id)
  getCreate()
})
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Edit user">
        <AppButton variant="secondary" @click="router.back()"> Back </AppButton>
      </AppHeader>

      <div v-if="loading && !selectedUser" class="loading">Loading...</div>

      <div v-else class="form-wrap">
        <UserCreate
          :user="selectedUser"
          :errors="errors"
          :loading="loading"
          :profils="accessRight?.profils ?? []"
          :access="accessRight?.access ?? []"
          @submit="handleSubmit"
          @cancel="router.back()"
        />
      </div>
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
