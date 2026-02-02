<script setup>
import { ref, computed } from 'vue'
import { 
  PhHeart, PhStar, PhCrown, PhCheckCircle, PhXCircle, PhCaretDown, PhX, PhInfinity
} from '@phosphor-icons/vue'

const emit = defineEmits(['cambioPlan'])

// Estado inicial: Premium para mostrar todo
const planActivo = ref('premium') 
const menuAbierto = ref(false) 

// CONFIGURACIÓN DE PLANES DE BODA
const planes = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    titulo: 'Plan Básico',
    icono: PhHeart,
    color: 'text-rose-400',
    border: 'border-rose-400',
    bgActive: 'bg-rose-500/20',
    features: ['Diseño Elegante', 'Cuenta Regresiva', 'Mapa GPS', 'Mesa de Regalos', 'Confirmación WhatsApp'],
    missing: ['Música de Fondo', 'Cronograma', 'Galería de Fotos', 'Pase de Boleto Digital']
  },
  {
    id: 'gold',
    nombre: 'Gold',
    titulo: 'Plan Intermedio',
    icono: PhStar,
    color: 'text-amber-400',
    border: 'border-amber-400',
    bgActive: 'bg-amber-500/20',
    features: ['Todo lo de Esencial', 'Música de Fondo', 'Cronograma', 'Galería (6 fotos)', 'Código de Vestimenta'],
    missing: ['Galería Ilimitada', 'Invitación Personalizada', 'Pase de Boleto Digital']
  },
  {
    id: 'premium',
    nombre: 'Premium',
    titulo: 'Experiencia Total',
    icono: PhCrown,
    color: 'text-stone-200', // Tono Platino/Elegante
    border: 'border-stone-400',
    bgActive: 'bg-stone-500/20',
    features: ['Todo lo de Gold', 'Galería Ilimitada', 'Pase de Boleto (QR)', 'Invitación Personalizada (Nombre)'],
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
          ? 'bg-stone-800 text-white border-stone-600' 
          : 'bg-stone-900/90 border-white/10 hover:bg-black hover:scale-105'"
      >
        <template v-if="menuAbierto">
           <span class="text-xs font-bold uppercase tracking-wider mr-1">Cerrar</span>
           <div class="bg-white/20 rounded-full p-1">
             <PhX weight="bold" />
           </div>
        </template>

        <template v-else>
           <component 
             :is="infoPlanActual.icono" 
             weight="fill" 
             class="text-xl animate-pulse" 
             :class="infoPlanActual.color"
           />
           
           <div class="flex flex-col items-start leading-none">
             <span class="text-[9px] text-stone-400 uppercase font-bold mb-0.5">Viendo Demo</span>
             <span class="text-sm font-bold text-white group-hover:text-rose-200 transition-colors">
               Plan {{ infoPlanActual.nombre }}
             </span>
           </div>

           <PhCaretDown weight="bold" class="text-stone-500 text-xs ml-1 -rotate-90" />
        </template>
      </button>

    </div>

    <div 
      class="pointer-events-auto bg-[#1c1917]/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] absolute bottom-0 w-full shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      :class="menuAbierto ? 'translate-y-0' : 'translate-y-[120%]'"
    >
      
      <div class="flex justify-between items-center px-4 py-3 md:px-8 border-b border-white/5">
        <div>
          <p class="text-[10px] text-rose-400 uppercase tracking-widest font-bold">Selector de Planes</p>
          <h3 class="text-white font-serif text-lg italic">Elige tu experiencia ideal</h3>
        </div>
        <button @click="menuAbierto = false" class="md:hidden text-stone-400 hover:text-white bg-white/5 p-2 rounded-full">
          <PhCaretDown weight="bold" size="16" />
        </button>
      </div>

      <div class="p-4 md:p-8 overflow-x-auto pb-safe custom-scrollbar">
        
        <div class="flex md:grid md:grid-cols-3 gap-4 min-w-[max-content] md:min-w-0 mx-auto max-w-6xl">
          
          <button 
            v-for="plan in planes" 
            :key="plan.id"
            @click="seleccionarPlan(plan.id)"
            class="relative w-[290px] md:w-auto rounded-xl p-5 text-left transition-all duration-300 border group hover:bg-white/5"
            :class="planActivo === plan.id 
              ? `bg-stone-800 ${plan.border} shadow-xl ring-1 ring-offset-2 ring-offset-[#1c1917] ${plan.bgActive}` 
              : 'bg-stone-800/40 border-transparent opacity-60 hover:opacity-100'"
          >
            <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
              <div class="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-2xl shadow-inner transition-transform group-hover:scale-110" :class="plan.color">
                <component :is="plan.icono" weight="fill" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{{ plan.titulo }}</p>
                <p class="text-xl font-serif text-white">{{ plan.nombre }}</p>
              </div>
              <div v-if="planActivo === plan.id" class="ml-auto">
                <PhCheckCircle weight="fill" class="text-emerald-400 text-2xl" />
              </div>
            </div>

            <div class="space-y-2 pl-1">
              <div v-for="(feat, i) in plan.features" :key="'f'+i" class="flex items-start gap-2 text-[11px] md:text-xs text-stone-300">
                <PhCheckCircle weight="fill" class="text-emerald-500 shrink-0 mt-0.5 text-[12px]" />
                <span :class="planActivo === plan.id ? 'text-white font-medium' : ''">{{ feat }}</span>
              </div>
              <div v-for="(miss, j) in plan.missing" :key="'m'+j" class="flex items-start gap-2 text-[11px] text-stone-600">
                <PhXCircle weight="bold" class="shrink-0 mt-0.5 opacity-50" />
                <span class="line-through decoration-stone-600/50 italic">{{ miss }}</span>
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

.custom-scrollbar {
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.custom-scrollbar::-webkit-scrollbar { 
  display: none; 
}
</style>