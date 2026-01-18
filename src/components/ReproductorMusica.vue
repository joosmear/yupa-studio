<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhPause, PhMusicNotes } from '@phosphor-icons/vue'

const props = defineProps({
  songUrl: {
    type: String,
    required: true
  },
  // COLORES PERSONALIZABLES (Por defecto: Rosa clásico)
  colorBoton: { type: String, default: 'bg-rose-50 border-rose-200' },
  colorIcono: { type: String, default: 'text-rose-600' }
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

// --- LÓGICA DE AUTO-ENCENDIDO (Sin cambios) ---
const intentarAutoplay = () => {
  if (!audioPlayer.value || isPlaying.value) return
  audioPlayer.value.play()
    .then(() => {
      isPlaying.value = true
      eliminarDetectores()
    })
    .catch(() => { /* Navegador bloqueó autoplay */ })
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
  setTimeout(intentarAutoplay, 100) // Pequeño delay para asegurar carga
})

onUnmounted(() => { eliminarDetectores() })
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <audio ref="audioPlayer" :src="songUrl" loop></audio>

      <button 
        @click="togglePlay"
        class="music-btn relative p-3 rounded-full shadow-xl border transition-all duration-300 hover:scale-105 flex items-center justify-center"
        :class="[colorBoton, colorIcono, { 'is-playing': isPlaying }]"
      >
        <PhPause v-if="isPlaying" size="24" weight="fill" class="text-current" />

        <PhMusicNotes v-else size="24" weight="fill" class="text-current" />
      </button>
  </div>
</template>

<style scoped>
/* Definimos la animación base para el botón */
.music-btn {
  --ripple-color: currentColor; 
}

/* Cuando está sonando, activamos los pseudo-elementos */
.music-btn.is-playing::before,
.music-btn.is-playing::after {
  content: '';
  position: absolute;
  inset: -4px; /* Empiezan un poco más grandes que el botón */
  border-radius: 9999px; /* Círculo perfecto */
  border: 1px solid var(--ripple-color); /* Usan el color del icono */
  opacity: 0;
  pointer-events: none; /* No interfieren con el clic */
  animation: rippleEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* El segundo círculo sale con un pequeño retraso para dar efecto continuo */
.music-btn.is-playing::after {
  animation-delay: 0.5s;
}

@keyframes rippleEffect {
  0% {
    transform: scale(1);
    opacity: 0.7;
    border-width: 1px;
  }
  100% {
    transform: scale(2); /* Se expande al doble */
    opacity: 0; /* Se desvanece */
    border-width: 0px;
  }
}
</style>