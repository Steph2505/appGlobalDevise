<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router    = useRouter()
const authStore = useAuthStore()

const props = defineProps({
    users:   { type: Array,   default: () => [] },
    loading: { type: Boolean, default: false },
})

const filteredUsers = computed(() =>
    props.users.filter((u) => u.id !== authStore.user?.id)
)

const emit = defineEmits(['edit', 'delete', 'show'])

function goToEdit(user) {
    router.push({ name: 'users.edit', params: { id: user.id } })
}

function getInitial(name) {
    return (name ?? '?').charAt(0).toUpperCase()
}

function formatDate(date) {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('en-US')
}
</script>

<template>
    <div class="table-wrap">

        <div v-if="loading" class="loading">
            Loading users...
        </div>

        <div v-else-if="filteredUsers.length === 0" class="empty">
            No users found.
        </div>

        <table v-else>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created on</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td>
                        <div class="avatar">
                            {{ getInitial(user.name) }}
                        </div>
                    </td>
                    <td>{{ user.name ?? '—' }}</td>
                    <td>{{ user.email ?? '—' }}</td>
                    <td>{{ formatDate(user.created_at) }}</td>
                    <td>
                        <div class="actions">
                            <button
                                class="btn-action btn-show"
                                title="View"
                                @click="emit('show', user)"
                            >
                                <i class="fas fa-eye"></i>
                            </button>
                            <button
                                class="btn-action btn-edit"
                                title="Edit"
                                @click="goToEdit(user)"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                class="btn-action btn-delete"
                                title="Delete"
                                @click="emit('delete', user.id)"
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
    background: var(--bg-white);
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

.avatar {
    width: 32px;
    height: 32px;
    border-radius: var(--r-full);
    background: var(--primary-light);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--f-md);
    font-weight: var(--f-bold);
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
}

.btn-edit:hover {
    background: var(--primary-light);
}

.btn-delete:hover {
    background: var(--danger-light);
}

.loading,
.empty {
    padding: var(--s-2xl);
    text-align: center;
    color: var(--text-4);
    font-size: var(--f-base);
}

@media (max-width: 768px) {
    .table-wrap {
        overflow-x: auto;
    }

    table {
        min-width: 700px;
    }
}
</style>