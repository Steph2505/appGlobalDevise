<script setup>
const props = defineProps({
  options: { type: Array,  default: () => [] },
  modelValue: { type: Array,  default: () => [] },
  label: { type: String, default: '' },
  error: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

function isChecked(id) {
  return props.modelValue.includes(id)
}

function toggle(id) {
  const current = [...props.modelValue]
  const index   = current.indexOf(id)

  if (index === -1) {
    current.push(id)
  } else {
    current.splice(index, 1)
  }

  emit('update:modelValue', current)
}
</script>

<template>
  <div class="group">

    <label v-if="label" class="label">{{ label }}</label>

    <div class="checkbox-list">
      <label
        v-for="option in options"
        :key="option.id"
        class="checkbox-item"
      >
        <input
          type="checkbox"
          :checked="isChecked(option.id)"
          @change="toggle(option.id)"
        />
        <span class="checkbox-description">{{ option.description }}</span>
      </label>
    </div>

    <span v-if="error" class="error-msg">{{ error }}</span>

  </div>
</template>

<style scoped>
.group {
    display: flex;
    flex-direction: column;
    gap: var(--s-sm);
}

.label {
    font-size: var(--f-md);
    font-weight: var(--f-medium);
    color: var(--text-2);
}

.checkbox-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--s-sm);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--s-md);
    background: var(--bg-soft);
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: var(--s-md);
    cursor: pointer;
    font-size: var(--f-md);
    color: var(--text-2);
}

.checkbox-item input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--primary);
    cursor: pointer;
    flex-shrink: 0;
}

.checkbox-description {
    line-height: 1.4;
}

.error-msg {
    font-size: var(--f-sm);
    color: var(--danger);
}

@media (max-width: 768px) {
    .checkbox-list {
        padding: var(--s-sm);
    }

    .checkbox-item {
        font-size: var(--f-base);
        gap: var(--s-sm);
    }
}
</style>