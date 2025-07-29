<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import LeadCard from '@/components/LeadCard.vue'

interface Lead {
  id: number
  nombrecompleto: string
  correo: string
  telefono: string
  mensaje: string
  fecharegistro: string
  estado: 'nuevo' | 'contactado' | 'descartado'
}

const leads = ref<Lead[]>([])
const isLoading = ref(true)
const error = ref('')
const router = useRouter()

const fetchLeads = async () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    isLoading.value = true
    error.value = '' // Limpiar errores previos
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/leads`

    const response = await axios.get(apiUrl, {
      headers: {
        // Asegúrate de enviar el token correctamente
        Authorization: `Bearer ${token}`,
      },
    })
    leads.value = response.data
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      error.value = 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
      handleLogout() // Si el token no es válido, cerramos la sesión
    } else {
      error.value = 'No se pudieron cargar los leads.'
    }
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const updateLeadStatus = async (leadId: number, newStatus: Lead['estado']) => {
  const token = localStorage.getItem('authToken')
  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/leads/${leadId}/status`
    await axios.put(
      apiUrl,
      { estado: newStatus },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const lead = leads.value.find((l) => l.id === leadId)
    if (lead) {
      lead.estado = newStatus
    }
  } catch (err) {
    console.error('Error al actualizar el estado:', err)
    alert('No se pudo actualizar el estado del lead.')
  }
}

const handleLogout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}

// ... (resto de tus funciones como formatDate) ...
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Propiedades computadas para las estadísticas
const totalLeads = computed(() => leads.value.length)
const nuevosLeads = computed(() => leads.value.filter((l) => l.estado === 'nuevo').length)
const contactadosLeads = computed(() => leads.value.filter((l) => l.estado === 'contactado').length)

onMounted(fetchLeads)
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <aside class="w-64 bg-slate-800 text-white flex-shrink-0 flex flex-col">
      <div class="p-6">
        <h2 class="text-xl font-bold tracking-wider">MINI CRM</h2>
      </div>
      <nav class="mt-4 px-4 flex-1">
        <a href="#" class="flex items-center py-2 px-4 bg-slate-700 rounded-md">
          <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
          Dashboard
        </a>
      </nav>
      <div class="p-6">
        <button
          @click="handleLogout"
          class="w-full text-left flex items-center py-2 px-4 text-slate-300 hover:bg-slate-700 rounded-md"
        >
          <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow-sm p-6 border-b">
        <h1 class="text-3xl font-bold text-gray-900">Datos CRM</h1>
      </header>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-400">Total Leads</h3>
            <p class="text-3xl font-bold text-gray-900">{{ totalLeads }}</p>
          </div>
          <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-400">Nuevos</h3>
            <p class="text-3xl font-bold text-blue-600">{{ nuevosLeads }}</p>
          </div>
          <div class="bg-white p-5 rounded-xl shadow">
            <h3 class="text-sm font-semibold text-gray-400">Contactados</h3>
            <p class="text-3xl font-bold text-green-600">{{ contactadosLeads }}</p>
          </div>
        </div>

        <div v-if="isLoading" class="text-center">Cargando...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <LeadCard
            v-for="lead in leads"
            :key="lead.id"
            :lead="lead"
            @status-change="updateLeadStatus"
          />
        </div>
      </main>
    </div>
  </div>
</template>
