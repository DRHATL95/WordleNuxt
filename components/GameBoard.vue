<template>
  <div id="grid-container" class="grid-container">
    <!-- Loop over each row (guess) -->
    <div v-for="(guess, rowIndex) in totalRows" :key="rowIndex" class="grid grid-cols-5 gap-2 row-padding">
      <!-- Loop over each tile in the row -->
      <div v-for="tileIndex in 5" :key="tileIndex - 1" :class="getLetterClass(rowIndex, tileIndex - 1)" class="tile">
        {{ getLetter(rowIndex, tileIndex - 1) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game';
import { computed } from 'vue';

const store = useGameStore();

// The total number of rows in the game board (6 guesses)
const totalRows = computed(() => Array.from({ length: 6 }));

// Get the letter for the specific tile in the grid
const getLetter = (rowIndex: number, tileIndex: number) => {
  if (rowIndex < store.guesses.length) {
    return store.guesses[rowIndex][tileIndex] || '';
  }
  // Display the current guess as it is being typed
  if (rowIndex === store.currentRow) {
    return store.currentGuess[tileIndex] || ''; // Ensure correct indexing
  }
  return '';
};

// Get the class for each tile based on the guess
const getLetterClass = (rowIndex: number, tileIndex: number) => {
  if (rowIndex < store.guesses.length) {
    const correctWord = store.wordOfTheDay;
    const letter = store.guesses[rowIndex][tileIndex];

    if (correctWord[tileIndex] === letter) {
      return 'correct';
    } else if (correctWord.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  }
  // Use 'empty' class for unguessed tiles and for the current guess being typed
  return 'empty';
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  padding-top: 5vh;
  padding-bottom: 10vh;
}

.row-padding {
  margin-bottom: 8px;
}

.tile {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #d4d4d4;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: bold;
  box-sizing: border-box;
}

.empty {
  background-color: #ffffff;
  color: #333;
}

.correct {
  background-color: #6aaa64;
  color: #ffffff;
}

.present {
  background-color: #c9b458;
  color: #ffffff;
}

.absent {
  background-color: #787c7e;
  color: #ffffff;
}
</style>
