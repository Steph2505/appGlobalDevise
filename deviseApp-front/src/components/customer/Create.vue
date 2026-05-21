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
                <div class="form-row buttons">
                <AppButton @click="handleSubmit" :loading="loading">Submit</AppButton>
                <AppButton @click="$emit('cancel')" type="secondary">Cancel</AppButton>
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
  padding: 20px;
}

.content-form {
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-row {
  display: flex;
  flex-direction: column;
}
.buttons {  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

</style>