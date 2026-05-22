<script setup>
defineProps({
  totalUsers: { type: Number, default: 0 },
})
</script>

<template>
  <div class="stat-grid">

    <div class="stat-card">
      <p class="stat-label">Total utilisateurs</p>
      <p class="stat-value">{{ totalUsers }}</p>
    </div>

  </div>
</template>
<style scoped>
.stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-lg);
    margin-bottom: var(--s-xl);
}

.stat-card {
    display: flex;
    flex-direction: column;
    gap: var(--s-xs);
    padding: var(--s-xl);
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.stat-label {
    font-size: var(--f-sm);
    font-weight: var(--f-medium);
    color: var(--text-3);
}

.stat-value {
    font-size: var(--f-3xl);
    font-weight: var(--f-bold);
    color: var(--text);
    line-height: 1.2;
}

.stat-sub {
    font-size: var(--f-xs);
    font-weight: var(--f-normal);
    color: var(--text-4);
}

@media screen and (max-width: 768px) {

    .stat-grid {
        grid-template-columns: 1fr;
        gap: var(--s-md);
    }

    .stat-card {
        padding: var(--s-lg);
    }

    .stat-value {
        font-size: var(--f-2xl);
    }
}
</style>