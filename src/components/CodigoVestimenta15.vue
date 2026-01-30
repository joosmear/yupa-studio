<script setup>
import IconoMascara from './IconoMascara.vue'

defineProps({
  nota: { type: String, default: '' },
  tipo: { type: String, default: 'Elegante' }, 
  
  labelHombres: { type: String, default: 'Traje Formal' },
  labelMujeres: { type: String, default: 'Vestido Largo' },

  imgHombres: { type: String, default: '/assets/iconos/suit.png' },
  imgMujeres: { type: String, default: '/assets/iconos/dress.png' },

  // --- NUEVAS PROPS DE PERSONALIZACIÓN ---
  colorTitulo: { type: String, default: 'text-[#75527e]' },
  colorIcono:  { type: String, default: 'bg-white' },
  
  // Control del círculo contenedor
  tamanoCirculo: { type: String, default: 'w-24 h-24' },
  colorCirculo:  { type: String, default: 'bg-white' },
  bordeCirculo:  { type: String, default: 'border-white' },
  
  colorTexto:  { type: String, default: 'text-stone-600' },
  colorBordeCard: { type: String, default: 'border-white/10' },
  colorFondoCard: { type: String, default: 'bg-white' },
  
  ocultarTitulo: { type: Boolean, default: false }
})
</script>

<template>
  <section class="py-10 px-4 relative overflow-hidden">
    
    <div v-if="!ocultarTitulo" class="text-center mb-12 space-y-2">
      <h3 class="font-modern text-4xl" :class="colorTitulo">
        Código de Vestimenta
      </h3>
      <p class="font-sans text-xl italic uppercase tracking-widest opacity-70">
        {{ tipo }}
      </p>
    </div>

    <div class="max-w-3xl mx-auto grid grid-cols-2 gap-4 md:gap-12">
      
      <div 
        class="rounded-[2rem] p-4 md:p-8 text-center shadow-sm transition-all duration-300 group border"
        :class="[colorFondoCard, colorBordeCard]"
      >
        <div 
          class="mx-auto mb-6 rounded-full flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110 border"
          :class="[tamanoCirculo, colorCirculo, bordeCirculo]"
        >
          <div class="w-full h-full">
             <IconoMascara :src="imgHombres" :claseColor="colorIcono" />
          </div>
        </div>
        
        <h4 class="font-modern text-lg md:text-xl mb-1 uppercase tracking-tighter" :class="colorTitulo">Caballeros</h4>
        <p class="text-xs md:text-sm font-bold opacity-80" :class="colorTexto">{{ labelHombres }}</p>
      </div>

      <div 
        class="rounded-[2rem] p-4 md:p-8 text-center shadow-sm transition-all duration-300 group border"
        :class="[colorFondoCard, colorBordeCard]"
      >
        <div 
          class="mx-auto mb-6 rounded-full flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110 border"
          :class="[tamanoCirculo, colorCirculo, bordeCirculo]"
        >
          <div class="w-full h-full">
             <IconoMascara :src="imgMujeres" :claseColor="colorIcono" />
          </div>
        </div>

        <h4 class="font-modern text-lg md:text-xl mb-1 uppercase tracking-tighter" :class="colorTitulo">Damas</h4>
        <p class="text-xs md:text-sm font-bold opacity-80" :class="colorTexto">{{ labelMujeres }}</p>
      </div>

    </div>

    <div v-if="nota" class="text-center mt-12 max-w-xl mx-auto">
      <p class="font-sans italic py-2 px-6 rounded-full inline-block text-sm border border-white/10 bg-white/5 text-gray-400">
        Nota: {{ nota }}
      </p>
    </div>

  </section>
</template>