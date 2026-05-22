<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    modelValue:  { type: [String, Number], default: '' },
    label:       { type: String,  default: '' },
    options:     { type: Array,   default: () => [] },
    placeholder: { type: String,  default: 'Select...' },
    error:       { type: String,  default: '' },
    required:    { type: Boolean, default: false },
    disabled:    { type: Boolean, default: false },
  })

  const emit = defineEmits(['update:modelValue'])

  const isOpen     = ref(false)
  const searchQuery = ref('')
  const rootRef    = ref(null)
  const inputRef   = ref(null)

  const selectedLabel = computed(() => {
    const val = props.modelValue
    if (val === '' || val === null || val === undefined) return ''
    return props.options.find(o => Number(o.value) === Number(val))?.label ?? ''
  })

  const filteredOptions = computed(() =>
    props.options.filter(o =>
      String(o.label).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  function open() {
    if (props.disabled) return
    isOpen.value = true
    searchQuery.value = ''
    nextTick(() => inputRef.value?.select())
  }

  function close() {
    isOpen.value = false
    searchQuery.value = ''
  }

  function onInputClick() {
    isOpen.value ? close() : open()
  }

  function onInput(e) {
    if (!isOpen.value) open()
    searchQuery.value = e.target.value
  }

  function select(option) {
    emit('update:modelValue', Number(option.value))
    isOpen.value = false
    searchQuery.value = ''
    inputRef.value?.blur()
  }

  function onOutsideClick(e) {
    if (rootRef.value && !rootRef.value.contains(e.target)) close()
  }

  onMounted(()  => document.addEventListener('mousedown', onOutsideClick))
  onUnmounted(() => document.removeEventListener('mousedown', onOutsideClick))
</script>

<template>
  <div class="form-group" ref="rootRef">

    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div :class="['dropdown', { 'is-open': isOpen, 'is-error': !!error, 'is-disabled': disabled }]">

      
      <div class="trigger-wrap">
        <input
          ref="inputRef"
          :value="isOpen ? searchQuery : selectedLabel"
          :placeholder="placeholder"
          :disabled="disabled"
          class="trigger-input"
          :class="{ 'show-placeholder': !selectedLabel && !isOpen }"
          autocomplete="off"
          @click="onInputClick"
          @input="onInput"
          @keydown.escape="close"
        />
        
        <span class="chevron" :class="{ rotated: isOpen }" @click="onInputClick">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </span>
      </div>

      
      <Transition name="panel">
        <div v-if="isOpen" class="panel">
          <ul class="options-list">
            <li
              v-for="option in filteredOptions"
              :key="option.value"
              :class="['option', { 'option-active': Number(option.value) === Number(modelValue) }]"
              @mousedown.prevent="select(option)"
            >
              <svg v-if="Number(option.value) === Number(modelValue)" class="check-icon" viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span v-else class="check-placeholder" />
              {{ option.label }}
            </li>
            <li v-if="filteredOptions.length === 0" class="option-empty">
              No results
            </li>
          </ul>
        </div>
      </Transition>

    </div>

    <span v-if="error" class="error-msg">{{ error }}</span>

  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--s-xs);
  position: relative;
}

.label {
  font-size: var(--f-md);
  font-weight: var(--f-medium);
  color: var(--text-2);
}

.required { color: var(--danger); margin-left: 2px; }


.dropdown { position: relative; }

.trigger-wrap {
  display: flex;
  align-items: center;
  height: 38px;
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  transition: border-color var(--transition);
  overflow: hidden;
}

.is-error .trigger-wrap   { border-color: var(--border-error); }
.is-disabled .trigger-wrap { background: var(--bg-gray); }

.is-open .trigger-wrap {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.trigger-input {
  flex: 1;
  height: 100%;
  padding: 0 var(--s-sm) 0 var(--s-md);
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--f-base);
  color: var(--text);
  cursor: pointer;
  min-width: 0;
}

.trigger-input.show-placeholder { color: var(--text-3); }

.trigger-input:disabled { cursor: not-allowed; color: var(--text-3); }


.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 100%;
  color: var(--text-2);
  cursor: pointer;
  flex-shrink: 0;
  transition: transform var(--transition);
  border-left: 1px solid var(--border);
  background: var(--bg-soft);
}

.chevron svg { transition: transform var(--transition); }
.chevron.rotated svg { transform: rotate(180deg); }

.is-disabled .chevron { cursor: not-allowed; }

.panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 var(--r-md) var(--r-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.is-error .panel { border-color: var(--border-error); }

.options-list {
  list-style: none;
  margin: 0;
  padding: var(--s-xs) 0;
  max-height: 220px;
  overflow-y: auto;
}

.option {
  display: flex;
  align-items: center;
  gap: var(--s-sm);
  padding: 8px var(--s-md);
  font-size: var(--f-base);
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition);
}

.option:hover { background: var(--bg-soft); }

.option-active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: var(--f-medium);
}

.option-active:hover { background: var(--primary-light); }

.check-icon { color: var(--primary); flex-shrink: 0; }
.check-placeholder { width: 14px; flex-shrink: 0; }

.option-empty {
  padding: var(--s-md);
  text-align: center;
  font-size: var(--f-sm);
  color: var(--text-3);
  font-style: italic;
  cursor: default;
}

.error-msg { font-size: var(--f-sm); color: var(--danger); }

.panel-enter-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.panel-leave-active { transition: opacity 0.08s ease; }
.panel-enter-from,
.panel-leave-to     { opacity: 0; transform: translateY(-4px); }

@media (max-width: 768px) {
  .trigger-wrap { height: 42px; }
}
</style>
