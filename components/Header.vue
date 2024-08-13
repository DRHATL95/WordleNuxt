<template>
  <header class="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 right-0 z-10">
    <nav class="flex justify-between items-center max-w-screen-xl mx-auto px-4">
      <!-- Title on the left -->
      <h1 class="text-xl font-bold">My App</h1>

      <!-- Links on the right -->
      <div class="flex space-x-4">
        <NuxtLink to="/" class="hover:bg-gray-700 px-3 py-2 rounded">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:bg-gray-700 px-3 py-2 rounded">About</NuxtLink>
        <NuxtLink to="/profile" class="hover:bg-gray-700 px-3 py-2 rounded">Profile</NuxtLink>
        <button @click="logout" class="hover:bg-gray-700 px-3 py-2 rounded">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  router.push('/login');
};
</script>
