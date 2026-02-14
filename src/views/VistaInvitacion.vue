<script setup>
import { computed, watchEffect, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as baseDeDatos from '../data/misClientes.js'

const PlantillaBoda01 = defineAsyncComponent(() => import('./PlantillaBoda01.vue'))
const PlantillaBoda02 = defineAsyncComponent(() => import('./PlantillaBoda02.vue'))
const PlantillaBoda03 = defineAsyncComponent(() => import('./PlantillaBoda03.vue'))
const PlantillaBoda04 = defineAsyncComponent(() => import('./PlantillaBoda04.vue'))
const PlantillaBoda05 = defineAsyncComponent(() => import('./PlantillaBoda05.vue'))

// --- 15 AÑOS ---
const PlantillaQuince01 = defineAsyncComponent(() => import('./PlantillaQuince01.vue'))
const PlantillaQuince02 = defineAsyncComponent(() => import('./PlantillaQuince02.vue'))
const PlantillaQuince03 = defineAsyncComponent(() => import('./PlantillaQuince03.vue'))

// --- INFANTIL ---
const PlantillaInfantil01 = defineAsyncComponent(() => import('./PlantillaInfantil01.vue'))
const PlantillaInfantil02 = defineAsyncComponent(() => import('./PlantillaInfantil02.vue'))
const PlantillaInfantil03 = defineAsyncComponent(() => import('./PlantillaInfantil03.vue'))

const route = useRoute()
const router = useRouter()

// BUSCADOR AUTOMÁTICO
const datosCliente = computed(() => {
  const idBuscado = route.params.id
  return Object.values(baseDeDatos).find(cliente => cliente.id === idBuscado) || null
})

  watchEffect(() => {
    if (datosCliente.value === null) {
      router.replace({ 
        name: 'NotFound',
        params: { pathMatch: route.path.substring(1).split('/') } 
      })
    }else {
        // Actualizar título sin librerías
        document.title = `Invitación: ${datosCliente.value.nombre} | Yupa Studio`
      }
    })
  // LÓGICA DE CADUCIDAD
  const estaVencida = computed(() => {
    if (!datosCliente.value) return false

    if (!datosCliente.value.expira) return false 

    const hoy = new Date()
    const fechaLimite = new Date(datosCliente.value.expira)

    return hoy > fechaLimite
  })

  // ELEGIR PLANTILLA
  const plantillaSeleccionada = computed(() => {
    if (!datosCliente.value) return null
    
    const estilo = datosCliente.value.modelo 
    switch (estilo) {
      // --- INFANTIL ---
      case 'baby-unicornio': return PlantillaInfantil01
      case 'baby-dino': return PlantillaInfantil02
      case 'huntrix': return PlantillaInfantil03
      // --- 15 AÑOS ---
      case 'xv-mariposa': return PlantillaQuince01
      case 'xv-neon': return PlantillaQuince02
      case 'xv-royal': return PlantillaQuince03
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
      <h1 class="text-4xl font-bold text-stone-300 mb-4" role="img" aria-label="Reloj de arena">⌛</h1>
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