import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    wordOfTheDay: '',
    currentGuess: '',
    guesses: [] as string[],
    currentRow: 0,
    gameEnded: false,
  }),
  actions: {
    setWordOfTheDay(word: string) {
      this.wordOfTheDay = word;
    },
    addGuess(guess: string) {
      if (this.currentRow < 6 && !this.gameEnded) {
        this.guesses.push(guess);
        this.currentRow++;
      }
    },
    resetGame() {
      this.currentGuess = '';
      this.guesses = [];
      this.currentRow = 0;
      this.gameEnded = false;
    },
  },
});
