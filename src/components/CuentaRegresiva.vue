<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  fechaObjetivo: String // Formato: '2025-12-25T18:00:00'
})

// Variables reactivas
const tiempoRestante = ref(0)
let intervalo = null

// Función que calcula la diferencia
const calcularTiempo = () => {
  const ahora = new Date().getTime()
  const destino = new Date(props.fechaObjetivo).getTime()
  const diferencia = destino - ahora
  tiempoRestante.value = diferencia > 0 ? diferencia : 0
}

// Convertir milisegundos a Días, Horas, Min, Seg
const dias = computed(() => Math.floor(tiempoRestante.value / (1000 * 60 * 60 * 24)))
const horas = computed(() => Math.floor((tiempoRestante.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutos = computed(() => Math.floor((tiempoRestante.value % (1000 * 60 * 60)) / (1000 * 60)))
const segundos = computed(() => Math.floor((tiempoRestante.value % (1000 * 60)) / 1000))

// Iniciar el reloj al montar el componente
onMounted(() => {
  calcularTiempo()
  intervalo = setInterval(calcularTiempo, 1000)
})

// Limpiar el reloj al salir (para no gastar memoria)
onUnmounted(() => clearInterval(intervalo))
</script>

<template>
  <div class="flex justify-center gap-4 text-center">
    <div class="flex flex-col items-center bg-white/80 p-3 rounded-lg w-16 shadow-sm">
      <span class="text-2xl font-bold text-gray-800">{{ dias }}</span>
      <span class="text-xs uppercase text-gray-500">Días</span>
    </div>
    <div class="flex flex-col items-center bg-white/80 p-3 rounded-lg w-16 shadow-sm">
      <span class="text-2xl font-bold text-gray-800">{{ horas }}</span>
      <span class="text-xs uppercase text-gray-500">Hs</span>
    </div>
    <div class="flex flex-col items-center bg-white/80 p-3 rounded-lg w-16 shadow-sm">
      <span class="text-2xl font-bold text-gray-800">{{ minutos }}</span>
      <span class="text-xs uppercase text-gray-500">Min</span>
    </div>
    <div class="flex flex-col items-center bg-white/80 p-3 rounded-lg w-16 shadow-sm">
      <span class="text-2xl font-bold text-rose-500">{{ segundos }}</span>
      <span class="text-xs uppercase text-gray-500">Seg</span>
    </div>
  </div>
</template>