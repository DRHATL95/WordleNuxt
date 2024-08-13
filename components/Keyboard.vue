<template>
  <div id="keyboard" class="space-y-1">
    <div v-for="row in keyboardRows" :key="row" class="flex justify-center space-x-2">
      <div v-for="key in row.split('')" :key="key" class="key" @click="handleKeyPress(key)">
        {{ key }}
      </div>
    </div>
    <div class="flex justify-center">
      <div class="key enter-key" @click="handleEnter">Enter</div>
      <div class="key backspace-key" @click="handleBackspace">Backspace</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game';
import { onMounted, onBeforeUnmount } from 'vue';

const store = useGameStore();
const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

const handleKeyPress = (key: string) => {
  if (store.currentGuess.length < 5 && !store.gameEnded) {
    store.currentGuess += key;
  }
};

const handleBackspace = () => {
  if (store.currentGuess.length > 0 && !store.gameEnded) {
    store.currentGuess = store.currentGuess.slice(0, -1); // Remove the last character
  }
};

const handleEnter = async () => {
  if (store.currentGuess.length === 5 && store.currentRow < 6) {
    try {
      const data = await $fetch('/api/guess', {
        method: 'POST',
        body: { guess: store.currentGuess }
      });

      store.addGuess(store.currentGuess);
      store.currentGuess = ''; // Reset the current guess after submission

      if (data.success) {
        store.gameEnded = true;
        await $fetch('/api/score', {
          method: 'POST',
          body: { score: store.currentRow }
        });
      } else if (store.currentRow === 6) {
        store.gameEnded = true;
      }
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  }
};

// Handle physical keyboard input
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key.match(/^[a-z]$/i)) {
    handleKeyPress(event.key.toLowerCase());
  } else if (event.key === 'Enter') {
    handleEnter();
  } else if (event.key === 'Backspace') {
    handleBackspace();
  }
};

// Attach and detach event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
#keyboard {
  margin-top: 5px; /* Reduced spacing between board and keyboard */
}

.key {
  padding: 10px;
  margin: 2px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #ccc; /* Added border around keys */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #333;
}

.key:hover {
  background-color: #e0e0e0;
}

.enter-key, .backspace-key {
  width: calc(10 * 42px);
  text-align: center;
}
</style>
