<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import { 
  PhList, PhX, PhHouse, PhWhatsappLogo, PhStorefront, 
  PhQuestion, PhCaretRight, PhConfetti, PhBaby, PhHeart 
} from '@phosphor-icons/vue'

const route = useRoute()
const menuAbierto = ref(false)

// --- VARIABLES REACTIVAS PARA EL SCROLL ---
const isTop = ref(true)      // ¿Estamos arriba del todo? (Para el Logo)
const menuOculto = ref(false) // ¿Debemos esconder la hamburguesa? (Smart Hide)
let lastScrollY = 0          // Variable interna para calcular dirección

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // 1. Detectar si estamos en el tope (zona segura de 50px)
  // Si currentScrollY es menor a 50, isTop es TRUE -> MOSTRAR LOGO
  isTop.value = currentScrollY < 50

  // 2. Lógica Smart Hide para la Hamburguesa
  if (currentScrollY > 50) {
    if (currentScrollY > lastScrollY) {
      // Bajando -> Ocultar Hamburguesa
      menuOculto.value = true
    } else {
      // Subiendo -> Mostrar Hamburguesa
      menuOculto.value = false
    }
  } else {
    // Si estamos arriba, siempre mostrar la hamburguesa en su sitio
    menuOculto.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const esPlantilla = computed(() => route.path.includes('/invitacion/'))

const categoriasMenu = [
  { nombre: "Bodas", link: "/bodas", icono: PhHeart, color: "text-rose-400", tipo: 'boda' },
  { nombre: "15 Años", link: "/15-anos", icono: PhConfetti, color: "text-fuchsia-400", tipo: 'xv' },
  { nombre: "Infantiles", link: "/infantiles", icono: PhBaby, color: "text-sky-400", tipo: 'infatil' },
]

// LISTA DE MODELOS
const modelosParaMenu = [
  { nombre: "Clásico Marsala", id: 'juan-y-ana', tipo: 'boda', img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150", modelo: 'Clásica' },
  { nombre: "Estilo Gala Luxury", id: 'carlos-y-sofia', tipo: 'boda', img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150", modelo: 'Luxury' },
  { nombre: "Estilo Boho Garden", id: 'miguel-y-elena', tipo: 'boda', img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150", modelo: 'Boho' },
  { nombre: "Euphoria Night", id: 'camila-xv', tipo: 'xv', img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=150", modelo: 'Euphoria Night' },
  { nombre: "Golden Princess", id: 'sofia-xv', tipo: 'xv', img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=150", modelo: 'Golden Princess' },
  { nombre: "Rose Gold Dream", id: 'valentina-xv', tipo: 'xv', img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=150", modelo: 'Rose Gold Dream' },
  { nombre: "Huntrix Tour", id: 'karen', tipo: 'infatil', img: "https://plus.unsplash.com/premium_photo-1663090820483-34c51673ced7?q=80&w=150", modelo: 'Huntrix' },
  { nombre: "Baby Dino", id: 'pablo', tipo: 'infatil', img: "https://plus.unsplash.com/premium_photo-1661636787018-50e9c004c5a3?q=80&w=150", modelo: 'Baby' },
  { nombre: "Baby Unicornio", id: 'valeria', tipo: 'infatil', img: "https://plus.unsplash.com/premium_photo-1661636787018-50e9c004c5a3?q=80&w=150", modelo: 'Baby Unicornio' }
]

const modelosMostrados = computed(() => {
  const path = route.path.toLowerCase()
  let categoriaDetectada = null

  if (path.includes('infantil')) categoriaDetectada = 'infatil'
  else if (path.includes('boda')) categoriaDetectada = 'boda'
  else if (path.includes('15-anos') || path.includes('quince')) categoriaDetectada = 'xv'

  if (!categoriaDetectada) {
    const segments = path.split('/')
    const currentId = segments[segments.length - 1]
    const modeloActual = modelosParaMenu.find(m => m.id === currentId)
    if (modeloActual) categoriaDetectada = modeloActual.tipo
  }

  if (categoriaDetectada) return modelosParaMenu.filter(m => m.tipo === categoriaDetectada)

  return [
    modelosParaMenu.find(m => m.tipo === 'boda'),
    modelosParaMenu.find(m => m.tipo === 'xv'),
    modelosParaMenu.find(m => m.tipo === 'infatil')
  ].filter(Boolean)
})

const tituloSeccion = computed(() => {
  const path = route.path.toLowerCase()
  const segments = path.split('/')
  const currentId = segments[segments.length - 1]
  const modeloActual = modelosParaMenu.find(m => m.id === currentId)
  
  const tipo = (modeloActual && modeloActual.tipo) || 
               (path.includes('infantil') ? 'infatil' : 
               path.includes('boda') ? 'boda' : 
               path.includes('15-anos') ? 'xv' : null)

  if (tipo === 'infatil') return "Plantillas Infantiles"
  if (tipo === 'boda') return "Plantillas de Bodas"
  if (tipo === 'xv') return "Plantillas de 15 Años"
  return "Demos Destacados"
})

const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value
  document.body.style.overflow = menuAbierto.value ? 'hidden' : ''
}
</script>

<template>
  <div>
    <nav class="fixed top-0 left-0 w-full z-[60] px-6 py-5 flex justify-between items-start pointer-events-none">
      
      <div 
        class="pointer-events-auto transition-all duration-500 transform origin-left"
        :class="(!isTop || esPlantilla) ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'"
      >
        <router-link to="/">
          <img 
            src="/logo.png" 
            alt="Yupa Studio" 
            class="h-10 md:h-12 w-auto object-contain drop-shadow-md hover:opacity-90 transition-opacity" 
          />
        </router-link>
      </div>

      <div class="flex items-center gap-3 pointer-events-auto">
        
        <div 
          class="hidden md:block transition-all duration-500 transform"
          :class="(!isTop || esPlantilla) ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'"
        >
          <a 
            href="https://wa.me/59164042420" 
            target="_blank"
            class="px-5 py-2 rounded-full text-sm font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-stone-900 shadow-sm transition-colors"
          >
            Contactar
          </a>
        </div>

        <div
            class="transition-transform duration-500 ease-in-out"
            :class="menuOculto ? '-translate-y-32' : 'translate-y-0'"
        >
            <button 
              @click="toggleMenu"
              class="rounded-full p-3 transition-all duration-300 group shadow-lg border backdrop-blur-xl"
              :class="[
                'bg-slate-900/40 border-white/20 text-white hover:bg-white hover:text-rose-500 hover:scale-110'
              ]"
              aria-label="Abrir menú"
            >
              <PhList size="26" weight="bold" />
            </button>
        </div>

      </div>
    </nav>

    <Transition name="fade">
      <div 
        v-if="menuAbierto" 
        class="fixed inset-0 z-[100] flex flex-col items-center overflow-y-auto bg-slate-900/60 backdrop-blur-2xl"
      >
        
        <div class="w-full max-w-md p-6 flex justify-between items-center border-b border-white/10">
           <img src="/logo.png" alt="Yupa Studio" class="h-8 md:h-10 w-auto object-contain drop-shadow-lg" />
           <button @click="toggleMenu" class="text-white/70 hover:text-rose-400 p-2 rounded-full hover:bg-white/10 transition">
             <PhX size="32" weight="light" />
           </button>
        </div>

        <div class="w-full max-w-md p-6 flex flex-col gap-8 pb-20">
          
          <nav class="flex flex-col gap-2">
            <p class="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 px-2">Navegación</p>
            
            <router-link to="/" @click="toggleMenu" class="flex items-center gap-4 text-lg text-white/80 font-light p-3 rounded-xl hover:text-white hover:bg-white/10 transition-all">
              <PhHouse size="22" weight="duotone" class="text-white/60" /> Inicio
            </router-link>

            <router-link v-for="cat in categoriasMenu" :key="cat.nombre" :to="cat.link" @click="toggleMenu" class="flex items-center gap-4 text-lg text-white/80 font-light p-3 rounded-xl hover:text-white hover:bg-white/10 transition-all">
              <component :is="cat.icono" size="22" weight="duotone" :class="cat.color" /> 
              {{ cat.nombre }}
            </router-link>
            
            <div class="h-px bg-white/10 my-2"></div>

            <a href="/#precios" @click="toggleMenu" class="flex items-center gap-4 text-base text-white/60 font-light p-3 rounded-xl hover:text-white hover:bg-white/10 transition-all">
              <PhStorefront size="20" weight="duotone" /> Precios Generales
            </a>
          </nav>

          <div class="flex flex-col gap-3">
            <p class="text-xs font-bold text-white/50 uppercase tracking-widest mb-1 px-2">{{ tituloSeccion }}</p>
            
            <router-link 
              v-for="item in modelosMostrados" 
              :key="item.id"
              :to="`/invitacion/${item.id}`"
              @click="toggleMenu"
              class="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 border border-white/5 hover:border-fuchsia-500/40 transition-all group"
            >
              <img :src="item.img" class="w-12 h-12 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition shadow-sm" />
              <div class="flex-1">
                <p class="text-white font-bold text-sm group-hover:text-fuchsia-400 transition">{{ item.nombre }}</p>
                <p class="text-white/40 text-[10px] uppercase tracking-tighter">Modelo: {{ item.modelo }}</p>
              </div>
              <PhCaretRight size="16" class="text-white/40 group-hover:text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>

          <div class="mt-4 pt-6 border-t border-white/10 text-center">
            <a href="https://wa.me/59164042420" target="_blank" class="bg-gradient-to-r from-rose-600 to-rose-500 text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:from-rose-500 hover:to-rose-400 transition shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2">
              <PhWhatsappLogo size="20" weight="bold" /> Contactar Soporte
            </a>
            <p class="text-white/30 text-[10px] mt-4 leading-relaxed">
              Yupa Studio © 2026. <br> Diseños digitales premium.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>