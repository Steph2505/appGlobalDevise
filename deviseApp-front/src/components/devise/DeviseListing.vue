<script setup>
import AppBadge from '@/components/globales/AppBadge.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const authStore = useAuthStore()
const router = useRouter()

defineProps({
  devises: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['delete', 'show'])

function goToEdit(devise) {
  router.push({ name: 'devises.edit', params: { id: devise.id } })
}

function printDevise(devise) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Fiche Devise', 14, 20)

  autoTable(doc, {
    startY: 30,
    head: [['Champ', 'Valeur']],
    body: [
      ['Code', devise.code],
      ['Nom', devise.name],
      ['Symbole', devise.symbol],
      ['Taux (XAF)', String(devise.exchange_rate)],
      ['Statut', devise.is_active ? 'Active' : 'Inactive'],
    ],
    styles: { fontSize: 11 },
    headStyles: { fillColor: [63, 81, 181] },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
  })

  doc.save(`devise-${devise.code}.pdf`)
}
</script>

<template>
  <div class="table-wrap">
    <div v-if="loading" class="loading">Chargement des devises...</div>

    <div v-else-if="devises.length === 0" class="empty">Aucune devise trouvée.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Code</th>
          <th>Nom</th>
          <th>Symbole</th>
          <th>Taux (XAF)</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="devise in devises" :key="devise.id">
          <td>
            <span class="code-chip">{{ devise.code }}</span>
          </td>
          <td>{{ devise.name }}</td>
          <td>{{ devise.symbol }}</td>
          <td>{{ devise.exchange_rate }}</td>
          <td>
            <AppBadge :active="devise.is_active" />
          </td>
          <td>
            <div class="actions">
              <button
                v-if="authStore.permission({ permission: 'show_devise' })"
                class="btn-action btn-show"
                title="Voir le détail"
                @click="emit('show', devise)"
              >
                <i class="fas fa-eye"></i>
              </button>

              <button
                v-if="authStore.permission({ permission: 'update_devise' })"
                class="btn-action btn-edit"
                title="Modifier"
                @click="goToEdit(devise)"
              >
                <i class="fas fa-edit"></i>
              </button>

              <button
                class="btn-action btn-print"
                title="Imprimer en PDF"
                @click="printDevise(devise)"
              >
                <i class="fas fa-file-pdf"></i>
              </button>

              <button
                class="btn-action btn-delete"
                title="Supprimer"
                @click="emit('delete', devise.id)"
                v-if="authStore.permission({ permission: 'delete_devise' })"
              >
                <i class="fas fa-trash"></i>
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

.code-chip {
  font-family: monospace;
  font-size: var(--f-sm);
  background: var(--bg-gray);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 2px var(--s-sm);
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

.btn-show:hover {
  background: var(--success-light);
  border-color: #c0dd97;
}

.btn-edit:hover {
  background: var(--primary-light);
  border-color: #afa9ec;
}

.btn-delete:hover {
  background: var(--danger-light);
  border-color: #f7c1c1;
}

.btn-print:hover {
  background: #fff3e0;
  border-color: #ffb74d;
}

.loading,
.empty {
  padding: var(--s-2xl);
  text-align: center;
  color: var(--text-3);
  font-size: var(--f-base);
}

@media (max-width: 768px) {
  .table-wrap {
    overflow-x: auto;
  }

  table {
    min-width: 560px;
  }

  th,
  td {
    padding: var(--s-sm) var(--s-md);
  }

  .actions {
    flex-direction: column;
    gap: var(--s-xs);
  }
}
</style>
