<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhPause, PhMusicNotes } from '@phosphor-icons/vue'

const props = defineProps({
  songUrl: {
    type: String,
    required: true
  },
  // 1. CLASES DE COLOR Y HOVER (Fondo, Borde, Hover)
  // Nota: Aquí puedes pasar 'hover:bg-color' para cambiar el color al pasar el mouse
  colorBoton: { 
    type: String, 
    default: 'bg-rose-50 border-rose-200 hover:bg-rose-100' 
  },
  
  // 2. CLASES DE ICONO (Color del icono y de la onda)
  colorIcono: { 
    type: String, 
    default: 'text-rose-600' 
  },

  // 3. TAMAÑO DEL BOTÓN (Ancho y Alto)
  // Usamos w-12 h-12 por defecto, pero puedes pasar w-16 h-16 o p-4
  clasesTamano: {
    type: String,
    default: 'w-12 h-12' 
  },

  // 4. TAMAÑO DEL ICONO (Número)
  tamanoIcono: {
    type: Number,
    default: 20
  },

  // 5. GROSOR DE LA ONDA (Ej: '1px', '2px', '4px')
  grosorOnda: {
    type: String,
    default: '1px'
  }
})

const audioPlayer = ref(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
    isPlaying.value = false
  } else {
    audioPlayer.value.play()
    isPlaying.value = true
  }
}

// --- LÓGICA DE AUTO-ENCENDIDO ---
const intentarAutoplay = () => {
  if (!audioPlayer.value || isPlaying.value) return
  audioPlayer.value.play()
    .then(() => {
      isPlaying.value = true
      eliminarDetectores()
    })
    .catch(() => { /* Autoplay bloqueado */ })
}

const eliminarDetectores = () => {
  document.removeEventListener('click', intentarAutoplay)
  document.removeEventListener('touchstart', intentarAutoplay)
  document.removeEventListener('scroll', intentarAutoplay)
}

onMounted(() => {
  document.addEventListener('click', intentarAutoplay)
  document.addEventListener('touchstart', intentarAutoplay)
  document.addEventListener('scroll', intentarAutoplay)
  setTimeout(intentarAutoplay, 100)
})

onUnmounted(() => { eliminarDetectores() })
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <audio ref="audioPlayer" :src="songUrl" loop></audio>

      <button 
        @click="togglePlay"
        class="music-btn relative rounded-full shadow-xl border transition-all duration-300 flex items-center justify-center hover:scale-105"
        :class="[colorBoton, colorIcono, clasesTamano, { 'is-playing': isPlaying }]"
        :style="{ '--ripple-width': grosorOnda }"
      >
        <PhPause v-if="isPlaying" :size="tamanoIcono" weight="fill" class="text-current" />
        <PhMusicNotes v-else :size="tamanoIcono" weight="fill" class="text-current" />
      </button>
  </div>
</template>

<style scoped>
/* Definimos la animación base para el botón */
.music-btn {
  --ripple-color: currentColor; 
  /* --ripple-width se inyecta desde el style en línea */
}

/* Cuando está sonando, activamos los pseudo-elementos */
.music-btn.is-playing::before,
.music-btn.is-playing::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border-style: solid;
  border-color: var(--ripple-color);
  opacity: 0;
  pointer-events: none;
  animation: rippleEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.music-btn.is-playing::after {
  animation-delay: 0.5s;
}

@keyframes rippleEffect {
  0% {
    transform: scale(1);
    opacity: 0.7;
    /* Usamos la variable para el grosor inicial */
    border-width: var(--ripple-width);
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border-width: 0px;
  }
}
</style>