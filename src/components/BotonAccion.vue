<script setup>
// Definimos qué datos necesita este botón para funcionar
defineProps({
  texto: String,
  icono: Object, // Aquí pasaremos el icono
  url: String,   // El enlace a donde lleva
  color: {       // Opcional: para tener botones de distintos colores
    type: String,
    default: 'bg-slate-800' // Color por defecto (gris oscuro)
  }
})
</script>

<template>
  <a 
    :href="url" 
    target="_blank"
    class="flex items-center justify-center gap-3 px-6 py-4 rounded-full shadow-lg text-white font-medium transition-transform hover:scale-105 active:scale-95"
    :class="color"
  >
    <component :is="icono" size="24" weight="bold" />
    <span>{{ texto }}</span>
  </a>
</template>