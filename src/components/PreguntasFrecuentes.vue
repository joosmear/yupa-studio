<script setup>
import { ref } from 'vue'
import { PhQuestion, PhCaretDown, PhWhatsappLogo, PhSparkle } from '@phosphor-icons/vue'

// Props: Recibe los datos y configuración de colores
const props = defineProps({
  datos: {
    type: Array,
    required: true
  },
  // Color del texto principal del tema (ej: text-rose-500)
  tema: {
    type: String,
    default: "text-rose-500" 
  },
  // Color de fondo suave para la pregunta activa (ej: bg-rose-50)
  fondoActivo: {
    type: String,
    default: "bg-rose-50"
  }
})

const faqAbierta = ref(0) // La primera abierta por defecto, o -1 para ninguna

const toggleFaq = (index) => {
  faqAbierta.value = faqAbierta.value === index ? -1 : index
}
</script>

<template>
  <section id="faq" class="py-24 px-6 bg-white relative">
      
      <div class="max-w-3xl mx-auto">
        
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-100 text-stone-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <PhSparkle weight="fill" class="text-stone-400" />
            Resolvemos tus dudas
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-stone-800 tracking-tight">
            Preguntas Frecuentes
          </h2>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(faq, index) in datos" 
            :key="index" 
            class="rounded-[2rem] transition-all duration-500 overflow-hidden border border-transparent"
            :class="[
              faqAbierta === index ? `${fondoActivo} shadow-sm` : 'bg-white hover:bg-stone-50 border-stone-100'
            ]"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
            >
              <span 
                class="font-bold text-lg transition-colors duration-300 pr-4"
                :class="faqAbierta === index ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'"
              >
                {{ faq.pregunta }}
              </span>
              
              <div 
                class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                :class="faqAbierta === index ? 'bg-white shadow-sm rotate-180' : 'bg-stone-100 group-hover:bg-white group-hover:shadow-sm'"
              >
                <PhCaretDown 
                  :size="20" 
                  class="transition-colors duration-300"
                  :class="faqAbierta === index ? tema : 'text-stone-400'" 
                  weight="bold"
                />
              </div>
            </button>

            <div 
              v-show="faqAbierta === index" 
              class="px-6 md:px-8 pb-8 text-stone-600 leading-relaxed animate-slide-down"
            >
              <p class="text-base md:text-lg font-light border-l-2 pl-4 border-stone-300/50">
                {{ faq.respuesta }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-16">
          <p class="mb-4 text-stone-400 text-sm font-medium">¿No encuentras lo que buscas?</p>
          <a 
            href="https://wa.me/59164042420" 
            class="group inline-flex items-center gap-3 font-bold bg-white border border-stone-200 px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:border-stone-300 hover:-translate-y-1"
            :class="tema"
          >
            <PhWhatsappLogo :size="24" weight="duotone" class="group-hover:scale-110 transition-transform"/> 
            <span>Hablar con un asesor</span>
          </a>
        </div>

      </div>
    </section>
</template>

<style scoped>
/* Animación suave de deslizamiento */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>