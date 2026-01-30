<script setup>
defineProps({
  texto: String,
  icono: Object,
  url: String,
  // Ahora 'color' controlará fondo, texto, borde y hover
  color: { 
    type: String,
    // Movemos 'text-white' aquí para que sea el defecto, pero se pueda cambiar
    default: 'bg-slate-800 text-white hover:bg-slate-700' 
  }
})
</script>

<template>
  <a 
    :href="url" 
    target="_blank"
    class="flex items-center justify-center gap-3 px-6 py-4 rounded-full shadow-lg font-medium transition-transform duration-300 hover:scale-105 active:scale-95"
    :class="color"
  >
    <component :is="icono" size="24" weight="bold" />
    <span class="tracking-wide uppercase text-sm">{{ texto }}</span>
  </a>
</template>