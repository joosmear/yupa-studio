<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhQuotes, PhStar } from '@phosphor-icons/vue'

const props = defineProps({
  datos: {
    type: Array,
    required: true
  },
  titulo: {
    type: String,
    default: "Lo que dicen los clientes"
  },
  // Color de acento para los puntos activos y textos destacados
  temaColor: {
    type: String,
    default: "bg-rose-500" 
  },
  temaTexto: {
    type: String,
    default: "text-rose-400" 
  }
})

const testimonioActual = ref(0)
let intervaloSlider

const siguienteTestimonio = () => {
  testimonioActual.value = (testimonioActual.value + 1) % props.datos.length
}

onMounted(() => {
  intervaloSlider = setInterval(siguienteTestimonio, 5000)
})

onUnmounted(() => {
  clearInterval(intervaloSlider)
})
</script>

<template>
  <section class="py-24 px-6 bg-[#0F1420] overflow-hidden relative border-t border-white/5">
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <PhQuotes :size="200" weight="fill" class="absolute top-12 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none text-white" />

      <div class="max-w-4xl mx-auto relative z-10 text-center">
        <h2 class="text-3xl font-bold text-white mb-12 tracking-tight">{{ titulo }}</h2>

        <div class="relative h-72 md:h-56 flex items-center justify-center">
          <transition name="fade" mode="out-in">
            <div 
              :key="testimonioActual"
              class="max-w-2xl mx-auto px-4"
            >
              <div class="flex justify-center gap-1 mb-8">
                <PhStar v-for="n in 5" :key="n" weight="fill" class="text-amber-400 text-xl drop-shadow-md" />
              </div>
              
              <p class="text-xl md:text-2xl text-stone-300 italic mb-8 font-serif leading-relaxed drop-shadow-sm">
                "{{ datos[testimonioActual].texto }}"
              </p>
              
              <div>
                <p class="font-bold text-white text-lg tracking-wide">{{ datos[testimonioActual].pareja }}</p>
                
                <p class="text-xs font-bold uppercase tracking-[0.2em] mt-2 opacity-90" :class="temaTexto">
                  {{ datos[testimonioActual].boda }}
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div class="flex justify-center gap-3 mt-10">
          <button 
            v-for="(t, index) in datos" 
            :key="index"
            @click="testimonioActual = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="testimonioActual === index ? `${temaColor} w-8 shadow-[0_0_15px_rgba(255,255,255,0.3)]` : 'bg-white/20 hover:bg-white/40'"
          ></button>
        </div>
      </div>
    </section>
</template>

<style scoped>
/* Animación suave de desvanecimiento */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>