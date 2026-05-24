<script setup>
import AppButton from '@/components/globales/AppButton.vue'

const props = defineProps({
  devis: { type: Object, required: true },
})

const emit = defineEmits(['edit', 'delete'])

function formatRef(ref) {
  return ref ?? '—'
}

function formatMontant(val) {
  return Number(val ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })
}

function formatDate(str) {
  return str ? new Date(str).toLocaleDateString('fr-FR') : '—'
}
</script>

<template>
  <div class="content-card">
    <div class="card">
      <div class="card-header">
        <div>
          <span class="card-ref">{{ formatRef(devis.reference) }}</span>
        </div>
        <span :class="['status', devis.status === 'Validated' ? 'status-valid' : 'status-draft']">
          {{ devis.status }}
        </span>
      </div>

      
      <div class="card-meta">
        <div class="meta-row">
          <span class="meta-label">Customer</span>
          <span class="meta-value">{{ devis.client?.name ?? '—' }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Email</span>
          <span class="meta-value">{{ devis.client?.email ?? '—' }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Created on</span>
          <span class="meta-value">{{ formatDate(devis.created_at) }}</span>
        </div>
      </div>

      <div class="lignes-wrap">
        <p class="lignes-title">Line items</p>
        <table class="lignes-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in devis.lignes ?? []" :key="i">
              <td>{{ l.intitule }}</td>
              <td>{{ l.quantite }}</td>
              <td>{{ formatMontant(l.prix_unitaire) }} {{ devis.currency ?? 'XAF' }}</td>
              <td class="cell-total">{{ formatMontant(l.total) }} {{ devis.currency ?? 'XAF' }}</td>
            </tr>
            <tr v-if="!devis.lignes?.length">
              <td colspan="4" class="empty-lignes">No lines.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-total">
        <span class="total-label">Total amount</span>
        <span class="total-value">{{ formatMontant(devis.montant_total) }} {{ devis.currency ?? 'XAF' }}</span>
      </div>

      <div class="card-footer" v-if="devis.status !== 'Validated'">
        <AppButton variant="secondary" @click="emit('edit')">Edit</AppButton>
        <AppButton variant="danger" @click="emit('delete', devis.id)">Delete</AppButton>
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
  width: 100%;
  max-width: 780px;
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--s-xl);
  display: flex;
  flex-direction: column;
  gap: var(--s-xl);
}


.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s-md);
}

.card-ref {
  font-family: monospace;
  font-size: var(--f-sm);
  background: var(--bg-gray);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 2px var(--s-sm);
  display: inline-block;
  margin-bottom: var(--s-xs);
}

.card-client {
  font-size: var(--f-2xl);
  font-weight: var(--f-medium);
  color: var(--text);
  margin: 0;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--r-full);
  font-size: var(--f-sm);
  font-weight: var(--f-medium);
  text-transform: capitalize;
  white-space: nowrap;
}

.status-valid { background: var(--success-light); color: var(--success); }
.status-draft { background: var(--bg-gray); color: var(--text-3); }


.card-meta {
  display: flex;
  flex-direction: column;
  gap: var(--s-sm);
  padding: var(--s-lg);
  background: var(--bg-soft);
  border-radius: var(--r-md);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--f-base);
}

.meta-label { color: var(--text-3); }
.meta-value { color: var(--text); font-weight: var(--f-medium); }


.lignes-wrap {
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.lignes-title {
  margin: 0;
  padding: var(--s-sm) var(--s-lg);
  font-size: var(--f-md);
  font-weight: var(--f-bold);
  color: var(--text-2);
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

.lignes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--f-base);
}

.lignes-table th {
  padding: var(--s-sm) var(--s-lg);
  text-align: left;
  font-weight: var(--f-medium);
  color: var(--text-3);
  font-size: var(--f-sm);
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

.lignes-table td {
  padding: var(--s-sm) var(--s-lg);
  color: var(--text);
  border-bottom: 1px solid var(--bg-gray);
}

.lignes-table tr:last-child td { border-bottom: none; }

.cell-total { font-weight: var(--f-medium); }

.empty-lignes {
  text-align: center;
  color: var(--text-3);
  padding: var(--s-xl);
}


.card-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--s-md);
  padding: var(--s-md) var(--s-lg);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
}

.total-label {
  font-size: var(--f-md);
  font-weight: var(--f-bold);
  color: var(--text-2);
}

.total-value {
  font-size: var(--f-2xl);
  font-weight: var(--f-bold);
  color: var(--primary);
}


.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-sm);
}

@media (max-width: 768px) {
  .card { padding: var(--s-lg); }
  .card-header { flex-direction: column; }
  .card-footer { flex-direction: column; }
  .lignes-table { min-width: 480px; }
  .lignes-wrap { overflow-x: auto; }
}
</style>
