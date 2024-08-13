<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<style scoped>
/* Mobile styles */
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }

  .container {
    padding: 10px;
  }
}

/* Web styles */
@media (min-width: 601px) {
  body {
    font-size: 16px;
  }

  .container {
    padding: 20px;
  }
}
</style>
