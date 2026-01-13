<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// Importamos tu base de datos y la plantilla
import { bodaJuan, bodaPedro } from '../data/misClientes.js'
import PlantillaBoda01 from './PlantillaBoda01.vue'

const route = useRoute()

// Buscamos al cliente según lo que diga la URL
const datosCliente = computed(() => {
  const idCliente = route.params.id // Esto lee "juan" o "pedro" de la URL
  
  if (idCliente === 'juan') return bodaJuan
  if (idCliente === 'pedro') return bodaPedro
  
  return null // Si no encuentra a nadie
})
</script>

<template>
  <PlantillaBoda01 v-if="datosCliente" :datos="datosCliente" />
  
  <div v-else class="h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800">404</h1>
      <p class="text-gray-600">Invitación no encontrada</p>
      <router-link to="/" class="text-blue-600 underline mt-4 block">Volver al inicio</router-link>
    </div>
  </div>
</template>