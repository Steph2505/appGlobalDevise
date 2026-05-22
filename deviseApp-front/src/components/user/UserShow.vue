<script setup>
import AppButton from '@/components/globales/AppButton.vue'

defineProps({
  user: { type: Object, required: true },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="card-form">
    <div class="card">
      <div class="card-header">
        <div class="avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
  
      <div class="card-details">
        <div class="detail-row">
          <span class="detail-label">Account created on</span>
          <span class="detail-value">
            {{ new Date(user.created_at).toLocaleDateString('en-US') }}
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Last updated</span>
          <span class="detail-value">
            {{ new Date(user.updated_at).toLocaleDateString('en-US') }}
          </span>
        </div>
      </div>
  
      <div class="card-footer">
        <AppButton variant="secondary" @click="emit('edit', user)"> Edit </AppButton>
        <AppButton variant="danger" @click="emit('delete', user.id)"> Delete </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-form {
  display: flex;
  justify-content: center;
}
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1.5rem;
  width: 600px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 1.25rem;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eeedfe;
  color: #533ab7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

.user-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.user-email {
  font-size: 13px;
  color: #888;
  margin-top: 2px;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.detail-label {
  color: #888;
}
.detail-value {
  color: #333;
  font-weight: 500;
}
.card-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
