<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },

  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="close-btn" @click="emit('close')">✕</button>
        </div>
        <div class="modal-body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--s-lg);
}

.modal {
    background: var(--bg-white);
    border-radius: var(--r-lg);
    width: 460px;
    max-width: 100%;
    padding: var(--s-xl);
    box-shadow: var(--shadow-lg);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--s-xl);
}

.modal-title {
    font-size: var(--f-lg);
    font-weight: var(--f-medium);
    color: var(--text);
}

.close-btn {
    background: none;
    border: none;
    font-size: var(--f-lg);
    cursor: pointer;
    color: var(--text-3);
}

.close-btn:hover {
    color: var(--text);
}

.modal-body {
    margin-bottom: var(--s-sm);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--s-sm);
    padding-top: var(--s-lg);
    border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
    .overlay {
        align-items: flex-end;
        padding: 0;
    }

    .modal {
        width: 100%;
        border-radius: var(--r-lg) var(--r-lg) 0 0;
        padding: var(--s-xl) var(--s-lg);
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-footer {
        flex-direction: column;
    }
}
</style>