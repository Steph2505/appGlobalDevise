<script setup>
import AppBadge from '@/components/globales/AppBadge.vue'
import AppButton from '@/components/globales/AppButton.vue'

defineProps({
  devise: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="content-card">
    <div class="card">
      <div class="card-header">
        <div class="card-code">{{ devise.code }}</div>
        <AppBadge :active="devise.is_active" />
      </div>

      <h2 class="card-name">{{ devise.name }}</h2>

      <div class="card-details">
        <div class="detail-row">
          <span class="detail-label">Symbole</span>
          <span class="detail-value">{{ devise.symbol }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Taux de change</span>
          <span class="detail-value">{{ devise.exchange_rate }} XAF</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Créée le</span>
          <span class="detail-value">
            {{ new Date(devise.created_at).toLocaleDateString('fr-FR') }}
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Mise à jour</span>
          <span class="detail-value">
            {{ new Date(devise.updated_at).toLocaleDateString('fr-FR') }}
          </span>
        </div>
      </div>

      <div class="card-footer">
        <AppButton variant="secondary" @click="emit('edit', devise)"> Modifier </AppButton>
        <AppButton variant="danger" @click="emit('delete', devise.id)"> Supprimer </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-card {
  display: flex;
  justify-content: center;
}

.card {
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--s-xl);
  width: 70%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--s-sm);
}

.card-code {
  font-family: monospace;
  font-size: var(--f-md);
  background: var(--bg-gray);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 3px var(--s-md);
}

.card-name {
  font-size: var(--f-2xl);
  font-weight: var(--f-medium);
  color: var(--text);
  margin-bottom: var(--s-xl);
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: var(--s-md);
  margin-bottom: var(--s-xl);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--f-base);
}

.detail-label {
  color: var(--text-3);
}

.detail-value {
  color: var(--text);
  font-weight: var(--f-medium);
}

.card-footer {
  display: flex;
  gap: var(--s-sm);
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .content-card {
    justify-content: stretch;
  }

  .card {
    width: 100%;
    padding: var(--s-lg);
  }

  .card-footer {
    flex-direction: column;
  }
}
</style>
