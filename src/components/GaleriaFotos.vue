<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhX, PhCaretLeft, PhCaretRight, PhCamera } from '@phosphor-icons/vue'

const props = defineProps({
  fotos: {
    type: Array,
    required: true
  },
  colorIcono: { type: String, default: 'text-rose-400' },
  colorTitulo: { type: String, default: 'text-stone-800' },
  colorFondo: { type: String, default: 'bg-white' }
})

const emit = defineEmits(['cambioEstado'])

// --- LÓGICA DEL SLIDER (Igual que antes) ---
const indiceActual = ref(-1)

const abrirGaleria = (index) => {
  indiceActual.value = index
  document.body.style.overflow = 'hidden'
  emit('cambioEstado', true)
}

const cerrarGaleria = () => {
  indiceActual.value = -1
  document.body.style.overflow = 'auto'
  emit('cambioEstado', false)
}

const siguienteFoto = () => {
  if (indiceActual.value < props.fotos.length - 1) {
    indiceActual.value++
  } else {
    indiceActual.value = 0
  }
}

const anteriorFoto = () => {
  if (indiceActual.value > 0) {
    indiceActual.value--
  } else {
    indiceActual.value = props.fotos.length - 1
  }
}

const manejarTeclado = (e) => {
  if (indiceActual.value === -1) return
  if (e.key === 'Escape') cerrarGaleria()
  if (e.key === 'ArrowRight') siguienteFoto()
  if (e.key === 'ArrowLeft') anteriorFoto()
}

onMounted(() => window.addEventListener('keydown', manejarTeclado))
onUnmounted(() => window.removeEventListener('keydown', manejarTeclado))
</script>

<template>
  <div class="py-16 transition-colors" :class="colorFondo" id="galeria">
    <div class="max-w-4xl mx-auto px-4">
      
      <div class="text-center mb-10">
        <PhCamera :size="48" weight="thin" class="mx-auto mb-3 icon-draw" :class="colorIcono"/>
        
        <h3 class="font-elegante text-4xl " :class="colorTitulo">Nuestra Historia</h3>
        <p class="text-stone-500 text-sm mt-2 tracking-wide font-light">
          Momentos inolvidables juntos
        </p>
      </div>

      <div class="columns-2 md:columns-3 gap-3 space-y-3">
        <div 
          v-for="(foto, index) in fotos" 
          :key="index"
          class="relative cursor-pointer break-inside-avoid group rounded-lg overflow-hidden shadow-sm"
          @click="abrirGaleria(index)"
        >
          <img 
            :src="foto" 
            class="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
            loading="lazy"
            alt="Foto Boda"
          >
          <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>
        </div>
      </div>

    </div>

    <Transition name="fade">
      <div 
        v-if="indiceActual !== -1" 
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm" 
        @click.self="cerrarGaleria"
      >
        <div class="absolute top-0 left-0 w-full p-4 flex justify-between items-center text-white/90 z-20">
          <span class="font-light tracking-widest text-sm font-mono">
            {{ indiceActual + 1 }} / {{ fotos.length }}
          </span>
          <button @click="cerrarGaleria" class="p-2 hover:text-white hover:scale-110 transition">
            <PhX size="28" weight="light" />
          </button>
        </div>

        <button 
          @click.stop="anteriorFoto"
          class="absolute left-1 md:left-4 p-3 text-white/60 hover:text-white transition z-20"
        >
          <PhCaretLeft size="48" weight="thin" />
        </button>

        <div class="relative max-w-6xl max-h-[90vh] p-2">
          <img 
            :key="indiceActual"
            :src="fotos[indiceActual]" 
            class="max-h-[85vh] w-auto max-w-full object-contain shadow-2xl animate-fade-in rounded-sm"
            draggable="false"
          >
        </div>

        <button 
          @click.stop="siguienteFoto"
          class="absolute right-1 md:right-4 p-3 text-white/60 hover:text-white transition z-20"
        >
          <PhCaretRight size="48" weight="thin" />
        </button>

      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* Animaciones */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-fade-in { animation: fadeInPhoto 0.4s ease-out; }
@keyframes fadeInPhoto {
  from { opacity: 0.5; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>