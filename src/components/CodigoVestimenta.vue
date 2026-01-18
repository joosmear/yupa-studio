<script setup>
import { PhCoatHanger, PhWarningCircle } from '@phosphor-icons/vue'

defineProps({
  tipo: String, // Ej: "Formal"
  nota: String, // Ej: "No niños"
  
  // --- COLORES PERSONALIZABLES ---
  // Valores por defecto = Estilo Clásico (Marsala)
  
  // El fondo de la tarjeta
  colorFondo: { type: String, default: 'bg-stone-50' },
  colorBorde: { type: String, default: 'border-stone-100' },
  
  // El círculo detrás del gancho
  colorCirculo: { type: String, default: 'bg-white shadow-sm' },
  colorIcono:   { type: String, default: 'text-stone-800' },
  
  // Textos
  colorTitulo:  { type: String, default: 'text-stone-800' },
  colorResalte: { type: String, default: 'text-rose-600' }, // El tipo de ropa
  
  // La nota de abajo
  colorNotaBg:    { type: String, default: 'bg-white' },
  colorNotaTexto: { type: String, default: 'text-stone-500' }
})
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-8 text-center">
    
    <div class="rounded-2xl p-8 border shadow-sm transition-all hover:shadow-md"
         :class="[colorFondo, colorBorde]">
      
      <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 icon-draw"
           :class="[colorCirculo, colorIcono]">
        <PhCoatHanger size="48" weight="thin" />
      </div>

      <h3 class="font-elegante text-2xl mb-3" :class="colorTitulo">
        Código de Vestimenta
      </h3>
      
      <p class="text-xl font-bold uppercase tracking-widest mb-6" :class="colorResalte">
        {{ tipo }}
      </p>
      
      <div v-if="nota" 
           class="inline-flex items-center gap-2 text-sm py-2 px-4 rounded-full shadow-sm"
           :class="[colorNotaBg, colorNotaTexto]">
        <PhWarningCircle size="18" weight="fill" class="opacity-80" />
        <span>{{ nota }}</span>
      </div>

    </div>
  </div>
</template>