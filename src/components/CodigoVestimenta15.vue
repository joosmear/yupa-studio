<script setup>
import IconoAnimado from './IconoAnimado.vue'

defineProps({
  nota: { type: String, default: '' },
  // NUEVO: 'tipo' reemplazará al subtítulo "Elegante & Juvenil"
  tipo: { type: String, default: 'Elegante & Juvenil' }, 
  
  // NUEVOS: Para cambiar el texto de las tarjetas si el cliente quiere ser específico
  labelHombres: { type: String, default: 'Traje Formal' },
  labelMujeres: { type: String, default: 'Vestido Largo' },

  imgHombres: { type: String, default: '/assets/iconos/traje.png' },
  imgMujeres: { type: String, default: '/assets/iconos/vestido.png' }
})
</script>

<template>
  <section class="py-16 px-6 relative overflow-hidden">
    
    <div class="text-center mb-12 space-y-2">
      <h3 class="font-seasons text-4xl md:text-5xl text-[#75527e]">
        Código de Vestimenta
      </h3>
      <p class="font-cormorant text-xl text-[#a37ab0] italic capitalize">
        {{ tipo }}
      </p>
    </div>

    <div class="max-w-3xl mx-auto grid grid-cols-2 gap-6 md:gap-12">
      
      <div class="bg-white rounded-[2rem] p-6 text-center shadow-sm border border-[#75527e]/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
        <div class="w-24 h-24 mx-auto mb-4 bg-[#faf5fc] rounded-full flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300">
          <IconoAnimado 
            :src="imgHombres" 
            class="w-full h-full text-[#75527e] opacity-90"
          />
        </div>
        <h4 class="font-seasons text-xl text-[#75527e] mb-1">Caballeros</h4>
        <p class="font-cormorant text-stone-600 font-bold capitalize">{{ labelHombres }}</p>
      </div>

      <div class="bg-white rounded-[2rem] p-6 text-center shadow-sm border border-[#75527e]/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
        <div class="w-24 h-24 mx-auto mb-4 bg-[#faf5fc] rounded-full flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300">
          <IconoAnimado 
            :src="imgMujeres" 
            class="w-full h-full text-[#75527e] opacity-90"
          />
        </div>
        <h4 class="font-seasons text-xl text-[#75527e] mb-1">Damas</h4>
        <p class="font-cormorant text-stone-600 font-bold capitalize">{{ labelMujeres }}</p>
      </div>

    </div>

    <div v-if="nota" class="text-center mt-10 max-w-xl mx-auto">
      <p class="font-cormorant text-[#665c69] italic bg-[#faf5fc] py-2 px-6 rounded-full inline-block text-sm border border-[#d8b4e2]/50">
        Nota: {{ nota }}
      </p>
    </div>

  </section>
</template>