<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const route = useRoute()

// Propiedad computada que decide las clases según la ruta
const navClasses = computed(() => {
  if (route.meta.layout === 'crm') {
    // Estilos para el layout del CRM (sólido, estático)
    return 'bg-white shadow-md text-gray-800'
  }
  // Estilos por defecto para el layout público (transparente, absoluto)
  return 'bg-transparent text-white absolute'
})

// Clases dinámicas para los enlaces de texto
const linkClasses = computed(() => {
  return route.meta.layout === 'crm'
    ? 'text-gray-600 hover:text-blue-600'
    : 'text-white hover:text-gray-200'
})

const companyNameClasses = computed(() => {
  return route.meta.layout === 'crm' ? 'text-gray-800' : 'text-white'
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="top-0 left-0 w-full z-10" :class="navClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img class="h-10 w-auto" src="https://tailwindflex.com/images/logo.svg" alt="Logo" />
            <span class="ml-2 text-xl font-bold" :class="companyNameClasses">Name of Company</span>
          </router-link>
          <div class="hidden md:ml-10 md:flex md:space-x-8">
            <router-link to="/" :class="linkClasses" class="px-3 py-2 text-sm font-medium"
              >Inicio</router-link
            >
            <router-link to="/about" :class="linkClasses" class="px-3 py-2 text-sm font-medium"
              >Sobre Nosotros</router-link
            >
            <router-link to="/services" :class="linkClasses" class="px-3 py-2 text-sm font-medium"
              >Servicios</router-link
            >
            <router-link to="/contact" :class="linkClasses" class="px-3 py-2 text-sm font-medium"
              >Contacto</router-link
            >
          </div>
        </div>

        <div class="flex items-center">
          <div class="hidden md:flex">
            <router-link
              to="/login"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              CRM
            </router-link>
          </div>
          <div class="flex items-center md:hidden ml-4">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              :class="
                route.meta.layout === 'crm'
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-white hover:bg-gray-700'
              "
              @click="toggleMenu"
              :aria-expanded="isMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isMenuOpen" class="md:hidden">
      <div
        class="px-2 pt-2 pb-3 space-y-1"
        :class="route.meta.layout === 'crm' ? 'bg-white' : 'bg-gray-800 bg-opacity-90'"
      >
        <router-link
          to="/"
          :class="linkClasses"
          class="block px-3 py-2 rounded-md text-base font-medium"
          >Inicio</router-link
        >
        <router-link
          to="/about"
          :class="linkClasses"
          class="block px-3 py-2 rounded-md text-base font-medium"
          >Sobre Nosotros</router-link
        >
        <router-link
          to="/services"
          :class="linkClasses"
          class="block px-3 py-2 rounded-md text-base font-medium"
          >Servicios</router-link
        >
        <router-link
          to="/contact"
          :class="linkClasses"
          class="block px-3 py-2 rounded-md text-base font-medium"
          >Contacto</router-link
        >
        <router-link
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600"
          >CRM</router-link
        >
      </div>
    </div>
  </nav>
</template>
