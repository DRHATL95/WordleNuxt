<!-- pages/login.vue -->
<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold text-center mt-10">Login or Register</h1>
    <form @submit.prevent="login">
      <div class="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-2 mb-4 border border-gray-300 rounded" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-2 mb-4 border border-gray-300 rounded" />
        <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">Login</button>
        <button @click.prevent="register" type="button"
          class="w-full bg-blue-500 text-white p-2 rounded mt-4">Register</button>
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const supabase = useSupabaseClient();

definePageMeta({
  title: 'Login',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  layout: 'auth'
});

const register = async () => {
  const { error } = await supabase.auth.signUp({ email: email.value, password: password.value });
  if (error) {
    errorMessage.value = error.message;
  } else {
    errorMessage.value = '';
    router.push('/');
  }
};

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
  if (error) {
    errorMessage.value = error.message;
  } else {
    errorMessage.value = '';
    router.push('/');
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
