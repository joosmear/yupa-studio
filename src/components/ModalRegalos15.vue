<script setup>
import { ref, computed, watch } from 'vue'
import { PhX, PhCopy, PhCheck, PhBank } from '@phosphor-icons/vue'

const props = defineProps({
  mostrar: Boolean,
  cuentas: { type: Array, default: () => [] },
  
  // --- PROPS DE PERSONALIZACIÓN (Colores) ---
  // 1. Color del fondo oscuro (Overlay): Igual al del Carrusel
  claseOverlay: { type: String, default: 'bg-[#2a1b2e]/95 backdrop-blur-md' },
  
  // 2. Color Principal (Títulos, Textos fuertes, Bordes de botones activos)
  claseColorPrincipal: { type: String, default: 'text-[#75527e] border-[#75527e]' },
  
  // 3. Color de Fondo Suave (Cabecera, Botones inactivos, Círculos)
  claseFondoSuave: { type: String, default: 'bg-[#faf5fc]' },
  
  // 4. Color de Texto Suave (Subtítulos, Iconos inactivos)
  claseTextoSuave: { type: String, default: 'text-[#a37ab0]' }
})

const emit = defineEmits(['cerrar'])

const indiceActivo = ref(0)
const copiado = ref(false)

// Resetear índice al abrir
watch(() => props.mostrar, (val) => {
  if (val) indiceActivo.value = 0
})

const cuentaActual = computed(() => {
  return (props.cuentas && props.cuentas.length > 0) ? props.cuentas[indiceActivo.value] : null
})

const copiarNumero = async () => {
  if (!cuentaActual.value) return
  try {
    await navigator.clipboard.writeText(cuentaActual.value.numero)
    copiado.value = true
    setTimeout(() => { copiado.value = false }, 2000)
  } catch (err) {
    console.error('Error al copiar', err)
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="mostrar" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      :class="claseOverlay"
      @click.self="emit('cerrar')"
    >
      
      <div class="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-fade-in-up border-4 border-white flex flex-col max-h-[90vh]">
        
        <button 
          @click="emit('cerrar')"
          class="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-rose-400 bg-white/80 hover:bg-white rounded-full transition-all shadow-sm"
        >
          <PhX size="24" weight="bold" />
        </button>

        <div class="pt-8 pb-4 text-center border-b border-gray-100 shrink-0" :class="claseFondoSuave">
          <h3 class="font-seasons text-3xl" :class="claseColorPrincipal">Detalles Bancarios</h3>
          <p class="font-cormorant italic text-sm mt-1" :class="claseTextoSuave">Gracias por tu cariño</p>
        </div>

        <div v-if="cuentas.length > 1" class="flex p-2 justify-center gap-2 shrink-0" :class="claseFondoSuave">
          <button 
            v-for="(cuenta, index) in cuentas" 
            :key="index"
            @click="indiceActivo = index"
            class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border"
            :class="indiceActivo === index 
              ? [claseColorPrincipal, 'bg-white shadow-md border-current'] // Activo
              : ['border-transparent hover:bg-white/50', claseTextoSuave]" 
          >
            {{ cuenta.titular ? cuenta.titular.split(' ')[0] : `Opción ${index + 1}` }}
          </button>
        </div>

        <div class="overflow-y-auto p-6 text-center space-y-6">
          
          <div v-if="cuentaActual">
             
             <div v-if="cuentaActual.qr" class="relative group animate-fade-in">
                <div class="w-48 h-48 mx-auto bg-white p-2 rounded-xl border-2 border-dashed shadow-sm flex items-center justify-center" :class="claseColorPrincipal">
                   <img :src="cuentaActual.qr" alt="QR" class="w-full h-full object-contain rounded-lg" />
                </div>
                <p class="text-[10px] uppercase tracking-widest mt-2" :class="claseTextoSuave">QR de Pago</p>
             </div>

             <div v-else class="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 animate-fade-in" :class="[claseFondoSuave, claseColorPrincipal]">
                <PhBank size="40" weight="light" />
             </div>

             <div class="space-y-1 animate-fade-in-up">
                <p class="text-xs uppercase tracking-widest font-bold" :class="claseColorPrincipal">
                  {{ cuentaActual.banco }}
                </p>
                <p class="font-cormorant text-2xl text-[#545454] font-bold break-all select-all">
                  {{ cuentaActual.numero }}
                </p>

                <div class="text-sm text-[#888] pt-1 border-t border-dashed border-gray-200 mt-3 pt-3 inline-block px-4">
                  <p class="font-medium text-gray-600">{{ cuentaActual.titular }}</p>
                  <p v-if="cuentaActual.ci" class="text-xs opacity-70">CI/NIT: {{ cuentaActual.ci }}</p>
                  <p v-if="cuentaActual.tipo" class="text-xs opacity-70 capitalize">{{ cuentaActual.tipo }}</p>
                </div>
             </div>

             <button 
               @click="copiarNumero"
               class="w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 shadow-sm border group"
               :class="copiado 
                 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                 : [claseFondoSuave, claseColorPrincipal, 'hover:brightness-95 border-transparent']"
             >
               <component :is="copiado ? PhCheck : PhCopy" size="20" :class="{'animate-bounce': copiado}"/>
               <span>{{ copiado ? '¡Copiado!' : 'Copiar Número' }}</span>
             </button>
          </div>

          <div v-else class="py-10 text-gray-400 italic">No hay datos disponibles.</div>

        </div>
      </div>
    </div>
  </Transition>
</template>