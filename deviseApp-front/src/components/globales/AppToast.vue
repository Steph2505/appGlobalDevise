<script setup>
import { useToast } from '@/composable/useToast'

const { toasts } = useToast()

const icons = {
  success: 'fas fa-check-circle',
  error:   'fas fa-times-circle',
  warning: 'fas fa-exclamation-circle',
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
        >
          <i :class="icons[toast.type]" class="toast-icon" />
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--s-sm);
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--s-sm);
  padding: var(--s-md) var(--s-lg);
  border-radius: var(--r-md);
  font-size: var(--f-base);
  font-weight: var(--f-medium);
  box-shadow: var(--shadow-md);
  min-width: 280px;
  max-width: 380px;
}

.toast--success {
  background: var(--success-light);
  color: var(--success);
  border: 1px solid #C0DD97;
}

.toast--error {
  background: var(--danger-light);
  color: var(--danger);
  border: 1px solid #F7C1C1;
}

.toast--warning {
  background: var(--warning-light);
  color: var(--warning);
  border: 1px solid #f0d49a;
}

.toast-icon {
  font-size: var(--f-lg);
  flex-shrink: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
