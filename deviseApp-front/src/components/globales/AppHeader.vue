<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="header">
    <h1 class="page-title">{{ title }}</h1>
    <div class="header-actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--s-xl);
}

.page-title {
    font-size: var(--f-2xl);
    font-weight: var(--f-medium);
    color: var(--text);
}

.header-actions {
    display: flex;
    gap: var(--s-sm);
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--s-md);
    }

    .header-actions {
        width: 100%;
    }
}
</style>