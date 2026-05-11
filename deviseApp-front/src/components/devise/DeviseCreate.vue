<script setup>
import { ref, watch } from 'vue'
import AppInput from '@/components/globales/AppInput.vue'
import AppButton from '@/components/globales/AppButton.vue'

const props = defineProps({
  devise: {
    type: Object,
    default: null,
  },

  errors: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  code: '',
  name: '',
  symbol: '',
  exchange_rate: '',
  is_active: true,
})

// Observateur pour edit
watch(
  () => props.devise,
  (newVal) => {
    if (newVal) {
      form.value = {
        code: newVal.code,
        name: newVal.name,
        symbol: newVal.symbol,
        exchange_rate: newVal.exchange_rate,
        is_active: newVal.is_active,
      }
    } else {
      form.value = { code: '', name: '', symbol: '', exchange_rate: '', is_active: true }
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
    <div class="content-form">
      <div class="form">
        <div class="form-row">
          <AppInput
            v-model="form.code"
            label="Code ISO"
            placeholder="ex: USD"
            :error="errors.code?.[0]"
            required
          />

          <AppInput
            v-model="form.symbol"
            label="Symbole"
            placeholder="ex: $"
            :error="errors.symbol?.[0]"
            required
          />
        </div>

        <AppInput
          v-model="form.name"
          label="Nom complet"
          placeholder="ex: Dollar américain"
          :error="errors.name?.[0]"
          required
        />

        <AppInput
          v-model="form.exchange_rate"
          label="Taux de change (XAF)"
          type="number"
          placeholder="ex: 610.50"
          :error="errors.exchange_rate?.[0]"
          required
        />

        <div class="checkbox-group">
          <input id="is_active" v-model="form.is_active" type="checkbox" />
          <label for="is_active">Devise active</label>
        </div>

        <p v-if="errors.general" class="error-general">
          {{ errors.general }}
        </p>

        <div class="form-footer">
          <AppButton variant="secondary" @click="emit('cancel')"> Annuler </AppButton>
          <AppButton variant="primary" :loading="loading" type="submit" @click="handleSubmit">
            {{ devise ? 'Modifier' : 'Enregistrer' }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-form {
  display: flex;
  justify-content: center;
}
.content-form {
  display: flex;
  justify-content: center;
  width: 600px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-md);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: var(--s-sm);
  font-size: var(--f-base);
  color: var(--text-2);
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
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-footer {
    flex-direction: column;
  }
}
</style>
