<script setup>
import { ref, computed } from 'vue'
import { 
  PhConfetti, PhSparkle, PhCrown, PhCheckCircle, PhXCircle, PhCaretDown, PhX
} from '@phosphor-icons/vue'

const emit = defineEmits(['cambioPlan'])

const planActivo = ref('queen') 
const menuAbierto = ref(false) 

// CONFIGURACIÓN DE PLANES 15 AÑOS
const planes = [
  {
    id: 'party',
    nombre: 'Party',
    titulo: 'Básico',
    icono: PhConfetti,
    color: 'text-blue-400',
    border: 'border-blue-400',
    bgActive: 'bg-blue-500/20',
    features: ['Diseño Royal', 'Cuenta Regresiva', 'Mapa GPS', 'Mesa de Regalos', 'Confirmación WhatsApp'],
    missing: ['Música', 'Cronograma', 'Galería de Fotos', 'Video Invitación']
  },
  {
    id: 'glow',
    nombre: 'Glow',
    titulo: 'Gold',
    icono: PhSparkle,
    color: 'text-amber-400',
    border: 'border-amber-400',
    bgActive: 'bg-amber-500/20',
    features: ['Todo lo de Party', 'Música de Fondo', 'Cronograma', 'Galería (6 fotos)', 'Código Vestimenta'],
    missing: ['Video Save the Date', 'Galería Ilimitada', 'Nombre Personalizado']
  },
  {
    id: 'queen',
    nombre: 'Queen',
    titulo: 'Premium',
    icono: PhCrown,
    color: 'text-purple-400',
    border: 'border-purple-400',
    bgActive: 'bg-purple-500/20',
    features: ['Todo lo de Glow', 'Video Save the Date', 'Galería Ilimitada', 'Nombre Invitado Real'],
    missing: []
  }
]

const infoPlanActual = computed(() => planes.find(p => p.id === planActivo.value))

const seleccionarPlan = (idPlan) => {
  planActivo.value = idPlan
  emit('cambioPlan', idPlan)
  menuAbierto.value = false
}
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full z-[9999] font-sans pointer-events-none">
    
    <div class="absolute bottom-6 left-4 md:bottom-8 md:left-8 z-50 pointer-events-auto">
      <button 
        @click="menuAbierto = !menuAbierto"
        class="h-12 px-5 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-md border transition-all duration-300 group"
        :class="menuAbierto 
          ? 'bg-slate-900 text-white border-slate-700' 
          : 'bg-[#0f172a]/90 border-white/10 hover:border-blue-400/50 hover:scale-105'"
      >
        <template v-if="menuAbierto">
           <span class="text-xs font-bold uppercase tracking-wider mr-1">Cerrar</span>
           <div class="bg-white/20 rounded-full p-1"><PhX weight="bold" /></div>
        </template>

        <template v-else>
           <component :is="infoPlanActual.icono" weight="duotone" class="text-xl animate-pulse" :class="infoPlanActual.color"/>
           <div class="flex flex-col items-start leading-none">
             <span class="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Viendo Demo</span>
             <span class="text-sm font-black text-white group-hover:text-blue-200 transition-colors">
               Plan {{ infoPlanActual.nombre }}
             </span>
           </div>
           <PhCaretDown weight="bold" class="text-slate-500 text-xs ml-1 -rotate-90" />
        </template>
      </button>
    </div>

    <div 
      class="pointer-events-auto bg-[#020617]/95 backdrop-blur-xl border-t border-slate-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] absolute bottom-0 w-full shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      :class="menuAbierto ? 'translate-y-0' : 'translate-y-[120%]'"
    >
      <div class="flex justify-between items-center px-4 py-3 md:px-8 border-b border-white/5">
        <div>
          <p class="text-[10px] text-blue-400 uppercase tracking-widest font-black">Selector de Planes</p>
          <h3 class="text-white font-bold text-sm md:text-base">Elige una experiencia</h3>
        </div>
        <button @click="menuAbierto = false" class="md:hidden text-slate-400 hover:text-white bg-white/5 p-2 rounded-full">
          <PhCaretDown weight="bold" size="16" />
        </button>
      </div>

      <div class="p-4 md:p-8 overflow-x-auto pb-safe custom-scrollbar">
        <div class="flex md:grid md:grid-cols-3 gap-4 min-w-[max-content] md:min-w-0 mx-auto max-w-5xl">
          <button 
            v-for="plan in planes" :key="plan.id" @click="seleccionarPlan(plan.id)"
            class="relative w-[280px] md:w-auto rounded-xl p-4 text-left transition-all duration-200 border group hover:bg-white/5"
            :class="planActivo === plan.id ? `bg-[#1e293b] ${plan.border} shadow-lg ring-1 ring-offset-2 ring-offset-[#020617] ${plan.bgActive}` : 'bg-[#1e293b]/40 border-transparent opacity-60 hover:opacity-100'"
          >
            <div class="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
              <div class="w-10 h-10 rounded-full bg-[#0f172a] flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110" :class="plan.color">
                <component :is="plan.icono" weight="duotone" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">{{ plan.titulo }}</p>
                <p class="text-lg font-black leading-none text-white">{{ plan.nombre }}</p>
              </div>
              <div v-if="planActivo === plan.id" class="ml-auto"><PhCheckCircle weight="fill" class="text-emerald-400 text-xl" /></div>
            </div>
            <div class="space-y-1.5 pl-1">
              <div v-for="(feat, i) in plan.features" :key="'f'+i" class="flex items-start gap-2 text-[11px] md:text-xs text-slate-300">
                <PhCheckCircle weight="fill" class="text-emerald-500 shrink-0 mt-0.5 text-[10px]" />
                <span :class="planActivo === plan.id ? 'text-white font-medium' : ''">{{ feat }}</span>
              </div>
              <div v-for="(miss, j) in plan.missing" :key="'m'+j" class="flex items-start gap-2 text-[10px] text-slate-500">
                <PhXCircle weight="bold" class="shrink-0 mt-0.5 opacity-50" />
                <span class="line-through decoration-slate-600/50">{{ miss }}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
.custom-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
.custom-scrollbar::-webkit-scrollbar { display: none; }
</style>