<script setup>
import { ref } from 'vue'
import { PhX, PhBank, PhCopy } from '@phosphor-icons/vue'

// Recibimos la LISTA de cuentas (Array)
const props = defineProps({
  mostrar: Boolean,
  cuentas: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['cerrar'])

// Controlamos cuál cuenta se ve (0 es la primera, 1 la segunda)
const indiceActivo = ref(0)

// Función simple para copiar al portapapeles
const copiarCuenta = (numero) => {
  navigator.clipboard.writeText(numero)
  alert("¡Número de cuenta copiado!")
}
</script>

<template>
  <div v-if="mostrar" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" @click.self="emit('cerrar')">
    
    <div class="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative">
      
      <div class="bg-white p-2 relative flex justify-end">
        <button @click="emit('cerrar')" class="p-2 text-gray-400 hover:text-rose-500">
          <PhX size="24" weight="bold" />
        </button>
        </div>

      <div v-if="cuentas.length > 1" class="flex border-b border-t border-gray-100">
        <button 
          v-for="(cuenta, index) in cuentas" 
          :key="index"
          @click="indiceActivo = index"
          class="flex-1 py-3 text-sm font-bold transition-colors"
          :class="indiceActivo === index ? 'text-rose-600 border-b-2 border-rose-600 bg-white' : 'text-gray-500 bg-gray-50 hover:bg-gray-100'"
        >
          {{ cuenta.nombre }}
        </button>
      </div>

      <div class="p-6 pt-4">
        <div class="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200 mb-5 flex justify-center shadow-sm">
          <img :src="cuentas[indiceActivo].qr" class="w-48 h-48 object-contain mix-blend-multiply" alt="QR" />
        </div>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span class="text-gray-500">Banco:</span>
            <span class="font-bold text-gray-800">{{ cuentas[indiceActivo].banco }}</span>
          </div>
          
          <div class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span class="text-gray-500">Titular:</span>
            <span class="font-bold text-gray-800 text-right">{{ cuentas[indiceActivo].titular }}</span>
          </div>

          <div class="bg-gray-100 p-3 rounded-lg flex justify-between items-center mt-4">
            <div class="text-xs text-gray-500">Nro. de Cuenta</div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-lg text-gray-800 select-all">{{ cuentas[indiceActivo].cuenta }}</span>
              <button @click="copiarCuenta(cuentas[indiceActivo].cuenta)" class="bg-white p-2 rounded-full shadow-sm text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition" title="Copiar número">
                <PhCopy size="20" weight="bold"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>