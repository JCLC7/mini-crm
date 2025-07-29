<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import About from '@/views/AboutView.vue'
import Services from '@/views/ServicesVue.vue'
import Contact from '@/views/ContactView.vue'
</script>

<template>
  <Navbar />
  <main class="flex-grow">
    <Hero></Hero>
    <About />
    <Services />
    <Contact />
  </main>
</template>
