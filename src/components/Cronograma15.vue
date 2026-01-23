<script setup>
import { PhClock } from '@phosphor-icons/vue'

defineProps({
  eventos: { type: Array, required: true },
  // Colores personalizables
  colorTitulo: { type: String, default: 'text-[#75527e]' },
  colorLinea:  { type: String, default: 'border-[#d8b4e2]' },
  colorCardBg: { type: String, default: 'bg-[#faf5fc]' },
  colorHora:   { type: String, default: 'text-[#9c78a6]' },
  colorTexto:  { type: String, default: 'text-[#665c69]' },
  fuenteTitulo: { type: String, default: 'font-seasons' },
  fuenteTexto: { type: String, default: 'font-cormorant' }
})
</script>

<template>
  <div class="max-w-2xl mx-auto py-4 px-4">
    
    <div class="relative border-l-2 border-dashed ml-6 md:ml-10 space-y-12 pb-10" :class="colorLinea">
      
      <div v-for="(evento, index) in eventos" :key="index" class="relative pl-12 md:pl-16">
        
        <div class="absolute -left-5 top-0 flex items-center justify-center w-14 h-14 z-10 transition-transform hover:scale-110 duration-300 bg-white rounded-full">
             <img 
               v-if="evento.icono"
               :src="evento.icono" 
               class="w-full h-full object-contain drop-shadow-md"
               alt="icono"
             />
             <div v-else class="w-4 h-4 rounded-full bg-[#75527e]"></div>
        </div>
        
        <div 
          class="relative p-5 rounded-[2rem] rounded-tl-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-white/50"
          :class="colorCardBg"
        >
          <div class="flex items-center gap-2 mb-2 opacity-80">
            <PhClock size="18" weight="bold" :class="colorHora" />
            <span class="font-bold text-lg" :class="[colorHora, fuenteTexto]">{{ evento.hora }}</span>
          </div>
          
          <h4 class="text-xl md:text-2xl font-medium leading-tight mb-1" :class="[colorTitulo, fuenteTitulo]">
            {{ evento.titulo || evento.actividad }}
          </h4>
          
          <p v-if="evento.descripcion" class="text-sm md:text-base leading-relaxed opacity-90" :class="[colorTexto, fuenteTexto]">
             {{ evento.descripcion }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>