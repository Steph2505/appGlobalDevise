<script setup>
defineProps({
  totalDevises: { type: Number, default: 0 },
  totalActives:    { type: Number, default: 0 },
})
</script>

<template>
  <div class="stat-grid">

    <div class="stat-card">
      <p class="stat-label">Total devises</p>
      <p class="stat-value">{{ totalDevises }}</p>
      <p class="stat-sub">actives et inactives</p>
    </div>

    <div class="stat-card">
      <p class="stat-label">Devises actives</p>
      <p class="stat-value">{{ totalActives }}</p>
      <p class="stat-sub">en circulation</p>
    </div>

    <div class="stat-card">
      <p class="stat-label">Devises inactives</p>
      <p class="stat-value">{{ totalDevises - totalActives }}</p>
      <p class="stat-sub">hors circulation</p>
    </div>

  </div>
</template>

<style scoped>
.stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-md);
    margin-bottom: var(--s-xl);
}

.stat-card {
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: var(--s-lg) var(--s-xl);
}

.stat-label {
    font-size: var(--f-sm);
    color: var(--text-3);
    margin-bottom: var(--s-xs);
}

.stat-value {
    font-size: var(--f-3xl);
    font-weight: var(--f-medium);
    color: var(--text);
}

.stat-sub {
    font-size: var(--f-xs);
    color: var(--text-4);
    margin-top: 2px;
}

@media (max-width: 768px) {
    .stat-grid {
        grid-template-columns: 1fr;
    }

    .stat-card {
        padding: var(--s-md) var(--s-lg);
    }

    .stat-value {
        font-size: var(--f-2xl);
    }
}
</style>