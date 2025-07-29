<template>
  <footer class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <div class="flex items-center">
            <img
              class="h-10 w-auto"
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo de la Compañía"
            />
            <span class="ml-3 text-xl font-bold">Name of Company</span>
          </div>
          <p class="text-gray-400 text-base">
            Gestionando tus leads para convertir oportunidades en éxito.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                Navegación
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <router-link to="/about" class="text-base text-gray-400 hover:text-white"
                    >Sobre Nosotros</router-link
                  >
                </li>
                <li>
                  <router-link to="/services" class="text-base text-gray-400 hover:text-white"
                    >Servicios</router-link
                  >
                </li>
                <li>
                  <router-link to="/contact" class="text-base text-gray-400 hover:text-white"
                    >Contacto</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-400 hover:text-white"
                    >Aviso de Privacidad</a
                  >
                </li>
                <li>
                  <a href="#" class="text-base text-gray-400 hover:text-white"
                    >Términos y Condiciones</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-700 pt-8">
        <p class="text-base text-gray-400 xl:text-center">
          &copy; {{ new Date().getFullYear() }} Name of Company. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No se necesita lógica de script para este componente estático
</script>
