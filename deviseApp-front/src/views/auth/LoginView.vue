<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composable/useAuth'
import AppInput from '@/components/globales/AppInput.vue'
import AppButton from '@/components/globales/AppButton.vue'

const { login, loading, errors } = useAuth()

const form = ref({
  email: '',
  password: '',
})

async function handleLogin() {
  await login(form.value)
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">
        <h1>DeviseApp</h1>
      </div>

      <p class="auth-subtitle">Connectez-vous à votre compte</p>

      <div class="auth-form">
        <AppInput
          v-model="form.email"
          label="Adresse email"
          type="email"
          placeholder="jean@example.com"
          :error="errors.email?.[0]"
          required
        />

        <AppInput
          v-model="form.password"
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          :error="errors.password?.[0]"
          required
        />
        <p v-if="errors.general" class="error-general">
          {{ errors.general }}
        </p>

        <AppButton variant="primary" :loading="loading" style="width: 100%" @click="handleLogin">
          Se connecter
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: var(--s-lg);
}

.auth-card {
  background: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: var(--s-2xl) var(--s-xl);
  width: 400px;
  max-width: 100%;
  box-shadow: var(--shadow-md);
}

.auth-logo {
  display: flex;
  align-items: center;
  gap: var(--s-sm);
  margin-bottom: var(--s-xs);
}

.auth-logo span {
  font-size: 28px;
}

.auth-logo h1 {
  font-size: var(--f-2xl);
  font-weight: var(--f-bold);
  color: var(--text);
}

.auth-subtitle {
  font-size: var(--f-base);
  color: var(--text-3);
  margin-bottom: var(--s-xl);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);
}

.error-general {
  font-size: var(--f-md);
  color: var(--danger);
}

@media (max-width: 480px) {
  .auth-page {
    padding: var(--s-md);
    align-items: flex-start;
    padding-top: var(--s-2xl);
  }

  .auth-card {
    padding: var(--s-xl) var(--s-lg);
    border-radius: var(--r-lg);
    box-shadow: none;
  }

  .auth-logo h1 {
    font-size: var(--f-xl);
  }
}
</style>
