<script setup>
defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <span :class="['badge', active ? 'badge-active' : 'badge-inactive']">
    {{ active ? 'Actif' : 'Inactif' }}
  </span>
</template>

<style scoped>
  .badge {
      display: inline-flex;
      align-items: center;
      padding: 3px var(--s-sm);
      border-radius: var(--r-full);
      font-size: var(--f-sm);
      font-weight: var(--f-medium);
  }

  .badge-active {
      background: var(--success-light);
      color: var(--success);
  }

  .badge-inactive {
      background: var(--bg-gray);
      color: var(--text-2);
  }
</style>