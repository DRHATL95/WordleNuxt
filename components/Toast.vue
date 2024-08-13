<template>
  <div v-if="visible" class="toast-container">
    <div class="toast-message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { visible, message } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}

.toast-message {
  font-size: 16px;
}
</style>
