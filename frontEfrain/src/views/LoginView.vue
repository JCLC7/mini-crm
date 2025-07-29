<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  if (!username.value || !password.value) {
    error.value = 'Por favor, introduce usuario y contraseña.'
    return
  }

  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/login`
    const response = await axios.post(apiUrl, {
      username: username.value,
      password: password.value,
    })

    // Si el login es exitoso, guarda el token en el almacenamiento local
    localStorage.setItem('authToken', response.data.token)

    // Redirige al dashboard
    router.push('/dashboard')
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      error.value = 'Credenciales inválidas.'
    } else {
      error.value = 'Ocurrió un error en el servidor.'
    }
    console.error(err)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">CRM Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div v-if="error" class="text-sm text-center text-red-600">
          {{ error }}
        </div>
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
