<script setup>
defineProps({
  src: { type: String, required: true },
  // Por defecto usa 'bg-current' para que tome el color del texto del padre
  // Pero puedes pasarle 'bg-red-500' o 'bg-[#d8b4e2]' si quieres forzarlo
  claseColor: { type: String, default: 'bg-current' }
})
</script>

<template>
  <div class="inline-block">
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