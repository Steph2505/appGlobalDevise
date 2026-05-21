<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDevise } from '@/composable/useDevise'
import { useToast } from '@/composable/useToast'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DeviseCreate from '@/components/devise/DeviseCreate.vue'


const router = useRouter()

const { selectedDevise, loading, errors, fetchOne, update } = useDevise()
const { show } = useToast()

const id = Number(router.params.id)

async function handleSubmit(formData) {
  const success = await update(id, formData)
  if (success) { 
    show({ message: 'Devise modifiée avec succès.' })
    router.push({ name: 'devises.index' })
  }
}

onMounted(() => fetchOne(id))
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Modifier la devise">
        <AppButton variant="secondary" @click="router.back()"> Retour </AppButton>
      </AppHeader>

      <div v-if="loading && !selectedDevise" class="loading">Chargement...</div>

      <div v-else class="form-wrap">
        <DeviseCreate
          :devise="selectedDevise"
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
.loading {
  color: var(--text-3);
  font-size: var(--f-base);
}

@media (max-width: 767px) {
  .main {
    padding: var(--s-lg);
  }
}
</style>
