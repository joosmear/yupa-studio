<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import * as baseDeDatos from '../data/misClientes.js'

// Importar los diseños
import PlantillaBoda01 from './PlantillaBoda01.vue'
import PlantillaBoda02 from './PlantillaBoda02.vue'
import PlantillaBoda03 from './PlantillaBoda03.vue'
import PlantillaBoda04 from './PlantillaBoda04.vue'
import PlantillaBoda05 from './PlantillaBoda05.vue'
import PlantillaQuince01 from './PlantillaQuince01.vue'

const route = useRoute()

// 2. BUSCADOR AUTOMÁTICO
const datosCliente = computed(() => {
  const idBuscado = route.params.id
  
  // Convierte la base de datos en una lista y busca quién tiene ese ID
  // No importa si agregas 100 clientes, esto los encontrará solos.
  return Object.values(baseDeDatos).find(cliente => cliente.id === idBuscado) || null
})

// 3. LÓGICA DE CADUCIDAD (NUEVO)
const estaVencida = computed(() => {
  if (!datosCliente.value) return false
  
  // Si no tiene fecha de expiración (como los demos), nunca vence
  if (!datosCliente.value.expira) return false 

  const hoy = new Date()
  const fechaLimite = new Date(datosCliente.value.expira)
  
  return hoy > fechaLimite // Devuelve TRUE si ya pasó la fecha
})

// 4. ELEGIR PLANTILLA
const plantillaSeleccionada = computed(() => {
  if (!datosCliente.value) return null
  
  const estilo = datosCliente.value.modelo 
  switch (estilo) {
    // --- 15 AÑOS ---
    case 'xv-mariposa': return PlantillaQuince01
    // --- BODAS ---
    case 'gala': return PlantillaBoda02
    case 'boho': return PlantillaBoda03
    case 'ligth': return PlantillaBoda04
    case 'dreams': return PlantillaBoda05
    case 'clasica': default: return PlantillaBoda01
  }
})
</script>

<template>
  <div v-if="datosCliente && estaVencida" class="h-screen flex flex-col items-center justify-center bg-stone-100 px-6 text-center">
    <div class="bg-white p-10 rounded-2xl shadow-xl max-w-md">
      <h1 class="text-4xl font-bold text-stone-300 mb-4">⌛</h1>
      <h2 class="text-2xl font-bold text-stone-800 mb-2">Invitación Caducada</h2>
      <p class="text-stone-500 mb-6">El tiempo de visualización de esta invitación ha finalizado.</p>
      <router-link to="/" class="text-rose-600 font-bold hover:underline">Ir a Yupa Studio</router-link>
    </div>
  </div>

  <component 
    v-else-if="datosCliente" 
    :is="plantillaSeleccionada" 
    :datos="datosCliente" 
  />

  <div v-else class="h-screen flex flex-col items-center justify-center bg-stone-100 text-stone-600">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl">Invitación no encontrada.</p>
    <router-link to="/" class="mt-8 px-6 py-2 bg-rose-600 text-white rounded-full">Volver al Inicio</router-link>
  </div>
</template>