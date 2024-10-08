<template>
  <div v-if="!user" class="text-center mt-10">
    <p>Please <NuxtLink to="/login" class="text-blue-500 underline">login</NuxtLink> to play the game.</p>
  </div>
  <div v-else class="game-area">
    <GameBoard />
    <Keyboard />
    <Toast />
    <Modal :visible="isModalVisible" :title="modalTitle" :content="modalContent" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game';
import { onMounted, ref, watch } from 'vue';
import GameBoard from '~/components/GameBoard.vue';
import Keyboard from '~/components/Keyboard.vue';
import Toast from '~/components/Toast.vue';
import Modal from '~/components/Modal.vue';

const store = useGameStore();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { wordOfTheDay, gameEnded } = storeToRefs(store);
const toast = useToast();

const isModalVisible = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

const openModal = (title: string, content: string) => {
  modalTitle.value = title;
  modalContent.value = content;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  const wordData = await $fetch('/api/wordOfTheDay');

  if (wordData.word) {
    store.setWordOfTheDay(wordData.word);
  } else {
    console.error('Failed to fetch word of the day');
  }
});

// Watch for game end to trigger the modal
watch(gameEnded, (newVal) => {
  if (newVal) {
    openModal('Game Over', `The word was ${wordOfTheDay.value}. Thank you for playing!`);
  }
});
</script>

<style scoped>
.game-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 70vh;
  margin-top: 10vh;
}

/* Mobile styles */
@media (max-width: 600px) {
  .game-area {
    margin-top: 20vh;
    /* Increased margin-top to move content down */
  }

  .tile {
    width: 35px;
    /* Smaller key size on mobile */
    height: 35px;
    font-size: 14px;
  }

  .key {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .enter-key,
  .backspace-key {
    width: calc(5 * 35px);
    /* Reduced size on mobile */
    font-size: 12px;
    /* Smaller font size for mobile */
  }
}

/* Web styles */
@media (min-width: 601px) {
  .game-area {
    margin-top: 10vh;
  }

  .tile {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }

  .key {
    width: 50px;
    height: 50px;
    font-size: 16px;
  }

  .enter-key,
  .backspace-key {
    width: calc(8 * 50px);
    /* Adjusted size */
    font-size: 16px;
  }
}
</style>
