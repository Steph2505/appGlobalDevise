<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router    = useRouter()

defineProps({
  devis:   { type: Array,   default: () => [] },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['show', 'edit', 'delete'])

function goToPrint(d) {
  router.push({ name: 'devis.print', params: { id: d.id } })
}


function formatMontant(val) {
  return Number(val ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })
}

function formatDate(str) {
  return str ? new Date(str).toLocaleDateString('fr-FR') : '—'
}
</script>

<template>
  <div class="table-wrap">

    <div v-if="loading" class="state-msg">Loading quotes...</div>

    <div v-else-if="devis.length === 0" class="state-msg">No quotes found.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in devis" :key="d.id">
          <td>
            <span class="ref-chip">{{ d.reference ?? '—' }}</span>
          </td>
          <td>{{ d.client?.name ?? '—' }}</td>
          <td>
            <span :class="['status', d.status === 'Validated' ? 'status-valid' : 'status-draft']">
              {{ d.status }}
            </span>
          </td>
          <td class="montant">{{ formatMontant(d.montant_total) }} {{ d.currency ?? 'XAF' }}</td>
          <td>{{ formatDate(d.created_at) }}</td>
          <td>
            <div class="actions">
              <button
                v-if="authStore.permission({ permission: 'show_devis' }) "
                class="btn-action btn-show"
                title="View details"
                @click="emit('show', d)"
              >
                <i class="fas fa-eye" />
              </button>

              <button
                v-if="authStore.permission({ permission: 'update_devis' }) && d.status !== 'Validated'"
                class="btn-action btn-edit"
                title="Edit"
                @click="emit('edit', d)"
              >
                <i class="fas fa-edit" />
              </button>

              <button
                class="btn-action btn-pdf"
                title="Print / PDF"
                @click="goToPrint(d)"
              >
                <i class="fas fa-print" />
              </button>

              <button
                v-if="authStore.permission({ permission: 'delete_devis' }) && d.status !== 'Validated'"
                class="btn-action btn-delete"
                title="Delete"
                @click="emit('delete', d.id)"
              >
                <i class="fas fa-trash" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
.table-wrap {
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--f-base);
}

thead {
  background: var(--bg-soft);
}

th {
  padding: var(--s-md) var(--s-lg);
  text-align: left;
  font-weight: var(--f-medium);
  color: var(--text-3);
  font-size: var(--f-sm);
  border-bottom: 1px solid var(--border);
}

td {
  padding: var(--s-md) var(--s-lg);
  color: var(--text);
  border-bottom: 1px solid var(--bg-gray);
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background: var(--bg-soft);
}

.ref-chip {
  font-family: monospace;
  font-size: var(--f-sm);
  background: var(--bg-gray);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 2px var(--s-sm);
}


.status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--r-full);
  font-size: var(--f-sm);
  font-weight: var(--f-medium);
  text-transform: capitalize;
}

.status-valid {
  background: var(--success-light);
  color: var(--success);
}

.status-draft {
  background: var(--bg-gray);
  color: var(--text-3);
}

.montant {
  font-weight: var(--f-medium);
  font-variant-numeric: tabular-nums;
}

.actions {
  display: flex;
  gap: var(--s-sm);
}

.btn-action {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 5px var(--s-sm);
  cursor: pointer;
  font-size: var(--f-md);
  transition: background var(--transition);
}

.btn-show:hover  { background: var(--success-light); border-color: #c0dd97; }
.btn-edit:hover  { background: var(--primary-light);  border-color: #afa9ec; }
.btn-pdf:hover   { background: #fff3e0;               border-color: #ffb74d; }
.btn-delete:hover{ background: var(--danger-light);   border-color: #f7c1c1; }

.state-msg {
  padding: var(--s-2xl);
  text-align: center;
  color: var(--text-3);
  font-size: var(--f-base);
}

@media (max-width: 768px) {
  .table-wrap { overflow-x: auto; }

  table { min-width: 640px; }

  th, td { padding: var(--s-sm) var(--s-md); }
}
</style>
