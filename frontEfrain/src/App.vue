<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()

// Esta propiedad computada será `true` si la ruta es del CRM
const isCrmLayout = computed(() => route.meta.layout === 'crm')
</script>

<template>
  <div v-if="isCrmLayout">
    <RouterView />
  </div>

  <div v-else class="flex flex-col min-h-screen bg-gray-50">
    <NavBar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
