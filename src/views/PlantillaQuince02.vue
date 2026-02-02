<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhSparkle, 
    PhMagnifyingGlassPlus, PhX, PhMusicNotes, PhCrown,
    PhLockKey, PhMagicWand // Nuevos iconos
  } from '@phosphor-icons/vue'
  
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router' // Importante

  // Componentes
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos15 from '../components/ModalRegalos15.vue'
  import Cronograma15 from '../components/Cronograma15.vue'
  import CodigoVestimenta15 from '../components/CodigoVestimenta15.vue'
  import Navbar from '../components/Navbar.vue'
  import IconoAnimado from '../components/IconoAnimado.vue'
  
  // Componentes Nuevos
  import DemoSwitcher15 from '../components/DemoSwitcher15.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  // 1. DEFINIR ROUTE
  const route = useRoute()
  
  const modalAbierto = ref(false)
  const modalRegalosOpen = ref(false) // Alias de compatibilidad

  // --- LÓGICA DE PLANES ACTUALIZADA (Party, Glow, Queen) ---
  const planVisualizado = ref(props.datos.esDemo ? 'queen' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }

  // Variables NUEVAS
  const esGlow = computed(() => ['glow', 'queen', 'gold', 'premium'].includes(planVisualizado.value)) 
  const esQueen = computed(() => ['queen', 'premium'].includes(planVisualizado.value))

  // --- VARIABLES DE COMPATIBILIDAD ---
  const esGold = esGlow 
  const esPremium = esQueen

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    if (esQueen.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 6)
  })

  // --- LÓGICA NOMBRE PERSONALIZADO (Solo en Queen) ---
  const nombreInvitado = computed(() => {
    if (!esQueen.value) return null
    if (route.query.invitado) return route.query.invitado
    if (props.datos.esDemo) return 'Familia Pérez' 
    return null
  })

  // --- EFECTO ESCRITURA ---
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombre || props.datos.nombres 
    let i = 0
    nombreMostrado.value = ""
    if (!nombreCompleto) return 

    const intervaloEscritura = setInterval(() => {
      if (i < nombreCompleto.length) {
        nombreMostrado.value += nombreCompleto.charAt(i)
        i++
      } else {
        clearInterval(intervaloEscritura)
        cursorVisible.value = false
      }
    }, 150)
  }

  // --- LÓGICA MODO ANFITRIÓN ---
  const showGenerador = ref(false)
  const esAdmin = computed(() => route.query.admin === 'true' || props.datos.esDemo)
  const urlActual = computed(() => typeof window !== 'undefined' ? window.location.href : '')

  // Lifecycle
  onMounted(() => {
    document.title = `Mis 15 Años | ${props.datos.nombre}`
    document.body.classList.add('scroll-neon') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-neon')
    document.title = 'Invitación Digital'
  })

  // Lightbox
  const fotoEnGrande = ref(null)
  const abrirFoto = (foto) => { fotoEnGrande.value = foto; document.body.style.overflow = 'hidden' }
  const cerrarFoto = () => { fotoEnGrande.value = null; document.body.style.overflow = '' }
</script>

<template>
  <div class="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-fuchsia-500 selection:text-white">

    <header class="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-4">
      
      <div class="absolute inset-0 z-0 bg-[#050505]">
        <img :src="datos.fotoPortada" class="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay" />
        <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/80 to-black"></div>
      </div>

      <div class="absolute top-1/4 -left-20 w-64 h-64 bg-fuchsia-600 rounded-full blur-[120px] opacity-20 animate-pulse-slow pointer-events-none"></div>
      <div class="absolute bottom-1/4 -right-20 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse-slow delay-1000 pointer-events-none"></div>

      <div class="absolute top-[8vh] z-40 w-full flex justify-center pointer-events-none px-6">
        <transition name="fade" mode="out-in" type="transition">
          
          <div v-if="esQueen && nombreInvitado" key="vip" class="pointer-events-auto">
             <div class="animate-bounce-slow">
               <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400/50 transform rotate-[-1deg]">
                 <p class="font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
                   <PhCrown weight="fill" class="text-yellow-300 animate-pulse" /> 
                   <span>Para {{ nombreInvitado }}</span>
                 </p>
               </div>
             </div>
          </div>
        
          <div v-else-if="!esQueen && esGlow" key="upgrade" class="pointer-events-auto">
             <p class="inline-flex items-center gap-2 text-[9px] md:text-xs font-bold text-blue-200 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/30">
                <PhLockKey weight="fill" class="text-blue-400" />
                Personaliza con el <span class="text-indigo-400 font-black uppercase ml-1">Plan Queen</span>
             </p>
          </div>
        
        </transition>
      </div>

      <div class="relative z-30 flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-4 md:gap-10 pt-10">
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full">
          
          <div class="relative shrink-0">
            <div class="absolute -inset-2 bg-gradient-to-tr from-fuchsia-500 to-cyan-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
            <div class="relative w-28 h-28 md:w-56 md:h-56 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-2xl">
               <div class="w-full h-full rounded-full overflow-hidden border-4 border-black bg-black">
                  <img :src="datos.fotoPortada" class="w-full h-full object-cover object-top" alt="Avatar" />
               </div>
            </div>
            <div class="absolute -bottom-1 -right-1 bg-black border border-cyan-400 p-1.5 rounded-full shadow-[0_0_10px_#22d3ee]">
               <PhCrown size="16" weight="fill" class="text-cyan-400 md:text-2xl" />
            </div>
          </div>

          <div class="text-center md:text-left">
            <h1 class="font-vibes text-5xl sm:text-6xl md:text-[8.5rem] text-white leading-none neon-text-pink -rotate-2 transform drop-shadow-2xl whitespace-nowrap px-2">
              {{ nombreMostrado }}
            </h1>
            
            <div class="flex justify-center md:justify-start mt-2">
                <div class="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-fuchsia-500/30 px-4 py-1 rounded-lg transform skew-x-[-10deg]">
                   <div class="text-sm md:text-2xl font-bold text-fuchsia-400 font-mono tracking-widest drop-shadow-[0_0_8px_#d946ef] transform skew-x-[10deg]">
                      {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit' }) }} 
                      <span class="text-white/30 mx-1">•</span> 
                      20:00HS
                   </div>
                </div>
            </div>
          </div>
        </div>

        <div class="relative flex flex-col items-center justify-center mt-2">
            <p class="font-vibes text-3xl md:text-5xl text-cyan-300 drop-shadow-[0_0_10px_cyan] -rotate-3 translate-y-3 z-20 animate-pulse-slow">
              Mis 15 Años
            </p>
            <div class="relative">
               <h2 class="text-6xl md:text-9xl font-black text-transparent stroke-cyan font-modern tracking-tighter opacity-90 leading-none">
                 NEÓN
               </h2>
               <h2 class="absolute inset-0 text-6xl md:text-9xl font-black text-cyan-500 blur-xl opacity-40 font-modern tracking-tighter leading-none pointer-events-none">
                 NEÓN
               </h2>
            </div>
            <p class="font-vibes text-4xl md:text-6xl text-fuchsia-500 -mt-4 ml-24 md:ml-32 rotate-[-6deg] drop-shadow-[0_0_15px_#d946ef] animate-pulse z-20">
              party
            </p>
        </div>

      </div>

      <div v-for="n in 8" :key="n" 
           class="luz pointer-events-none" 
           :class="n % 2 === 0 ? 'luz-cyan' : 'luz-fuchsia'"
           :style="{ left: (n * 12) + '%', animationDuration: (8 + n) + 's' }">
      </div>

      <div class="absolute bottom-4 z-30 animate-bounce text-cyan-400 opacity-60">
         <PhMusicNotes size="20" weight="duotone" />
      </div>

      <div class="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none overflow-hidden">
        <div class="humo-capa humo-1 opacity-20"></div>
        <div class="humo-capa humo-2 opacity-10"></div>
      </div>

    </header>

    <section class="py-20 px-6 w-full text-center space-y-10 relative bg-gradient-to-b from-black via-[#110518] to-black text-white border-b border-white/5">
      <div class="relative z-10 space-y-8 max-w-2xl mx-auto">
        
        <div class="w-24 h-24 mx-auto bg-fuchsia-500/10 rounded-full flex items-center justify-center border border-fuchsia-500/30">
           <IconoAnimado src="/assets/iconos/heart.gif" class="w-16 h-16 opacity-80 text-fuchsia-400 mix-blend-screen" />
        </div>

        <p class="font-sans text-xl md:text-3xl text-gray-200 font-light leading-relaxed px-6 tracking-wide">
          "{{ datos.frase }}"
        </p>

        <div class="py-6">
          <p class="uppercase tracking-[0.3em] text-xs font-bold mb-8 text-cyan-400">Time to Party</p>
          <CuentaRegresiva 
            :fechaObjetivo="datos.fecha" 
            colorCaja="bg-[#0f0f0f] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            colorNumero="text-white font-bold"
            colorEtiqueta="text-gray-500 uppercase text-[10px]"
            colorSegundos="text-fuchsia-500" 
          />
        </div>
      </div>
    </section>

    <section v-if="datos.padres" class="min-h-screen flex items-center justify-center relative bg-black overflow-hidden py-20 px-6">
      
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div class="relative z-10 w-full max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
      
        <div class="space-y-4">
          <h3 class="font-modern text-3xl md:text-5xl text-white leading-tight uppercase tracking-wider">
            Con la compañía<br>
            <span class="text-2xl md:text-4xl text-fuchsia-400 font-light lowercase font-sans">de mis padres</span>
          </h3>
        </div>
      
        <div class="bg-[#121212] backdrop-blur-md p-10 md:p-14 rounded-3xl shadow-2xl border border-white/5 mx-auto max-w-3xl relative overflow-hidden group">
          
          <div class="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-3xl transition-colors duration-500"></div>

          <div class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative z-10">
             <div class="flex-1 space-y-2">
                <p class="font-sans text-2xl md:text-3xl text-white font-bold">
                  {{ datos.padres.padre }}
                </p>
                <p class="text-xs uppercase tracking-[0.2em] text-gray-500">Padre</p>
             </div>

             <div class="px-8 text-cyan-500">
                <PhSparkle size="32" weight="fill" />
             </div>

             <div class="flex-1 space-y-2">
                <p class="font-sans text-2xl md:text-3xl text-white font-bold">
                  {{ datos.padres.madre }}
                </p>
                <p class="text-xs uppercase tracking-[0.2em] text-gray-500">Madre</p>
             </div>
          </div>
        </div>

        <div v-if="datos.padrinos" class="space-y-4 pt-4">
            <div class="inline-block px-4 py-1 border-b border-fuchsia-500/50 mb-2">
               <p class="text-sm uppercase tracking-widest text-fuchsia-400">Mis Padrinos</p>
            </div>
            <p class="font-sans text-xl md:text-2xl text-gray-300">
               {{ datos.padrinos.nombres }}
            </p>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 relative overflow-hidden min-h-screen flex items-center">       
      
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1604147495798-57beb5d6af73?q=80&w=1170&auto" 
          class="w-full h-full object-cover opacity-40 grayscale contrast-125 mix-blend-multiply" 
        />
        <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black"></div>
      </div>

      <div class="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">      
        
        <div class="w-full md:w-1/2 order-1 relative group">
          
          <div class="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-fuchsia-600 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div class="relative h-[450px] md:h-[600px] w-full rounded-[2rem] overflow-hidden bg-black border-2 border-white/10">
            <img 
              :src="datos.fotoSegunda" 
              class="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
              alt="Recepción"
            />
            
            <div class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-center">
               <PhSparkle weight="fill" class="text-fuchsia-500 w-8 h-8 mx-auto mb-2 animate-pulse" />
               <p class="text-white text-xs font-mono tracking-[0.3em] uppercase">Estás invitado</p>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 order-2 text-center md:text-left space-y-12">
          
          <div class="relative">
            <h2 class="text-7xl md:text-9xl font-black text-transparent stroke-cyan font-outline tracking-tighter leading-none animate-flicker">
              NEON
            </h2>
            <p class="font-vibes text-5xl md:text-7xl text-fuchsia-500 -mt-6 md:-mt-10 md:ml-24 neon-text-pink -rotate-6 transform">
              party
            </p>
            <p class="text-white/80 font-mono text-sm mt-4 uppercase tracking-widest border-t border-fuchsia-500/50 pt-4 inline-block">
              {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
            </p>
          </div>
        
          <div class="space-y-8">
            
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div class="w-16 h-16 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
                 <PhMapPin class="text-cyan-400" :size="32" weight="duotone" />
              </div>
              <div class="space-y-1">
                <h3 class="text-xl text-white font-bold uppercase tracking-wider">Ubicación</h3>
                <p class="text-lg text-gray-300 font-light leading-tight">
                  {{ datos.ubicacion.nombreLugar }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ datos.ubicacion.direccion }}
                </p>
                <a :href="datos.ubicacion.linkGps" target="_blank" class="inline-block mt-2 text-xs text-cyan-400 font-bold uppercase tracking-widest hover:text-white hover:underline transition-all">
                  Ver Mapa GPS ->
                </a>
              </div>
            </div>
          
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div class="w-16 h-16 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0">
                 <PhCalendarCheck class="text-fuchsia-400" :size="32" weight="duotone" />
              </div>
              <div class="space-y-1">
                <h3 class="text-xl text-white font-bold uppercase tracking-wider">Horario</h3>
                <p class="text-lg text-gray-300 font-light">
                  Recepción: <span class="text-fuchsia-400 font-bold font-mono">{{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}</span>
                </p>
                
                <button v-if="esGold" class="mt-2 px-4 py-1 rounded-full border border-white/20 text-xs text-white hover:bg-white hover:text-black transition-colors">
                  + Agregar al calendario
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <section v-if="esGlow && datos.galeria" class="py-20 bg-black relative overflow-hidden min-h-[600px] border-t border-white/10">
      <div v-if="!esQueen && datos.galeria.length > 6" class="text-center pt-8 relative z-30">
   <div class="inline-block relative group cursor-pointer">
     <div class="absolute inset-0 bg-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
     <p class="relative text-blue-200 text-xs italic border border-blue-500/30 px-6 py-2 rounded-full uppercase tracking-wider bg-slate-900/90 flex items-center gap-2">
       <PhLockKey weight="fill" />
       + {{ datos.galeria.length - 6 }} fotos más en Plan Queen
     </p>
   </div>
</div>
      <div class="relative z-20 text-center mb-12">
        <h3 class="font-modern text-5xl md:text-6xl text-white uppercase tracking-tighter">
          Photo <span class="text-fuchsia-500">Dump</span>
        </h3>
        <p class="text-gray-500 text-sm mt-2 tracking-widest uppercase">Mis mejores momentos</p>
      </div>

      <div class="relative z-20 w-full overflow-hidden py-8">
        <div class="flex animate-marquee hover-pause">

          <div class="flex shrink-0 gap-6 px-4">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'orig-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <img :src="foto" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />

                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-400">
                   <PhMagnifyingGlassPlus size="48" />
                </div>
              </div>
            </div>
          </div>
        
          <div class="flex shrink-0 gap-6 px-4" aria-hidden="true">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'clon-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <img :src="foto" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />

                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-400">
                   <PhMagnifyingGlassPlus size="48" />
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="fotoEnGrande" 
          class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          @click="cerrarFoto"
        >
          <button 
            class="absolute top-6 right-6 text-white hover:text-cyan-400 z-[101] p-3 bg-white/10 rounded-full transition-colors cursor-pointer" 
            @click.stop="cerrarFoto"
          >
            <PhX size="32" weight="bold" />
          </button>
        
          <div class="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-2 animate-fade-in-up">
              <img 
                :src="fotoEnGrande" 
                class="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_30px_rgba(217,70,239,0.3)] border-2 border-fuchsia-500/50"
                alt="Foto grande"
                @click.stop
              />
          </div>
        </div>
      </Transition>

      <div v-if="!esGlow" class="py-12 bg-slate-950 text-center border-t border-slate-800/50">
         <div class="inline-flex items-center gap-2 bg-slate-900/50 px-5 py-3 rounded-full border border-slate-800">
            <PhLockKey weight="duotone" class="text-slate-500 text-lg" />
            <span class="text-slate-400 text-xs uppercase tracking-widest">
              Desbloquea Fotos con el <strong class="text-blue-400">Plan Glow</strong>
            </span>
         </div>
      </div>

    </section>

    <transition name="fade">
      <section v-if="esGold" class="bg-[#050505] py-24 relative">
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-[#050505]"></div>

        <div class="text-center mb-20 relative z-10">
          <h2 class="font-modern text-6xl text-white mb-2 uppercase tracking-tighter animate-pulse-slow">
            Line <span class="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">Up</span>
          </h2>
          <p class="font-sans text-xl text-gray-400 tracking-[0.2em] uppercase">Itinerario</p>
        </div>
      
        <Cronograma15 
          :eventos="datos.agenda"
          colorCardBg="bg-[#121212] border border-white/10 hover:border-cyan-500/50 hover:bg-[#1a1a1a] transition-all duration-300 group shadow-lg"
          colorLinea="border-cyan-400"
          colorHora="text-cyan-400 font-bold font-mono text-lg tracking-widest drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
          colorTitulo="text-white uppercase font-bold tracking-wider text-xl"
          
          tamanoCirculo="w-18 h-18 md:w-24 md:h-24"
          colorCirculo="bg-black"
          bordeCirculo="border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          offsetCirculo="-left-9 md:-left-12"

          colorIcono="bg-cyan-400 "
        />
      
        <div class="mt-24"></div>
      
        <div class="dress-code-neon px-4">
          <div class="text-center mb-10">
             <h3 class="font-modern text-4xl text-white uppercase tracking-tighter">Dress Code</h3>
             <div class="w-20 h-1 bg-fuchsia-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#d946ef]"></div>
          </div>
        
          <CodigoVestimenta15 
            v-if="datos.vestimenta"
            :nota="datos.vestimenta.nota"
            :tipo="datos.vestimenta.tipo"
            :labelHombres="datos.vestimenta.etiquetaHombres || 'Formal'"
            :labelMujeres="datos.vestimenta.etiquetaMujeres || 'Formal'"
            :imgHombres="'/assets/iconos/suit.png'"
            :imgMujeres="'/assets/iconos/dress.png'"
            :ocultarTitulo="true"

            tamanoCirculo="w-28 h-28 md:w-40 md:h-40"
            colorCirculo="bg-black"
            bordeCirculo="border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
            
            colorFondoCard="bg-[#121212]"
            colorBordeCard="border-white/10 hover:border-fuchsia-500/50"
            colorTitulo="text-fuchsia-400"
            colorTexto="text-gray-400"
            
            colorIcono="bg-white icono-neon-mask-pink" 
          />
        
        </div>
      </section>
    </transition>

    <div v-if="!esGold" class="py-12 bg-black text-center border-t border-white/10">
       <p class="text-gray-500 text-xs italic flex items-center justify-center gap-2 uppercase tracking-widest">
         <PhSparkle weight="fill" class="text-fuchsia-500" /> Plan Glow: Desbloquea Fotos y Cronograma
       </p>
    </div>

    <section class="py-24 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">  
      
      <div class="max-w-lg mx-auto relative z-10">

        <div class="bg-[#121212] rounded-[2rem] shadow-2xl overflow-hidden relative border border-white/10">

          <div class="p-10 md:p-12 text-center space-y-10">
            <div v-if="datos.regalos && datos.regalos.length > 0" class="space-y-5">
               <div class="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center border border-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.1)]">
                  <IconoAnimado src="/assets/iconos/gift.gif" class="w-20 h-20 opacity-90 text-fuchsia-500 mix-blend-screen" />
               </div>
               <h3 class="font-modern text-3xl text-white uppercase">Regalos</h3>
               <p class="font-sans text-base text-gray-400 leading-relaxed px-2">
                 Tu presencia es lo más importante. Pero si deseas tener un detalle...
               </p>
               <button 
                 @click="modalAbierto = true" 
                 class="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold tracking-widest text-fuchsia-400 border border-fuchsia-500 rounded-none hover:bg-fuchsia-500 hover:text-white transition-all duration-300 uppercase text-xs"
               >
                 <span>Ver Datos Bancarios</span>
               </button>
            </div>
            
            <div v-if="datos.regalos && datos.regalos.length > 0" class="w-full flex items-center justify-center opacity-20">
                <div class="h-px w-16 bg-white"></div>
                <div class="mx-2 text-white text-xs">✦</div> <div class="h-px w-16 bg-white"></div>
            </div>
            
            <div class="space-y-4">
               <h3 class="font-modern text-3xl text-white uppercase">Confirmación</h3>
               <p class="font-sans text-gray-400 text-base">
                 Por favor confirma antes del <br>
                 <span class="text-cyan-400 font-bold">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'long', day: 'numeric' }) }}</span>
               </p>
               <div class="pt-4 flex justify-center">
                 
                  <BotonAccion 
                      texto="Confirmar Asistencia" 
                      :icono="PhWhatsappLogo" 
                      :url="`https://wa.me/${datos.contacto.whatsapp}`" 
                      color="bg-white text-black border-2 border-cyan-400 hover:bg-cyan-400 hover:text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-500 font-bold" 
                    />
                    
               </div>
            </div>
          </div>
        </div>
      
        <div class="text-center mt-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
           <p class="font-modern text-4xl text-white tracking-widest uppercase">Te espero</p>
        </div>
      
      </div>
    </section>

    <footer class="bg-black text-gray-600 py-10 text-center text-[10px] uppercase tracking-[0.2em] pb-32 border-t border-white/5">
      <p class="mb-2">Mis 15 Años • {{ nombreMostrado }}</p>
      <p>Powered by <span class="text-cyan-500 font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-black border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      colorIcono="text-cyan-400"
    />
    
    <ModalRegalos15 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      claseColorPrincipal="bg-[#0f0f0f] border border-fuchsia-500/40 shadow-[0_0_40px_rgba(217,70,239,0.15)] text-cyan-400 font-mono"
      claseOverlay="bg-black/95 backdrop-blur-xl"
    />

    <DemoSwitcher15 
      v-if="datos.esDemo" 
      @cambioPlan="actualizarPlan" 
    />

    <div v-if="esAdmin && esQueen" class="fixed bottom-24 left-4 z-[90]">
       <button 
         @click="showGenerador = true"
         class="bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl shadow-purple-500/50 flex items-center gap-3 border-2 border-purple-500 hover:scale-105 transition-transform group"
       >
         <div class="bg-purple-500 rounded-full p-1 group-hover:animate-spin-slow">
            <PhMagicWand weight="fill" />
         </div>
         <div class="text-left leading-none pr-2">
            <p class="text-[9px] text-purple-200 font-bold uppercase tracking-wider">Modo Anfitrión</p>
            <p class="text-sm font-bold">Crear Invitación</p>
         </div>
       </button>
    </div>

    <ModalGeneradorLinks 
       :isOpen="showGenerador"
       :urlBase="urlActual"
       :nombreFestejado="datos.nombre || datos.nombres"
       tipoEvento="xv" 
       colorHeader="bg-gradient-to-r from-[#d946ef] to-[#06b6d4]" 
       @close="showGenerador = false"
    />

    <Navbar />

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@900&display=swap');

/* TIPOGRAFÍA */
.font-modern { font-family: 'Montserrat', sans-serif; font-weight: 900; }
.font-vibes { font-family: 'Great Vibes', cursive; }

/* EFECTO NEÓN TEXTO */
.neon-text-pink {
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d946ef, 0 0 40px #d946ef;
}

.stroke-cyan {
  -webkit-text-stroke: 2px #06b6d4;
  color: transparent;
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
}

/* ICONOS MÁSCARA */
:deep(.icono-neon-mask) {
  background-color: white !important;
  filter: drop-shadow(0 0 5px #22d3ee) drop-shadow(0 0 10px #22d3ee) !important;
  animation: pulse-neon 2s infinite alternate;
}

:deep(.icono-neon-mask-pink) {
  background-color: white !important;
  filter: drop-shadow(0 0 5px #d946ef) drop-shadow(0 0 10px #d946ef) !important;
  animation: pulse-neon 2s infinite alternate;
}

@keyframes pulse-neon {
  from { opacity: 0.8; transform: scale(1); }
  to { opacity: 1; transform: scale(1.05); }
}

/* PARTÍCULAS LUZ */
.luz { position: absolute; border-radius: 50%; opacity: 0; animation: flotar linear infinite; }
.luz-cyan { background: #06b6d4; box-shadow: 0 0 10px #06b6d4; width: 4px; height: 4px; }
.luz-fuchsia { background: #d946ef; box-shadow: 0 0 10px #d946ef; width: 3px; height: 3px; }

@keyframes flotar {
  0% { transform: translateY(0); opacity: 0; }
  20% { opacity: 0.7; }
  100% { transform: translateY(-110vh); opacity: 0; }
}

.animate-pulse-slow { animation: pulse 4s infinite; }

/* --- EFECTO HUMO DE DISCOTECA --- */
.humo-capa {
  position: absolute;
  bottom: -20px;
  left: -10%;
  width: 120%;
  height: 100%;
  background: radial-gradient(circle at 50% 100%, rgba(217, 70, 239, 0.1), rgba(6, 182, 212, 0.05), transparent 70%);
  filter: blur(40px);
  will-change: transform, opacity;
}

.humo-1 {
  animation: humo-vuelo 10s ease-in-out infinite alternate;
}

.humo-2 {
  animation: humo-vuelo 14s ease-in-out infinite alternate-reverse;
  opacity: 0.6;
}

@keyframes humo-vuelo {
  0% { transform: scaleX(1) translateX(0) translateY(0); opacity: 0.3; }
  50% { transform: scaleX(1.2) translateX(20px) translateY(-10px); opacity: 0.6; }
  100% { transform: scaleX(1.1) translateX(-10px) translateY(-20px); opacity: 0.4; }
}
.animate-bounce-slow {
  animation: bounce-gentle 4s infinite ease-in-out;
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Agrega esto junto a tus otras animaciones */
.animate-flicker { animation: flicker-neon 3s infinite; }

@keyframes flicker-neon {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.3; }
}
</style>

<style>
body.scroll-neon::-webkit-scrollbar { width: 8px; }
body.scroll-neon::-webkit-scrollbar-track { background: #050505; }
body.scroll-neon::-webkit-scrollbar-thumb { 
  background: linear-gradient(to bottom, #d946ef, #06b6d4); 
  border-radius: 4px; 
}
</style>