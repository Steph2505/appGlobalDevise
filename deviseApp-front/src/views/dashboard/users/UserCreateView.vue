<script setup>
import { useRouter } from 'vue-router'
import { useUser } from '@/composable/useUser'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import UserCreate from '@/components/user/UserCreate.vue'

const router = useRouter()
const { loading, errors, create } = useUser()
const { show } = useToast()

async function handleSubmit(formData) {
  const success = await create(formData)
  if (success) {
    show({ message: 'User created successfully.' })
    router.push({ name: 'users.index' })
  }
}
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Add user">
        <AppButton variant="secondary" @click="router.back()"> Back </AppButton>
      </AppHeader>

      <div class="form-wrap">
        <UserCreate
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
  /* max-width: 520px; */
}

@media (max-width: 767px) {
  .main {
    padding: var(--s-lg);
  }
}
</style>
