<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <div>
          <NuxtLink to="/" class="text-xl font-bold">Wordle Game</NuxtLink>
        </div>
        <div v-if="user" class="flex items-center">
          <span class="mr-4">Logged in as: {{ user.email }}</span>
          <button @click="logout" class="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
        <div v-else>
          <NuxtLink to="/login" class="bg-blue-500 px-4 py-2 rounded">Login</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto mt-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
  await supabase.auth.signOut();
  router.push('/login');
};
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
}

nav a {
  color: #fff;
}

nav a:hover {
  text-decoration: underline;
}
</style>
