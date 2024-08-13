<template>
  <div id="keyboard" class="space-y-1">
    <div v-for="row in keyboardRows" :key="row" class="flex justify-center space-x-2">
      <div v-for="key in row.split('')" :key="key" class="key" @click="handleKeyPress(key)">
        {{ key }}
      </div>
    </div>
    <div class="flex justify-center space-x-2">
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
    store.currentGuess = store.currentGuess.slice(0, -1);
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
      store.currentGuess = '';

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
  margin-top: 5px;
}

/* General Key Styles */
.key {
  padding: 10px;
  margin: 2px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

/* Adjust key sizes for different screen sizes */
@media (min-width: 601px) {
  .key {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }

  .enter-key,
  .backspace-key {
    width: calc(8 * 50px);
    /* Slightly reduced size */
    font-size: 16px;
    /* Slightly reduced font size */
  }
}

@media (max-width: 600px) {
  .key {
    width: 35px;
    /* Smaller key size on mobile */
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
</style>
