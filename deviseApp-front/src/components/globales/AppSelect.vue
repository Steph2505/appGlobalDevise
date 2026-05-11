<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Sélectionner...' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <select
      :value="modelValue"
      :disabled="disabled"
      :class="['select', { 'select-error': error }]"
      @change="emit('update:modelValue', Number($event.target.value))"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" :selected="option.value === modelValue">
        {{ option.label }}
      </option>
    </select>

    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--s-xs);
}

.label {
    font-size: var(--f-md);
    font-weight: var(--f-medium);
    color: var(--text-2);
}

.required {
    color: var(--danger);
    margin-left: 2px;
}

.select {
    height: 38px;
    padding: 0 var(--s-md);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-size: var(--f-base);
    color: var(--text);
    background: var(--bg-white);
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: border-color var(--transition);
    width: 100%;
}

.select:focus {
    outline: none;
    border-color: var(--border-focus);
}

.select-error {
    border-color: var(--border-error);
}

.select:disabled {
    background: var(--bg-gray);
    cursor: not-allowed;
    color: var(--text-3);
}

.error-msg {
    font-size: var(--f-sm);
    color: var(--danger);
}

@media (max-width: 768px) {
    .select {
        height: 42px;
        font-size: var(--f-base);
    }
}
</style>
