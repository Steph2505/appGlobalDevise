<script setup>

const props = defineProps({
  // Type visuel du bouton
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'danger', 'secondary'].includes(v),
  },

  // Affiche un spinner si true
  loading: {
    type: Boolean,
    default: false,
  },

  // Désactive le bouton si true
  disabled: {
    type: Boolean,
    default: false,
  },

  // Type HTML du bouton
  type: {
    type: String,
    default: 'button',
  },
})


const variantClasses = {
  primary:   'btn-class-primary',
  danger:    'btn-class-danger',
  secondary: 'btn-class-secondary',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn-class', variantClasses[variant]]"
  >
    <slot />
  </button>
</template>
<style scoped>
  .btn-class {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--s-sm);
      padding: var(--s-sm) var(--s-lg);
      border-radius: var(--r-md);
      font-size: var(--f-base);
      font-weight: var(--f-medium);
      cursor: pointer;
      border: 1px solid transparent;
      transition: opacity var(--transition);
      text-align: center;
  }

  .btn-class:disabled {
      opacity: 0.6;
      cursor: not-allowed;
  }

  .btn-class-primary {
      background: var(--primary);
      color: var(--bg-white);
      border-color: var(--primary);
  }

  .btn-class-danger {
      background: var(--danger);
      color: var(--bg-white);
      border-color: var(--danger);
  }

  .btn-class-secondary {
      background: transparent;
      color: var(--text-2);
      border-color: var(--border);
  }

  .btn-class-primary:hover:not(:disabled),
  .btn-class-danger:hover:not(:disabled) {
      opacity: 0.88;
  }

  .btn-class-secondary:hover:not(:disabled) {
      background: var(--bg-gray);
  }

  @media (max-width: 768px) {
      .btn-class {
          width: 100%;
          padding: var(--s-md) var(--s-lg);
      }
  }
</style>