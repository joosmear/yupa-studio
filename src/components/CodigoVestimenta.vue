<script setup>
import { PhCoatHanger, PhWarningCircle } from '@phosphor-icons/vue'

defineProps({
  tipo: String, // Ej: "Formal", "Etiqueta"
  nota: String  // Ej: "Por favor no usar color blanco"
})
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-8 text-center">
    <div class="bg-stone-50 rounded-2xl p-8 border border-stone-100 shadow-sm">
      
      <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-stone-700">
        <PhCoatHanger size="32" weight="light" />
      </div>

      <h3 class="font-elegante text-2xl text-stone-800 mb-2">Código de Vestimenta</h3>
      <p class="text-xl font-bold text-rose-600 uppercase tracking-widest mb-4">{{ tipo }}</p>
      
      <div v-if="nota" class="flex items-center justify-center gap-2 text-sm text-stone-500 bg-white py-2 px-4 rounded-full inline-block shadow-sm">
        <PhWarningCircle size="18" class="text-amber-500" />
        <span>{{ nota }}</span>
      </div>

    </div>
  </div>
</template>