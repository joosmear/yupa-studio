<script setup>
import { ref } from 'vue'
import { PhX, PhCamera } from '@phosphor-icons/vue'

defineProps({
  fotos: {
    type: Array,
    required: true
  }
})

// Estado para saber qué foto está abierta en grande (null = ninguna)
const fotoSeleccionada = ref(null)

const abrirFoto = (url) => {
  fotoSeleccionada.value = url
  // Bloquear el scroll del cuerpo para que no se mueva la página de fondo
  document.body.style.overflow = 'hidden'
}

const cerrarFoto = () => {
  fotoSeleccionada.value = null
  // Reactivar el scroll
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div class="py-12 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      
      <div class="text-center mb-8">
        <PhCamera :size="32" class="mx-auto text-rose-500 mb-2" />
        <h3 class="font-elegante text-3xl text-stone-800">Nuestra Historia</h3>
        <p class="text-stone-500 text-sm mt-2">Momentos inolvidables juntos</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <div 
          v-for="(foto, index) in fotos" 
          :key="index"
          class="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
          @click="abrirFoto(foto)"
        >
          <img 
            :src="foto" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            alt="Foto de los novios" 
            loading="lazy"
          >
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        </div>
      </div>

    </div>

    <div 
      v-if="fotoSeleccionada" 
      class="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="cerrarFoto"
    >
      <button 
        @click="cerrarFoto"
        class="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition"
      >
        <PhX :size="32" weight="bold" />
      </button>

      <img 
        :src="fotoSeleccionada" 
        class="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl animate-fade-in"
        alt="Foto ampliada"
      >
    </div>
  </div>
</template>

<style scoped>
/* Animación suave para cuando aparece la foto grande */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>