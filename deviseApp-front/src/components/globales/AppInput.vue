<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },

  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-input">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <input
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['input-class', { 'input-error': error }]"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <span v-if="error" class="error-msg">{{ error }}</span>

  </div>
</template>

<style scoped>

.form-input {
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

.input-class {
    height: 38px;
    padding: 0 var(--s-md);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-size: var(--f-base);
    color: var(--text);
    background: var(--bg-white);
    transition: border-color var(--transition);
    width: 100%;
}

.input-class:focus {
    outline: none;
    border-color: var(--border-focus);
}

.input-class-error,
.input-class-error:focus {
    border-color: var(--border-error);
}

.error-msg {
    font-size: var(--f-sm);
    color: var(--danger);
}

@media (max-width: 768px) {
    .input-class {
        height: 42px;
        font-size: var(--f-base);
    }
}
</style>