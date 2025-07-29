<script setup lang="ts">
// Definimos las propiedades que este componente recibirá
defineProps({
  lead: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['status-change'])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const handleStatusChange = (leadId: number, event: Event) => {
  const newStatus = (event.target as HTMLSelectElement).value
  emit('status-change', leadId, newStatus)
}
</script>

<template>
  <div class="bg-white p-5 rounded-xl shadow-md space-y-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="bg-blue-100 p-2 rounded-full">
          <svg
            class="h-5 w-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          ></svg>
        </div>
        <div>
          <h3 class="font-bold text-gray-900">{{ lead.nombrecompleto }}</h3>
          <p class="text-sm text-gray-500">{{ lead.correo }}</p>
        </div>
      </div>
      <span class="text-xs text-gray-400">{{ formatDate(lead.fecharegistro) }}</span>
    </div>

    <div class="border-t pt-3 space-y-2">
      <p class="text-sm text-gray-500">Tel: {{ lead.telefono }}</p>
      <p class="text-sm text-gray-700 bg-gray-50 p-2 rounded-md">{{ lead.mensaje }}</p>
    </div>

    <div>
      <label class="text-xs font-semibold text-gray-500">ESTADO</label>
      <select
        :value="lead.estado"
        @change="handleStatusChange(lead.id, $event)"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        :class="{
          'bg-blue-100 text-blue-800': lead.estado === 'nuevo',
          'bg-green-100 text-green-800': lead.estado === 'contactado',
          'bg-gray-200 text-gray-800': lead.estado === 'descartado',
        }"
      >
        <option>nuevo</option>
        <option>contactado</option>
        <option>descartado</option>
      </select>
    </div>
  </div>
</template>
