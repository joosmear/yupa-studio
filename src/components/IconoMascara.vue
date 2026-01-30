<script setup>
defineProps({
  src: { type: String, required: true },
  // Importante: Aquí debes pasar clases de FONDO (ej: bg-red-500), no de texto.
  claseColor: { type: String, default: 'bg-current' }
})
</script>

<template>
  <div class="inline-block w-full h-full">
    <div 
      :class="['w-full h-full', claseColor]"
      :style="`
        -webkit-mask-image: url('${src}');
        mask-image: url('${src}');
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        mask-position: center;
      `"
    ></div>
  </div>
</template>