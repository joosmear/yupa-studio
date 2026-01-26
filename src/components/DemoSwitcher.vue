<script setup>
import { ref } from 'vue'
import { PhHeart, PhStar, PhCrown, PhX } from '@phosphor-icons/vue'

const emit = defineEmits(['cambioPlan'])

const planes = [
  { id: 'esencial', nombre: 'Esencial', icono: PhHeart },
  { id: 'gold', nombre: 'Gold', icono: PhStar },
  { id: 'premium', nombre: 'Premium', icono: PhCrown }
]

const planActivo = ref('premium') // Empezamos mostrando TODO (Premium)
const visible = ref(true)

const seleccionarPlan = (id) => {
  planActivo.value = id
  emit('cambioPlan', id)
}
</script>

<template>
  <div v-if="visible" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
    
    <div class="text-center mb-3 animate-bounce">
       <span class="bg-stone-900 text-white text-[10px] px-3 py-1 rounded-full shadow-lg uppercase tracking-widest font-bold">
         Prueba los planes aquí 👇
       </span>
    </div>

    <div class="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full p-2 flex justify-between items-center relative ring-1 ring-black/5">
      
      <button 
        v-for="plan in planes" 
        :key="plan.id"
        @click="seleccionarPlan(plan.id)"
        class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-xs font-bold uppercase tracking-wide"
        :class="planActivo === plan.id 
          ? 'bg-rose-600 text-white shadow-lg scale-105' 
          : 'text-stone-500 hover:bg-stone-100'"
      >
        <component :is="plan.icono" weight="fill" size="16" />
        {{ plan.nombre }}
      </button>

      <button @click="visible = false" class="absolute -right-2 -top-2 bg-stone-200 text-stone-500 rounded-full p-1 hover:bg-red-500 hover:text-white transition shadow-sm">
        <PhX size="12" weight="bold"/>
      </button>
    </div>

    <div class="text-center mt-2">
      <p v-if="planActivo === 'esencial'" class="text-[10px] text-stone-500 bg-white/80 inline-block px-2 rounded-md shadow-sm">
        Vista Básica: Sin Galería ni Música
      </p>
      <p v-if="planActivo === 'gold'" class="text-[10px] text-amber-600 bg-white/80 inline-block px-2 rounded-md shadow-sm">
        Vista Gold: Con Galería y Cronograma
      </p>
      <p v-if="planActivo === 'premium'" class="text-[10px] text-purple-600 bg-white/80 inline-block px-2 rounded-md shadow-sm">
        Vista Premium: Experiencia Completa
      </p>
    </div>

  </div>
</template>