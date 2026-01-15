<script setup>
import { PhUsersThree } from '@phosphor-icons/vue'

defineProps({
  padrinos: Object // Recibe objeto con padres y padrinos
})
</script>

<template>
  <div class="py-12 bg-stone-50 text-center">
    <div class="max-w-4xl mx-auto px-4">
      
      <PhUsersThree :size="40" class="mx-auto text-rose-400 mb-2" weight="duotone" />
      <h3 class="font-elegante text-3xl text-stone-800 mb-8">Con la bendición de</h3>

      <div class="grid md:grid-cols-2 gap-10">
        
        <div class="space-y-4">
          <h4 class="font-bold text-rose-600 uppercase tracking-widest text-xs">Padres de la Novia</h4>
          <div class="flex justify-center gap-6">
            <div class="flex flex-col items-center">
              <img :src="padrinos.padresNovia[0].foto" class="w-20 h-20 rounded-full object-cover border-2 border-rose-200 shadow-sm mb-2">
              <p class="font-elegante text-lg">{{ padrinos.padresNovia[0].nombre }}</p>
            </div>
            <div class="flex flex-col items-center">
              <img :src="padrinos.padresNovia[1].foto" class="w-20 h-20 rounded-full object-cover border-2 border-rose-200 shadow-sm mb-2">
              <p class="font-elegante text-lg">{{ padrinos.padresNovia[1].nombre }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="font-bold text-rose-600 uppercase tracking-widest text-xs">Padres del Novio</h4>
          <div class="flex justify-center gap-6">
            <div class="flex flex-col items-center">
              <img :src="padrinos.padresNovio[0].foto" class="w-20 h-20 rounded-full object-cover border-2 border-rose-200 shadow-sm mb-2">
              <p class="font-elegante text-lg">{{ padrinos.padresNovio[0].nombre }}</p>
            </div>
            <div class="flex flex-col items-center">
              <img :src="padrinos.padresNovio[1].foto" class="w-20 h-20 rounded-full object-cover border-2 border-rose-200 shadow-sm mb-2">
              <p class="font-elegante text-lg">{{ padrinos.padresNovio[1].nombre }}</p>
            </div>
          </div>
        </div>

      </div>

      <div v-if="padrinos.padrinosBoda" class="mt-10 pt-10 border-t border-stone-200">
        <h4 class="font-bold text-stone-500 uppercase tracking-widest text-xs mb-6">Padrinos de Honor</h4>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="(padrino, i) in padrinos.padrinosBoda" :key="i" class="text-center">
             <p class="font-elegante text-xl text-stone-800">{{ padrino.nombre }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>