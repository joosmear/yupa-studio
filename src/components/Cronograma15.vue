<script setup>
import { PhClock } from '@phosphor-icons/vue'
import IconoMascara from './IconoMascara.vue'

defineProps({
  eventos: { type: Array, required: true },
  
  // --- COLORES DE TEXTO Y TARJETA ---
  colorTitulo: { type: String, default: 'text-[#75527e]' },
  colorLinea:  { type: String, default: 'border-[#d8b4e2]' },
  colorCardBg: { type: String, default: 'bg-[#faf5fc]' },
  colorHora:   { type: String, default: 'text-[#9c78a6]' },
  colorTexto:  { type: String, default: 'text-[#665c69]' },
  
  // --- PERSONALIZACIÓN DEL CÍRCULO (ICONO) ---
  // Color del icono en sí (la máscara)
  colorIcono:     { type: String, default: 'bg-[#75527e]' }, 
  // Tamaño del círculo (ej: w-14 h-14 o w-20 h-20)
  tamanoCirculo:  { type: String, default: 'w-14 h-14' },
  // Color de fondo del círculo (ej: bg-white o bg-black)
  colorCirculo:   { type: String, default: 'bg-white' },
  // Borde del círculo (ej: border-white o border-cyan-500)
  bordeCirculo:   { type: String, default: 'border-white' },
  // Desplazamiento a la izquierda (ej: -left-5 o -left-8)
  offsetCirculo:  { type: String, default: '-left-5' },

  fuenteTitulo: { type: String, default: 'font-seasons' },
  fuenteTexto:  { type: String, default: 'font-cormorant' }
})
</script>

<template>
  <div class="max-w-2xl mx-auto py-4 px-4">
    
    <div class="relative border-l-2 border-dashed ml-6 md:ml-10 space-y-12 pb-10" :class="colorLinea">
      
      <div v-for="(evento, index) in eventos" :key="index" class="relative pl-12 md:pl-16">
        
        <div 
          class="absolute top-0 flex items-center justify-center z-10 transition-transform hover:scale-110 duration-300 rounded-full shadow-sm border"
          :class="[tamanoCirculo, colorCirculo, bordeCirculo, offsetCirculo]"
        >
             <div v-if="evento.icono" class="w-full h-full p-[20%]">
                <IconoMascara 
                  :src="evento.icono" 
                  :claseColor="colorIcono" 
                />
             </div>

             <div v-else class="w-1/4 h-1/4 rounded-full" :class="colorIcono"></div>
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