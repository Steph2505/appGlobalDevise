<script setup>
    import { useAuthStore } from '@/stores/authStore'
    const authStore = useAuthStore()


    defineProps({
    customers: { type: Array,   default: () => [] },
    loading:   { type: Boolean, default: false },
    })

    const emit = defineEmits(['show', 'edit', 'delete'])
</script>

<template>
  <div class="table-wrap">

    <div v-if="loading" class="state-msg">Loading customers...</div>

    <div v-else-if="customers.length === 0" class="state-msg">No customers found.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone ?? '—' }}</td>
          <td>{{ customer.address ?? '—' }}</td>
          <td>
            <div class="actions">
              <button v-if="authStore.permission({ permission: 'show_customer' })"
                class="btn-action btn-show"
                title="View details"
                @click="emit('show', customer)"
              >
                <i class="fas fa-eye" />
              </button>

              <button v-if="authStore.permission({ permission: 'update_customer' })"
                class="btn-action btn-edit"
                title="Edit"
                @click="emit('edit', customer)"
              >
                <i class="fas fa-edit" />
              </button>

              <button v-if="authStore.permission({ permission: 'delete_customer' })"
                class="btn-action btn-delete"
                title="Delete"
                @click="emit('delete', customer.id)"
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

thead { background: var(--bg-soft); }

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

tr:last-child td { border-bottom: none; }
tr:hover td      { background: var(--bg-soft); }

.actions { display: flex; gap: var(--s-sm); }

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
.btn-delete:hover{ background: var(--danger-light);   border-color: #f7c1c1; }

.state-msg {
  padding: var(--s-2xl);
  text-align: center;
  color: var(--text-3);
  font-size: var(--f-base);
}

@media (max-width: 768px) {
  .table-wrap { overflow-x: auto; }
  table { min-width: 560px; }
  th, td { padding: var(--s-sm) var(--s-md); }
}
</style>
