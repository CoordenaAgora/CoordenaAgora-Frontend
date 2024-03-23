<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Login from './components/Login.vue'
</script>

<template>
  <header>

      <!-- <Login /> -->

      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
