<script setup>
import { PhClock } from '@phosphor-icons/vue'

defineProps({
  eventos: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="max-w-md mx-auto py-8 px-4">
    <h3 class="font-elegante text-3xl text-center mb-8 text-rose-900">Itinerario</h3>
    
    <div class="relative border-l-2 border-rose-200 ml-3 space-y-8">
      <div v-for="(evento, index) in eventos" :key="index" class="relative pl-8">
        
        <div class="absolute -left-[9px] top-1 bg-rose-500 w-4 h-4 rounded-full border-4 border-white shadow-sm"></div>
        
        <div class="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2 mb-1">
            <PhClock size="16" class="text-rose-400" weight="bold" />
            <span class="text-rose-600 font-bold font-mono">{{ evento.hora }}</span>
          </div>
          <h4 class="font-bold text-gray-800 text-lg">{{ evento.titulo }}</h4>
          <p class="text-sm text-gray-500 italic" v-if="evento.icono">{{ evento.icono }}</p> </div>
      </div>
    </div>
  </div>
</template>