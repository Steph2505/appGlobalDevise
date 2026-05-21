<script setup>
import { useAuthStore } from '@/stores/authStore'
import {useRoute} from 'vue-router'

const authStore = useAuthStore()
const router = useRoute()

defineProps({
  customer: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['delete', 'show'])

function goToEdit() {
  if (customer.value) {
    router.push({ name: 'customers.edit', params: { id: customer.value.id } })
  }
}

</script>

<template>
    <div v-if="loading" class="loading">Chargement des clients...</div>
    <div v-else-if="!customer" class="empty">Client non trouvé.</div>

    <table v-else class="listing-table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.address }}</td>
                <td>
                    <div class="actions">
                        <button
                            v-if="authStore.permission({ permission: 'show_devise' })"
                            class="btn-action btn-show"
                            title="Voir le détail"
                            @click="emit('show', customer)"
                        >
                            <i class="fas fa-eye"></i>
                        </button>

                        <button
                            v-if="authStore.permission({ permission: 'update_devise' })"
                            class="btn-action btn-edit"
                            title="Modifier"
                            @click="goToEdit(customer)"
                        >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            class="btn-action btn-delete"
                            title="Supprimer"
                            @click="emit('delete', customer.id)"
                            v-if="authStore.permission({ permission: 'delete_devise' })"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
                
            </tr>
        </tbody>
    </table>
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