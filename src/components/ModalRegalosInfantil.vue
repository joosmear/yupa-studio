<script setup>
import { ref, computed, watch } from 'vue'
import { 
  PhX, PhGift, PhBank, PhCopy, PhCheck, PhQrCode, 
  PhCreditCard, PhSmiley, PhUser, PhCaretDown 
} from '@phosphor-icons/vue'

// IMPORTANTE: Importamos ImagenSegura para que el QR no falle
import ImagenSegura from './ImagenSegura.vue' 

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  listaRegalos: { type: Array, default: () => [] } 
})

const emit = defineEmits(['close'])

// ESTADO
const indiceCuentaActiva = ref(0) // 0 = Primera cuenta (Papá), 1 = Segunda (Mamá)
const verQR = ref(false)          // false = Ver Datos, true = Ver QR
const copiado = ref(false)

// COMPUTADOS
const cuentaActual = computed(() => {
  return props.listaRegalos[indiceCuentaActiva.value] || {}
})

const tieneMultiplesCuentas = computed(() => props.listaRegalos.length > 1)

// Reseteamos la vista al cambiar de cuenta
watch(indiceCuentaActiva, () => {
  verQR.value = false
  copiado.value = false
})

const copiarCuenta = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    copiado.value = true
    setTimeout(() => copiado.value = false, 2000)
  } catch (err) {
    console.error('Error al copiar', err)
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      <div class="absolute inset-0 bg-rose-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-modal-bounce max-h-[85vh]">
        
        <div class="bg-rose-100 p-4 text-center relative shrink-0 border-b border-rose-200">
           <button @click="$emit('close')" class="absolute top-4 right-4 bg-white/50 hover:bg-white text-rose-400 rounded-full p-2 transition-colors">
             <PhX weight="bold" size="20" />
           </button>
           
           <h3 class="font-pacifico text-2xl text-rose-500 mt-2">Mesa de Regalos</h3>
           <p class="text-xs text-rose-400 font-bold uppercase tracking-wider">Detalles bancarios</p>
        </div>

        <div v-if="tieneMultiplesCuentas" class="flex border-b border-slate-100">
           <button 
             v-for="(regalo, index) in listaRegalos" 
             :key="index"
             @click="indiceCuentaActiva = index"
             class="flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative"
             :class="indiceCuentaActiva === index ? 'text-rose-500 bg-white' : 'text-slate-400 bg-slate-50 hover:bg-slate-100'"
           >
             <span class="block mb-1 text-xl">
               {{ indiceCuentaActiva === index ? '⭐️' : '👤' }}
             </span>
             {{ regalo.tag || `Opción ${index + 1}` }}

             <div v-if="indiceCuentaActiva === index" class="absolute bottom-0 left-0 w-full h-1 bg-rose-400 rounded-t-full"></div>
           </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar bg-white relative">
            
            <Transition name="fade-slide" mode="out-in">
              <div :key="indiceCuentaActiva"> <div v-if="cuentaActual.banco">
                    
                    <div v-if="cuentaActual.qrImagen" class="flex justify-center mb-6">
                        <div class="bg-slate-100 p-1 rounded-xl flex gap-1 shadow-inner">
                           <button 
                             @click="verQR = false"
                             class="px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                             :class="!verQR ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                           >
                             <PhCreditCard weight="bold" size="16"/> Datos
                           </button>
                           <button 
                             @click="verQR = true"
                             class="px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                             :class="verQR ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                           >
                             <PhQrCode weight="bold" size="16"/> Ver QR
                           </button>
                        </div>
                    </div>

                    <div v-if="!verQR" class="animate-fade-in space-y-5">
                        
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 text-2xl">
                             <PhBank weight="duotone" />
                           </div>
                           <div>
                             <p class="text-xs text-slate-400 font-bold uppercase">Banco</p>
                             <p class="text-xl font-bold text-slate-700 leading-tight">{{ cuentaActual.banco }}</p>
                           </div>
                        </div>

                        <div class="pl-2 border-l-4 border-rose-100">
                           <p class="text-xs text-slate-400 font-bold uppercase ml-2">Titular</p>
                           <p class="text-slate-600 font-medium ml-2">{{ cuentaActual.titular }}</p>
                        </div>

                        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
                           <p class="text-xs text-center text-slate-400 font-bold uppercase mb-2">Número de Cuenta</p>
                           <div class="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                              <span class="font-mono text-slate-700 font-bold text-lg md:text-xl tracking-tight truncate pl-2">
                                {{ cuentaActual.cuenta }}
                              </span>
                              <button 
                                @click="copiarCuenta(cuentaActual.cuenta)"
                                class="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                                :class="copiado ? 'bg-green-500 text-white' : 'bg-rose-100 text-rose-500 hover:bg-rose-200'"
                              >
                                <component :is="copiado ? PhCheck : PhCopy" weight="bold" size="20" />
                              </button>
                           </div>
                           <p v-if="copiado" class="text-center text-xs text-green-600 font-bold mt-2 animate-pulse">
                             ¡Copiado al portapapeles!
                           </p>
                        </div>

                    </div>

                    <div v-else class="animate-fade-in text-center py-4">
                        <div class="bg-white p-3 rounded-2xl border-2 border-dashed border-rose-200 inline-block shadow-lg">
                           <ImagenSegura 
                             :src="cuentaActual.qrImagen" 
                             clase="w-64 h-64 object-contain rounded-lg"
                           />
                        </div>
                        <p class="text-sm text-slate-500 mt-4 px-4">
                          Escanea este código desde la app de tu banco para realizar la transferencia a 
                          <span class="font-bold text-rose-400">{{ cuentaActual.titular }}</span>
                        </p>
                    </div>

                </div>

                <div v-else-if="cuentaActual.tipo === 'sobres'" class="text-center py-10">
                   <PhSmiley class="text-yellow-400 text-6xl mx-auto mb-4 animate-bounce" weight="fill" />
                   <h4 class="text-xl font-bold text-slate-700">Lluvia de Sobres</h4>
                   <p class="text-slate-500 mt-2">Habrá un buzón disponible en la entrada del evento.</p>
                </div>

              </div>
            </Transition>
        </div>

        <div class="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
           <button @click="$emit('close')" class="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200">
             Entendido, Gracias
           </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.2s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-10px); }

.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.modal-bounce-enter-active { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.modal-bounce-leave-active { animation: bounce-in 0.3s reverse ease-in; }
@keyframes bounce-in { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>