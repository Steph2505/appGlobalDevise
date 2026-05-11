<script setup>
import { useRouter } from 'vue-router'
import { useDevise } from '@/composable/useDevise'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DeviseCreate from '@/components/devise/DeviseCreate.vue'

const router = useRouter()
const { loading, errors, create } = useDevise()
const { show } = useToast()

async function handleSubmit(formData) {
  const success = await create(formData)
  if (success) {
    show({ message: 'Devise créée avec succès.' })
    router.push({ name: 'devises.index' })
  }
}
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Ajouter une devise">
        <AppButton variant="secondary" @click="router.back()"> ← Retour </AppButton>
      </AppHeader>

      <div class="form-wrap">
        <DeviseCreate
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
