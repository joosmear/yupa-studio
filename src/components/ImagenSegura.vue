<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen' },
  clase: { type: String, default: '' }
})

// Esta imagen se mostrará si la original falla
// Puedes usar un pixel transparente o una imagen de "No Image"
const imagenPorDefecto = '/assets/placeholder.png' 

const manejarError = (e) => {
  // Si la imagen falla, ocultamos el elemento o ponemos el placeholder
  // Opción A: Ocultar la imagen rota
  e.target.style.display = 'none';
  
  // Opción B (Descomentar para usar): Poner imagen por defecto
  // e.target.src = imagenPorDefecto;
}
</script>

<template>
  <img 
    :src="src" 
    :alt="alt" 
    :class="clase"
    @error="manejarError"
  />
</template>