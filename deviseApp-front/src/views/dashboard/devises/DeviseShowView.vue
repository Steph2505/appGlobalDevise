<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDevise } from '@/composable/useDevise'

import AppSidebar from '@/components/globales/AppSidebar.vue'
import AppHeader from '@/components/globales/AppHeader.vue'
import AppButton from '@/components/globales/AppButton.vue'
import DeviseShow from '@/components/devise/DeviseShow.vue'

const route = useRoute()
const router = useRouter()

const { selectedDevise, loading, fetchOne, remove } = useDevise()

const id = Number(route.params.id)

async function handleDelete(id) {
  const success = await remove(id)
  if (success) router.push({ name: 'devises.index' })
}

function goToEdit() {
  router.push({ name: 'devises.edit', params: { id } })
}

onMounted(() => fetchOne(id))
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <AppHeader title="Détail de la devise">
        <AppButton variant="secondary" @click="router.back()"> Retour </AppButton>
      </AppHeader>

      <div v-if="loading" class="loading">Chargement...</div>

      <DeviseShow
        v-else-if="selectedDevise"
        :devise="selectedDevise"
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
</style>
