<script setup>
import { ref, watch } from 'vue'
import AppInput from '@/components/globales/AppInput.vue'
import AppButton from '@/components/globales/AppButton.vue'     

const props = defineProps({
  customer: {
    type: Object,
    default: null,
  },

  errors: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
})

// Observateur pour edit
watch(
  () => props.customer,
  (newVal) => {
    if (newVal) {
      form.value = {   
        name: newVal.name,
        email: newVal.email,
        phone: newVal.phone,
        address: newVal.address,
        }
    } else {
      form.value = { name: '', email: '', phone: '', address: '' }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', { ...form.value })
}

</script>

<template>
    <div class="body-form">
        <div class="content-form">
            <div class="form">
                <div class="form-row">
                <AppInput
                    v-model="form.name"
                    label="Name"
                    :error="errors.name"
                    placeholder="Enter customer name"
                />
                </div>
                <div class="form-row">
                <AppInput
                    v-model="form.email"
                    label="Email"
                    :error="errors.email"
                    placeholder="Enter customer email"
                />
                </div>
                <div class="form-row">
                <AppInput
                    v-model="form.phone"
                    label="Phone"
                    :error="errors.phone"
                    placeholder="Enter customer phone number"
                />
                </div>
                <div class="form-row">
                <AppInput
                    v-model="form.address"
                    label="Address"
                    :error="errors.address"
                    placeholder="Enter customer address"
                />
                </div>
                <div class="buttons">
                    <AppButton @click="handleSubmit" :loading="loading" variant="primary">Submit </AppButton>
                    <AppButton @click="$emit('cancel')" variant="secondary">Cancel</AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-form {
  width: 400px;
  background-color: var(--bg-white);
  border-radius: 8px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.buttons {  
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

</style>