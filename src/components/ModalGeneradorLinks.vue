<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { 
  PhX, PhWhatsappLogo, PhCopy, PhCheck, PhMagicWand, PhUser, PhPencilSimple, PhLink, PhChatText 
} from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  urlBase: String,
  nombreFestejado: String, // Ej: "Valeria" o "María & Juan"
  
  // TIPO DE EVENTO: 'infantil', 'boda', 'xv', 'bautizo'
  tipoEvento: { type: String, default: 'infantil' },

  // COLORES PERSONALIZABLES (Clases de Tailwind)
  colorHeader: { type: String, default: 'bg-gradient-to-r from-purple-500 to-rose-500' },
  colorBoton: { type: String, default: 'bg-rose-500 hover:bg-rose-600' },
  colorIcono: { type: String, default: 'text-rose-500' }
})

const emit = defineEmits(['close'])

// ESTADO
const nombreInvitado = ref('')
const mensajePersonalizado = ref('')
const editandoMensaje = ref(false)
const copiado = ref(false)

// TEXTOS POR DEFECTO SEGÚN EL TIPO DE EVENTO
const obtenerTextoDefault = () => {
  switch (props.tipoEvento) {
    case 'boda':
      return `Nos gustaría mucho compartir este momento contigo, {{nombre}}. Por favor confirma tu asistencia en este enlace:`
    case 'xv':
      return `¡Hola {{nombre}}! 👑 Celebra conmigo mis 15 años. Aquí tienes tu pase especial:`
    case 'bautizo':
      return `Acompáñanos en este día de fe y alegría, {{nombre}}. Detalles de la ceremonia aquí:`
    case 'infantil':
    default:
      return `¡Hola {{nombre}}! 🦄 Te invito a mi cumpleaños. Toca aquí para ver tu invitación especial:`
  }
}

// Inicializar mensaje al montar
onMounted(() => {
  mensajePersonalizado.value = obtenerTextoDefault()
})

// LÓGICA DE GENERACIÓN
const linkGenerado = computed(() => {
  if (!props.urlBase) return ''
  const urlLimpia = props.urlBase.split('?')[0]
  const invitadoLimpio = nombreInvitado.value ? nombreInvitado.value.trim() : 'Invitado'
  return `${urlLimpia}?invitado=${encodeURIComponent(invitadoLimpio)}`
})

const mensajeFinalWhatsApp = computed(() => {
  // Reemplazamos la marca {{nombre}} por el nombre real
  const nombreReal = nombreInvitado.value.trim() || 'Amigo/a'
  let texto = mensajePersonalizado.value.replace('{{nombre}}', nombreReal)
  
  // Agregamos el link al final
  return `${texto} ${linkGenerado.value}`
})

const linkWhatsappApi = computed(() => {
  return `https://wa.me/?text=${encodeURIComponent(mensajeFinalWhatsApp.value)}`
})

// ACCIONES
const copiarLink = async () => {
  try {
    await navigator.clipboard.writeText(linkGenerado.value)
    copiado.value = true
    setTimeout(() => copiado.value = false, 2000)
  } catch (err) { console.error(err) }
}

const restaurarMensaje = () => {
  mensajePersonalizado.value = obtenerTextoDefault()
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-4">
      
      <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" @click="$emit('close')"></div>

      <div class="bg-white w-full max-w-md md:rounded-[2rem] rounded-t-[2rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        <div class="p-6 text-white text-center relative shrink-0" :class="colorHeader">
          <button @click="$emit('close')" aria-label="Cerrar ventana" class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors">
            <PhX weight="bold" />
          </button>
          
          <div class="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md shadow-inner">
             <PhMagicWand size="24" weight="fill" />
          </div>
          <h3 class="font-bold text-xl">Crear Invitación</h3>
          <p class="text-xs text-white/90 mt-1">Personaliza el enlace para tus invitados</p>
        </div>

        <div class="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div>
            <label class="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2">
              <span>Nombre del Invitado</span>
              <span class="text-slate-300">{{ nombreInvitado.length }}/30</span>
            </label>
            <div class="relative group">
               <PhUser class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-purple-500 transition-colors" />
               <input 
                 v-model="nombreInvitado"
                 type="text" 
                 placeholder="Ej: Tía Juana, Familia Pérez..." 
                 class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:outline-none focus:border-purple-400 focus:bg-white transition-all text-lg"
                 autofocus
               />
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
             <div class="flex justify-between items-center mb-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <PhChatText weight="fill" /> Mensaje de WhatsApp
                </label>
                <button @click="restaurarMensaje" class="text-[10px] text-purple-500 underline hover:text-purple-700">
                  Restaurar original
                </button>
             </div>
             
             <textarea 
               v-model="mensajePersonalizado"
               rows="3"
               class="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-600 focus:outline-none focus:border-purple-300 resize-none font-medium leading-relaxed"
             ></textarea>
             
             <p class="text-[10px] text-slate-400 mt-2">
              💡 Tip: Usa <strong v-pre>{{nombre}}</strong> donde quieras que aparezca el nombre del invitado.
            </p>
          </div>

          <div v-if="nombreInvitado" class="space-y-3 animate-fade-in pt-2">
             
             <a 
               :href="linkWhatsappApi" 
               target="_blank"
               class="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl text-center shadow-lg shadow-green-200 transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
             >
               <PhWhatsappLogo weight="fill" size="24" />
               Enviar Invitación
             </a>

             <button 
               @click="copiarLink"
               :aria-label="copiado ? 'Enlace copiado con éxito' : 'Copiar enlace de la invitación al portapapeles'"
               class="w-full bg-white border-2 border-slate-100 hover:border-slate-300 text-slate-500 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
             >
               <component :is="copiado ? PhCheck : PhLink" weight="bold" :class="copiado ? 'text-green-500' : ''"/>
               {{ copiado ? '¡Link Copiado!' : 'Copiar solo el enlace' }}
             </button>

          </div>
          
          <div v-else class="text-center py-4 opacity-50">
             <p class="text-sm text-slate-400 italic">Escribe un nombre arriba para generar el enlace ✨</p>
          </div>

        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Scrollbar bonito */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>