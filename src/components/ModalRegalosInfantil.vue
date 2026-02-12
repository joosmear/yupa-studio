<script setup>
import { ref, computed, watch } from 'vue'
import { 
  PhX, PhGift, PhBank, PhCopy, PhCheck, PhQrCode, 
  PhCreditCard, PhSmiley, PhUser, PhCaretDown 
} from '@phosphor-icons/vue'
import ImagenSegura from './ImagenSegura.vue' 

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  listaRegalos: { type: Array, default: () => [] },
  
  // --- NUEVAS PROPS DE COLOR (Con valores por defecto ROSA para niña) ---
  colorHeader: { type: String, default: 'bg-rose-100 border-rose-200' },
  colorTitulo: { type: String, default: 'text-rose-500' },
  colorSubtitulo: { type: String, default: 'text-rose-400' },
  colorPestanaActiva: { type: String, default: 'text-rose-500' },
  colorBarraPestana: { type: String, default: 'bg-rose-400' },
  colorBotonActivo: { type: String, default: 'bg-white text-rose-500' },
  colorIconoBanco: { type: String, default: 'bg-rose-50 text-rose-400' },
  colorBordeLateral: { type: String, default: 'border-rose-100' },
  colorBotonCopiar: { type: String, default: 'bg-rose-100 text-rose-500 hover:bg-rose-200' },
  colorTextoDestacado: { type: String, default: 'text-rose-400' },
  colorBordeDashed: { type: String, default: 'border-rose-200' },
  colorFondoOverlay: { type: String, default: 'bg-rose-900/60' }
})

const emit = defineEmits(['close'])

// ESTADO
const indiceCuentaActiva = ref(0) 
const verQR = ref(false) 
const copiado = ref(false)

// COMPUTADOS
const cuentaActual = computed(() => props.listaRegalos[indiceCuentaActiva.value] || {})
const tieneMultiplesCuentas = computed(() => props.listaRegalos.length > 1)

// Reseteamos al cambiar
watch(indiceCuentaActiva, () => {
  verQR.value = false
  copiado.value = false
})

const copiarCuenta = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    copiado.value = true
    setTimeout(() => copiado.value = false, 2000)
  } catch (err) { console.error(err) }
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      <div class="absolute inset-0 backdrop-blur-sm transition-opacity" :class="colorFondoOverlay" @click="$emit('close')"></div>

      <div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-modal-bounce max-h-[85vh]">
        
        <div class="p-4 text-center relative shrink-0 border-b" :class="colorHeader">
           <button @click="$emit('close')" aria-label="Cerrar mesa de regalos" class="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 transition-colors" :class="colorSubtitulo">
             <PhX weight="bold" size="20" />
           </button>
           
           <h3 class="font-pacifico text-2xl mt-2" :class="colorTitulo">Mesa de Regalos</h3>
           <p class="text-xs font-bold uppercase tracking-wider" :class="colorSubtitulo">Detalles bancarios</p>
        </div>

        <div v-if="tieneMultiplesCuentas" class="flex border-b border-slate-100">
           <button 
             v-for="(regalo, index) in listaRegalos" 
             :key="index"
             @click="indiceCuentaActiva = index"
             :aria-label="'Ver cuenta de ' + (regalo.tag || 'Opción ' + (index + 1))"
             class="flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors relative"
             :class="indiceCuentaActiva === index ? colorPestanaActiva + ' bg-white' : 'text-slate-400 bg-slate-50 hover:bg-slate-100'"
           >
             <span class="block mb-1 text-xl">
               {{ indiceCuentaActiva === index ? '⭐️' : '👤' }}
             </span>
             {{ regalo.tag || `Opción ${index + 1}` }}

             <div v-if="indiceCuentaActiva === index" class="absolute bottom-0 left-0 w-full h-1 rounded-t-full" :class="colorBarraPestana"></div>
           </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar bg-white relative">
            
            <Transition name="fade-slide" mode="out-in">
              <div :key="indiceCuentaActiva"> 
                
                <div v-if="cuentaActual.banco">
                    
                    <div v-if="cuentaActual.qrImagen" class="flex justify-center mb-6">
                        <div class="bg-slate-100 p-1 rounded-xl flex gap-1 shadow-inner">
                           <button 
                             @click="verQR = false"
                             aria-label="Mostrar datos bancarios en texto"
                             class="px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                             :class="!verQR ? colorBotonActivo + ' shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                           >
                             <PhCreditCard weight="bold" size="16"/> Datos
                           </button>
                           <button 
                             @click="verQR = true"
                             aria-label="Mostrar código QR para escanear"
                             class="px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                             :class="verQR ? colorBotonActivo + ' shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                           >
                             <PhQrCode weight="bold" size="16"/> Ver QR
                           </button>
                        </div>
                    </div>

                    <div v-if="!verQR" class="animate-fade-in space-y-5">
                        
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" :class="colorIconoBanco">
                             <PhBank weight="duotone" />
                           </div>
                           <div>
                             <p class="text-xs text-slate-400 font-bold uppercase">Banco</p>
                             <p class="text-xl font-bold text-slate-700 leading-tight">{{ cuentaActual.banco }}</p>
                           </div>
                        </div>

                        <div class="pl-2 border-l-4" :class="colorBordeLateral">
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
                                :aria-label="copiado ? 'Número de cuenta copiado' : 'Copiar número de cuenta bancaria'"
                                class="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                                :class="copiado ? 'bg-green-500 text-white' : colorBotonCopiar"
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
                        <div class="bg-white p-3 rounded-2xl border-2 border-dashed inline-block shadow-lg" :class="colorBordeDashed">
                           <ImagenSegura 
                             :src="cuentaActual.qrImagen" 
                             :alt="'Código QR para transferencia a ' + cuentaActual.titular"
                             clase="w-64 h-64 object-contain rounded-lg"
                           />
                        </div>
                        <p class="text-sm text-slate-500 mt-4 px-4">
                          Escanea este código desde la app de tu banco para realizar la transferencia a 
                          <span class="font-bold" :class="colorTextoDestacado">{{ cuentaActual.titular }}</span>
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
/* (MISMOS ESTILOS QUE ANTES, SIN CAMBIOS) */
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