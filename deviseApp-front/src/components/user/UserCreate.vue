<script setup>
import { ref, watch, computed } from 'vue'
import AppInput from '@/components/globales/AppInput.vue'
import AppButton from '@/components/globales/AppButton.vue'
import AppSelect from '@/components/globales/AppSelect.vue'
import AppCheckboxGroup from '@/components/globales/AppCheckboxGroup.vue'

const props = defineProps({
  user: { type: Object, default: null },
  errors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  profils: { type: Array, default: () => [] },
  access: { type: Array, default: () => [] },
})

const emit = defineEmits(['submit', 'cancel'])

const profilOptions = computed(() => props.profils.map((p) => ({ value: p.id, label: p.name })))

const form = ref({
  name: '',
  email: '',
  profil_id: '',
  access_rights: [],
})

// Observateur
watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      form.value = {
        name: newVal.name,
        email: newVal.email,
        profil_id: newVal.profil_id ?? '',
        access_rights: newVal.access_rights?.map((a) => a.id) ?? [],
      }
    } else {
      form.value = { name: '', email: '', profil_id: '', access_rights: [] }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div class="body-form">
    <div class="form">
      <AppInput
        v-model="form.name"
        label="Nom complet"
        placeholder="ex: Jean Dupont"
        :error="errors.name?.[0]"
        required
      />

      <AppInput
        v-model="form.email"
        label="Adresse email"
        type="email"
        placeholder="ex: jean@example.com"
        :error="errors.email?.[0]"
        required
      />

      <AppSelect
        v-model="form.profil_id"
        label="Profil"
        placeholder="Choisir un profil..."
        :options="profilOptions"
        :error="errors.profil_id?.[0]"
        required
        :modelValue="form.profil_id"
      />

      <AppCheckboxGroup
        v-model="form.access_rights"
        label="Droits d'accès"
        :options="access"
        :error="errors.access_rights?.[0]"
      />

      <p v-if="errors.general" class="error-general">{{ errors.general }}</p>

      <div class="form-footer">
        <AppButton variant="secondary" @click="emit('cancel')"> Annuler </AppButton>
        <AppButton variant="primary" :loading="loading" @click="handleSubmit">
          {{ user ? 'Modifier' : 'Enregistrer' }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-form {
  display: flex;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);
  width: 600px;
}

.error-general {
  font-size: var(--f-md);
  color: var(--danger);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-sm);
  padding-top: var(--s-sm);
}

@media (max-width: 768px) {
  .form-footer {
    flex-direction: column;
  }
}
</style>
