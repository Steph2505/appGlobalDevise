<script setup>
import { reactive, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AppInput from '@/components/globales/AppInput.vue'
import AppButton from '@/components/globales/AppButton.vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useToast } from '@/composable/useToast'
import AppSidebar from '@/components/globales/AppSidebar.vue'

const store    = useSettingsStore()
const { show } = useToast()
const { company } = storeToRefs(store)

const form = reactive({
  name: '', address: '', phone: '', email: '',
  website: '', siret: '', logo: '', footer: '',
})

watch(company, (val) => Object.assign(form, val), { immediate: true, deep: true })

onMounted(() => store.fetch())

async function handleSubmit() {
  const ok = await store.save({ ...form })
  if(ok) show({ message: 'Settings saved', type: 'success' })
}
</script>

<template>

  <div class="layout">
    <AppSidebar />
    <main class="main">
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Settings</h1>
          <p class="page-sub">Company information used in quote print templates</p>
        </div>
    
        <div class="card">
          <h2 class="section-title">Company information</h2>
    
          <div class="form">
            <div class="row">
              <AppInput v-model="form.name"     label="Company name"   placeholder="Acme Corp" :error="store.errors.name?.[0]" />
              <AppInput v-model="form.email"    label="Email"          placeholder="contact@company.com" :error="store.errors.email?.[0]" />
            </div>
            <div class="row">
              <AppInput v-model="form.phone"    label="Phone"          placeholder="+237 6XX XXX XXX" />
              <AppInput v-model="form.website"  label="Website"        placeholder="www.company.com" />
            </div>
            <div class="row">
              <AppInput   v-model="form.address"  label="Address"        placeholder="City, Country" />
              <AppInput v-model="form.siret" label="RCCM / SIRET" placeholder="RC/DLA/2024/B/XXXXX" />
            </div>
            <AppInput v-model="form.logo" label="Logo URL" placeholder="https://..." />
            <AppInput   v-model="form.footer"   label="Quote footer"   placeholder="Quote valid for 30 days…" />
          </div>
    
          <div class="actions">
            <AppButton variant="primary" :loading="store.loading" @click="handleSubmit">
              Save
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  padding: var(--s-xl);
  max-width: 800px;
}

.page-header {
  margin-bottom: var(--s-xl); 
}

.page-title {
  font-size: var(--f-2xl);
  font-weight: var(--f-bold);
  color: var(--text);
  margin-bottom: var(--s-xs);
}

.page-sub {
  font-size: var(--f-md);
  color: var(--text-3);
}

.card {
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--s-xl);
}

.section-title {
  font-size: var(--f-lg);
  font-weight: var(--f-bold);
  color: var(--text);
  margin-bottom: var(--s-lg);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--s-md);
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-md);
}

.actions {
  margin-top: var(--s-xl);
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .page { padding: var(--s-md); }
  .row  { grid-template-columns: 1fr; }
}
</style>
