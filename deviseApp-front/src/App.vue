<script setup>
import { RouterView } from 'vue-router'
import AppToast from '@/components/globales/AppToast.vue'
</script>

<template>
  <RouterView />
  <AppToast />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  background: #f5f5f5;
  color: #333;
}
</style>
