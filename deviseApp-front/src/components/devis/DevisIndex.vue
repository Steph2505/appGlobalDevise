<script setup>
  defineProps({
    totalDevis:      { type: Number, default: 0 },
    totalDraftss: { type: Number, default: 0 },
    totalValides:    { type: Number, default: 0 },
  })
</script>

<template>
  <div class="stat-grid">

    <div class="stat-card">
      <p class="stat-label">Total quotes</p>
      <p class="stat-value">{{ totalDevis }}</p>
    </div>

    <div class="stat-card stat-card--draft">
      <p class="stat-label">Drafts</p>
      <p class="stat-value">{{ totalDraftss }}</p>
    </div>

    <div class="stat-card stat-card--valid">
      <p class="stat-label">Validated</p>
      <p class="stat-value">{{ totalValides }}</p>
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

.stat-card--draft {
  border-left: 3px solid var(--text-3);
}

.stat-card--valid {
  border-left: 3px solid var(--success);
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
