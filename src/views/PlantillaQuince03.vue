<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhSparkle, PhMagnifyingGlassPlus, PhX, PhMusicNotes, PhCrown,
    PhLockKey, PhMagicWand // Agregamos los iconos nuevos necesarios
  } from '@phosphor-icons/vue'
  
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router' // Importante para que no de error "route undefined"
  
  // Componentes
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos15 from '../components/ModalRegalos15.vue'
  import Cronograma15 from '../components/Cronograma15.vue'
  import CodigoVestimenta15 from '../components/CodigoVestimenta15.vue'
  import IconoAnimado from '../components/IconoAnimado.vue'
  
  // Componentes Nuevos
  import DemoSwitcher15 from '../components/DemoSwitcher15.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'
  import Navbar from '../components/Navbar.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  // 1. DEFINIR ROUTE (Esto arregla el error "ReferenceError: route is not defined")
  const route = useRoute()
  
  const modalAbierto = ref(false)
  const modalRegalosOpen = ref(false) // Alias por si acaso usas el otro nombre

  // --- LOGICA DE PLANES ACTUALIZADA (Party, Glow, Queen) ---
  const planVisualizado = ref(props.datos.esDemo ? 'queen' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }
  
  // Variables NUEVAS
  const esGlow = computed(() => ['glow', 'queen', 'gold', 'premium'].includes(planVisualizado.value)) 
  const esQueen = computed(() => ['queen', 'premium'].includes(planVisualizado.value))

  // --- VARIABLES DE COMPATIBILIDAD (Esto arregla el error "esGold/esPremium is not defined") ---
  // Hacemos que esGold apunte a esGlow, y esPremium a esQueen. Así tu template viejo funciona.
  const esGold = esGlow 
  const esPremium = esQueen

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    // Si es Queen -> Todas. Si es Glow -> 6. Si es Party -> 0.
    if (esQueen.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 6)
  })

  // --- LÓGICA NOMBRE PERSONALIZADO (Solo en Queen) ---
  const nombreInvitado = computed(() => {
    // Si no es plan Queen/Premium, no mostramos nada
    if (!esQueen.value) return null
    
    // Si viene en la URL
    if (route.query.invitado) return route.query.invitado
    
    // Si es Demo
    if (props.datos.esDemo) return 'Familia Pérez' 
    
    return null
  })

  // Efecto de escritura (Tipeo)
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombre || props.datos.nombres 
    let i = 0
    nombreMostrado.value = ""
    // Validación simple por si el nombre viene vacío
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

  // --- LÓGICA MODO ANFITRIÓN (GENERADOR) ---
  const showGenerador = ref(false)
  const esAdmin = computed(() => route.query.admin === 'true' || props.datos.esDemo)
  const urlActual = computed(() => typeof window !== 'undefined' ? window.location.href : '')

  // Lifecycle
  onMounted(() => {
    document.title = `XV Años | ${props.datos.nombre}`
    document.body.classList.add('scroll-royal') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-royal')
    document.title = 'Invitación Digital'
  })

  // Lightbox (Visor de fotos)
  const fotoEnGrande = ref(null)
  const abrirFoto = (foto) => {
    fotoEnGrande.value = foto
    document.body.style.overflow = 'hidden'
  }
  const cerrarFoto = () => {
    fotoEnGrande.value = null
    document.body.style.overflow = ''
  }
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden font-serif">
    <header class="relative min-h-[100dvh] w-full flex flex-col justify-center items-center text-center overflow-hidden">
      
      <div class="absolute inset-0 z-0 bg-slate-50">
        <img 
          :src="datos.fotoPortada" 
          class="w-full h-full object-cover opacity-30 blur-sm mix-blend-luminosity scale-110" 
          alt="Fondo Quinceañera"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop" 
          class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
          alt="Textura"
        />
        
        <div class="fondo-animado-aurora absolute inset-0 mix-blend-soft-light opacity-50"></div>

        <div class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/90"></div>
      </div>

      <div class="absolute inset-0 z-20 pointer-events-none opacity-90">
         <img 
           src="/assets/marco-flores.webp" 
           class="w-full h-full object-cover md:object-fill" 
           alt="Marco floral" 
         />
      </div>

      <div class="mariposas-azules absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div v-for="n in 10" :key="n" class="mariposa-azul absolute opacity-70 text-blue-400">
           <svg viewBox="0 0 500 500" class="w-full h-full overflow-visible drop-shadow-sm">
             <path class="fill-none stroke-current" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" d="M135.16,55.11s-40.9,40.61-55.21,67.68c-9.77,18.48.1,16.73,12.28.19,12.18-16.53,25.81-33.07,4.93-75.99C76.28,4.06,50.76,11.89,49.02,13.34c-1.74,1.45-20.01,41.48-8.7,67.58,11.31,26.1,26.97,23.78,27.84,19.72.87-4.06-15.66-24.07-34.23-7.25C15.37,110.22,11.02,127.91,0,121.53c0,0,2.71,18.93,37.13,17.98,31.62-.87,66.42-42.76,75.7-69.74,9.28-26.97.87-60.49-10.44-69.77,0,0-13.92,2.9-17.69,21.46"/>
           </svg>
        </div>
      </div>

      <div class="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 pt-20 pb-12 gap-6 md:gap-8"> 
        
        <div class="min-h-[3rem] flex items-center justify-center">
            <transition name="fade" mode="out-in">
                <div v-if="esQueen && nombreInvitado" key="vip" class="animate-fade-in-up">
                   <div class="bg-white/80 backdrop-blur-md border border-blue-200 px-6 py-2 rounded-full shadow-lg ring-1 ring-white/50">
                     <p class="text-blue-600 text-xs md:text-sm font-bold tracking-[0.15em] uppercase flex items-center gap-2">
                       <PhCrown weight="fill" class="text-amber-400 text-lg" /> Para {{ nombreInvitado }}
                     </p>
                   </div>
                </div>

                <div v-else-if="!esQueen && esGlow" class="absolute top-24 z-30">
                   <p class="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                      <PhLockKey weight="fill" class="text-slate-400" />
                      Personaliza nombres con el <span class="text-purple-500 font-black">Plan Queen</span>
                   </p>
                </div>
            </transition>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="absolute z-20 w-[140%] h-[140%] pointer-events-none -top-[20%] -left-[20%]">
            <img src="/assets/marco-flores-circular.webp" class="w-full h-full object-contain opacity-90" alt="Marco" />
          </div>
          
          <div class="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden z-10 border-[6px] border-white/90 shadow-xl">
            <img 
              :src="datos.fotoPortada" 
              class="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700" 
              alt="Avatar Quinceañera"
            />
          </div>

          <PhSparkle weight="fill" size="28" class="absolute -top-4 -right-4 text-blue-300 z-30 animate-pulse" />
        </div>

        <div class="text-center space-y-4 md:space-y-6 -mt-2">
          
          <div class="flex items-center justify-center gap-4 text-blue-500 font-cinzel text-base md:text-xl tracking-[0.2em] uppercase font-bold opacity-80">
             <div class="h-[1px] w-8 md:w-16 bg-blue-400"></div>
             <span>Mis 15 Años</span>
             <div class="h-[1px] w-8 md:w-16 bg-blue-400"></div>
          </div>

          <h1 class="font-great-vibes text-6xl sm:text-7xl md:text-9xl text-blue-600 drop-shadow-sm leading-[0.9] py-2 relative z-20">
            {{ nombreMostrado }}
            <PhSparkle weight="fill" class="absolute top-0 right-0 md:-right-8 text-amber-300 w-6 h-6 md:w-10 md:h-10 animate-spin-slow opacity-80" />
          </h1>
          
          <div class="space-y-4 max-w-lg mx-auto">
             <div class="inline-block bg-white/40 backdrop-blur-sm border border-white/60 px-8 py-2 rounded-full shadow-sm">
                <p class="font-cinzel text-xl md:text-2xl text-slate-800 font-bold tracking-wide capitalize">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'long', day: 'numeric' }) }}
                </p>
             </div>
             
             <p class="font-playfair italic text-slate-600 leading-relaxed text-sm md:text-lg px-4 font-medium drop-shadow-sm">
               "Te invito a celebrar conmigo este día tan especial lleno de magia y sueños."
             </p>
          </div>

        </div>
      </div>

      <div class="absolute bottom-8 z-30 animate-bounce text-blue-400 opacity-80">
          <div class="flex flex-col items-center gap-1">
            <span class="text-[10px] uppercase tracking-widest font-cinzel">Desliza</span>
            <PhSparkle weight="light" size="24" />
          </div>
      </div>

    </header>

    <section class="py-28 px-6 w-full relative overflow-hidden bg-[#0f172a]">
      
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#0f172a]"></div>
      
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-screen"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-screen"></div>

      <div class="absolute inset-0 z-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div class="relative z-10 max-w-4xl mx-auto space-y-16">
        
        <div class="text-center space-y-6">
           <div class="flex justify-center items-center gap-4 opacity-70">
              <div class="h-[1px] w-12 bg-blue-400"></div>
              <PhSparkle weight="fill" class="text-blue-200 animate-pulse" size="24" />
              <div class="h-[1px] w-12 bg-blue-400"></div>
           </div>

           <h3 class="font-great-vibes text-5xl md:text-7xl text-white leading-tight drop-shadow-[0_0_15px_rgba(191,219,254,0.5)] px-4 transform hover:scale-105 transition-transform duration-700">
             "{{ datos.frase }}"
           </h3>
        </div>

        <div class="relative">
           <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur opacity-50 animate-pulse"></div>
           
           <div class="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50 p-10 md:p-16 text-center overflow-hidden">
              
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>

              <div class="space-y-8">
                 <div class="inline-block">
                    <p class="font-cinzel text-blue-200 tracking-[0.3em] uppercase text-sm border border-white/10 rounded-full px-6 py-2 bg-white/5">
                      El gran día se acerca
                    </p>
                 </div>

                 <CuentaRegresiva 
                   :fechaObjetivo="datos.fecha" 
                   colorCaja="bg-white/5 border border-white/10 shadow-inner"
                   colorNumero="text-white font-cinzel font-bold drop-shadow-md"
                   colorEtiqueta="text-blue-300 uppercase text-[10px] tracking-widest"
                   colorSegundos="text-blue-400" 
                 />
              </div>
           </div>
        </div>

      </div>
    </section>

    <section v-if="datos.padres" class="py-28 px-6 relative overflow-hidden bg-white">
      
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div class="absolute top-10 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
         <div class="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-5xl mx-auto text-center space-y-16">
        
        <div class="space-y-3">
          <h3 class="font-cinzel text-3xl md:text-4xl text-slate-700 tracking-wide">
            Con la bendición de Dios
          </h3>
          <div class="flex items-center justify-center gap-4">
             <div class="h-[1px] w-12 bg-blue-200"></div>
             <p class="text-blue-400 italic font-playfair text-xl">y el amor de mis padres</p>
             <div class="h-[1px] w-12 bg-blue-200"></div>
          </div>
        </div>
      
        <div class="relative">
          <div class="absolute inset-4 bg-blue-100 rounded-[3rem] blur-xl opacity-50 transform translate-y-4"></div>
          
          <div class="relative bg-white border border-blue-50 p-12 md:p-16 rounded-[3rem] shadow-xl">
            <div class="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32">
               
               <div class="space-y-2 group cursor-default">
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-2 group-hover:text-blue-400 transition-colors">Padre</p>
                  <p class="font-great-vibes text-5xl md:text-6xl text-blue-600 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                    {{ datos.padres.padre }}
                  </p>
               </div>

               <div class="text-blue-200 opacity-50">
                  <PhSparkle weight="fill" size="32" />
               </div>

               <div class="space-y-2 group cursor-default">
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-2 group-hover:text-blue-400 transition-colors">Madre</p>
                  <p class="font-great-vibes text-5xl md:text-6xl text-blue-600 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                    {{ datos.padres.madre }}
                  </p>
               </div>

            </div>
          </div>
        </div>

        <div v-if="datos.padrinos" class="space-y-6 pt-8">
            <div class="inline-block px-6 py-2 border-t border-b border-blue-100">
               <p class="text-sm uppercase tracking-[0.2em] text-slate-500 font-cinzel">Mis Padrinos de Honor</p>
            </div>
            <p class="font-playfair text-3xl md:text-4xl text-slate-700 italic">
               {{ datos.padrinos.nombres }}
            </p>
        </div>

      </div>
    </section>

    <section class="py-24 px-6 bg-slate-50 relative overflow-hidden">       
      
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">      
        
        <div class="order-1 relative p-4 group">
          <div class="absolute inset-0 border-2 border-blue-200 rounded-[3rem] transform -translate-x-3 translate-y-3 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          
          <div class="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-100 bg-white">
            <img 
              :src="datos.fotoSegunda" 
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
              alt="Recepción"
            />
            <div class="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
               <p class="text-blue-500 font-cinzel text-xs tracking-[0.2em] font-bold">CELEBRACIÓN</p>
            </div>
          </div>
        </div>

        <div class="order-2 text-center md:text-left space-y-12">
          
          <div class="space-y-4">
            <h2 class="font-cinzel text-5xl md:text-6xl text-slate-800">
              Recepción
            </h2>
            <div class="h-1 w-20 bg-blue-300 mx-auto md:mx-0 rounded-full"></div>
            <p class="text-slate-500 text-lg font-playfair italic">
              Una noche mágica llena de alegría
            </p>
          </div>
        
          <div class="space-y-10">
            
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div class="w-16 h-16 bg-white text-blue-400 rounded-2xl flex items-center justify-center shadow-md shadow-blue-50 border border-blue-50 shrink-0">
                 <PhMapPin :size="32" weight="duotone" />
              </div>
              <div class="space-y-2">
                <strong class="block text-xl text-slate-700 font-cinzel">
                  {{ datos.ubicacion.nombreLugar }}
                </strong>
                <p class="text-slate-500 font-light leading-relaxed">
                  {{ datos.ubicacion.direccion }}
                </p>
                
                <a :href="datos.ubicacion.linkGps" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 mt-2 rounded-full border border-blue-200 text-blue-500 text-xs font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all cursor-pointer group">
                  Ver Mapa GPS
                  <span class="group-hover:translate-x-1 transition-transform">-></span>
                </a>
              </div>
            </div>
          
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div class="w-16 h-16 bg-white text-blue-400 rounded-2xl flex items-center justify-center shadow-md shadow-blue-50 border border-blue-50 shrink-0">
                 <PhCalendarCheck :size="32" weight="duotone" />
              </div>
              <div class="space-y-2">
                <strong class="block text-xl text-slate-700 font-cinzel capitalize">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </strong>
                <p class="text-slate-500 font-light">
                  Hora de inicio: <span class="font-bold text-blue-500">{{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}</span>
                </p>
                
                <a v-if="esGold" :href="datos.linkCalendario" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 mt-2 rounded-full border border-blue-200 text-blue-500 text-xs font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all cursor-pointer group">
                  Agendar Fecha
                  <span class="group-hover:translate-x-1 transition-transform">+</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <section v-if="esGlow && datos.galeria" class="py-28 bg-[#0f172a] relative overflow-hidden">
       <div v-if="!esQueen && datos.galeria.length > 6" class="text-center pt-8 relative z-30">
        <div class="inline-block relative group cursor-pointer">
          <div class="absolute inset-0 bg-blue-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <p class="relative text-blue-200 text-xs italic border border-blue-500/30 px-6 py-2 rounded-full uppercase tracking-wider bg-blue-900/80 flex items-center gap-2">
            <PhLockKey weight="fill" />
            + {{ datos.galeria.length - 6 }} fotos más en Plan Queen
          </p>
        </div>
    </div>
      
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]"></div>
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="text-center mb-16 relative z-10 px-4 space-y-4">
        <h3 class="font-great-vibes text-6xl md:text-7xl text-white drop-shadow-md">
          Galería de Fotos
        </h3>
        
        <div class="flex items-center justify-center gap-4 opacity-60">
           <div class="h-[1px] w-12 bg-blue-400"></div>
           <p class="font-cinzel text-blue-200 text-sm uppercase tracking-widest">Mis mejores momentos</p>
           <div class="h-[1px] w-12 bg-blue-400"></div>
        </div>
      </div>

      <div class="relative w-full overflow-hidden py-8 z-10">
        <div class="flex animate-marquee">
          
          <div class="flex shrink-0 gap-8 px-4">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'orig-'+index" 
              class="relative w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full p-2 bg-white/5 border border-white/10 rounded-xl shadow-lg hover:border-blue-400/50 hover:shadow-blue-900/20 transition-all duration-300">
                <div class="w-full h-full overflow-hidden rounded-lg relative">
                   <img :src="foto" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                   
                   <div class="absolute inset-0 bg-blue-900/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                      <PhMagnifyingGlassPlus size="40" class="drop-shadow-md" />
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex shrink-0 gap-8 px-4" aria-hidden="true">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'clon-'+index" 
              class="relative w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full p-2 bg-white/5 border border-white/10 rounded-xl shadow-lg hover:border-blue-400/50 hover:shadow-blue-900/20 transition-all duration-300">
                <div class="w-full h-full overflow-hidden rounded-lg relative">
                   <img :src="foto" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                   
                   <div class="absolute inset-0 bg-blue-900/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                      <PhMagnifyingGlassPlus size="40" class="drop-shadow-md" />
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-if="!esPremium && datos.galeria.length > 6" class="text-center pt-8 relative z-30">
         <p class="text-blue-200 text-xs italic border border-blue-500/30 inline-block px-6 py-2 rounded-full uppercase tracking-wider bg-blue-900/30">
           + {{ datos.galeria.length - 6 }} fotos más en Plan Queen
         </p>
      </div>

      <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-4" @click="cerrarFoto">
          <button class="absolute top-6 right-6 text-white hover:text-blue-300 transition-colors p-3 bg-white/10 rounded-full cursor-pointer z-50" @click.stop="cerrarFoto">
            <PhX size="32" />
          </button>
          <img :src="fotoEnGrande" class="max-w-5xl max-h-[90vh] shadow-2xl rounded-lg border border-white/10" @click.stop />
        </div>
      </Transition>
    </section>

    <div v-if="!esGlow" class="py-12 bg-slate-900 text-center border-t border-slate-800">
       <div class="inline-flex items-center gap-2 bg-slate-800 px-5 py-3 rounded-full border border-slate-700">
          <PhLockKey weight="duotone" class="text-slate-500 text-lg" />
          <span class="text-slate-400 text-xs uppercase tracking-widest">
            Desbloquea Fotos con el <strong class="text-amber-400">Plan Glow</strong>
          </span>
       </div>
    </div>

    <transition name="fade">
      <section v-if="esGlow" class="bg-slate-50 py-24 relative border-t border-slate-200 overflow-hidden">
          
          <div class="absolute top-1/2 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div class="text-center mb-16 relative z-10">
            <h2 class="font-cinzel text-4xl md:text-5xl text-slate-700 mb-4">Itinerario</h2>
            <div class="flex items-center justify-center gap-3">
               <div class="h-[1px] w-12 bg-blue-300"></div>
               <PhSparkle class="text-blue-400 animate-pulse" weight="fill" />
               <div class="h-[1px] w-12 bg-blue-300"></div>
            </div>
          </div>

          <Cronograma15 
            :eventos="datos.agenda"
            colorCardBg="bg-white shadow-lg shadow-blue-50 border border-blue-50"
            colorLinea="border-blue-200"
            colorHora="text-blue-500 font-bold font-cinzel"
            colorTitulo="text-slate-700 font-bold uppercase"

            colorIcono="bg-blue-500"
            tamanoCirculo="w-16 h-16 md:w-24 md:h-24"
            offsetCirculo="-left-8 md:-left-12"
          />
        
          <div class="mt-24"></div>

          <div class="text-center mb-10 relative z-10">
             <h3 class="font-cinzel text-3xl text-slate-700">Código de Vestimenta</h3>
             <p class="font-playfair text-slate-500 italic mt-2">Para lucir radiantes juntos</p>
          </div>

          <div class="relative z-10">
            <CodigoVestimenta15 
              v-if="datos.vestimenta"
              :nota="datos.vestimenta.nota"
              :tipo="datos.vestimenta.tipo"
              :labelHombres="datos.vestimenta.etiquetaHombres || 'Traje Formal'"
              :labelMujeres="datos.vestimenta.etiquetaMujeres || 'Vestido Largo'"
              imgHombres="/assets/iconos/suit.png"
              imgMujeres="/assets/iconos/dress.png"
              :ocultarTitulo="true"
              colorTitulo="text-slate-700 font-cinzel"
              colorSubtitulo="text-blue-400"
              colorIcono="bg-blue-500"
              colorFondoIcono="bg-blue-50"
              colorTexto="text-slate-500 font-cinzel"
              colorBorde="border-blue-100"
              tamanoCirculo="w-32 h-32 md:w-48 md:h-48"
            />
          </div>
      </section>
    </transition>

    <div v-if="!esGlow" class="py-8 bg-slate-50 text-center">
       <p class="text-slate-400 text-xs italic flex items-center justify-center gap-2">
         <PhLockKey weight="fill" /> El cronograma está disponible en el Plan Glow
       </p>
    </div>

    <section class="py-24 px-6 bg-[#0f172a] relative overflow-hidden">
      
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#020617]"></div>
      <div class="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div class="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div class="max-w-lg mx-auto relative z-10 text-center space-y-16">
        
        <div v-if="datos.regalos && datos.regalos.length > 0" class="relative group">
           <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-700"></div>

           <div class="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-2xl">
              
              <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                 <IconoAnimado 
                   src="/assets/iconos/gift.gif" 
                   class="icono-azul-grande" 
                 />
              </div>
              
              <h3 class="font-cinzel text-3xl text-white mb-4 drop-shadow-md">Mesa de Regalos</h3>
              
              <p class="text-blue-100/80 text-sm mb-8 leading-relaxed font-playfair italic px-4">
                "El mejor regalo es tu presencia, pero si deseas tener un detalle conmigo..."
              </p>
              
              <button 
                @click="modalAbierto = true" 
                class="px-8 py-3 rounded-full border border-blue-400/50 text-blue-300 font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                Ver Datos Bancarios
              </button>
           </div>
        </div>

        <div class="space-y-8 relative">
           <div class="flex items-center justify-center gap-4 opacity-30 mb-8">
              <div class="h-[1px] w-20 bg-white"></div>
              <div class="h-2 w-2 rounded-full bg-white"></div>
              <div class="h-[1px] w-20 bg-white"></div>
           </div>

           <div class="space-y-2">
              <h3 class="font-cinzel text-3xl md:text-4xl text-white">Confirmación</h3>
              <p class="text-slate-400 font-playfair italic">
                Favor de confirmar asistencia antes del 
                <span class="text-blue-300 not-italic font-bold">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long' }) }}</span>
              </p>
           </div>
           
           <div class="transform hover:scale-105 transition-transform duration-300">
             <BotonAccion 
               texto="Confirmar por WhatsApp" 
               :icono="PhWhatsappLogo" 
               :url="`https://wa.me/${datos.contacto.whatsapp}`" 
               color="bg-white text-blue-900 border-2 border-white hover:bg-blue-50 font-bold w-full justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full py-4 text-sm tracking-widest uppercase" 
             />
           </div>
        </div>

      </div>
    </section>

    <footer class="bg-[#020617] text-slate-600 py-10 text-center text-[10px] uppercase tracking-[0.2em] pb-32">
      <p class="mb-2">XV Años • {{ nombreMostrado }}</p>
      <p>Diseño por <span class="text-blue-400 font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-white/80 border-blue-200 text-blue-500 shadow-lg backdrop-blur-sm"
      colorIcono="text-blue-500"
    />
    
    <ModalRegalos15 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      claseColorPrincipal="text-blue-600 border-blue-200 bg-blue-50"
      claseOverlay="bg-slate-900/90 backdrop-blur-xl"
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
       colorHeader="bg-gradient-to-r from-blue-600 to-purple-600" 
       @close="showGenerador = false"
    />    
    <Navbar />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Playfair+Display:ital@0;1&display=swap');

.font-cinzel { font-family: 'Cinzel', serif; }
.font-great-vibes { font-family: 'Great Vibes', cursive; }
.font-playfair { font-family: 'Playfair Display', serif; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-marquee {
  animation: marquee 40s linear infinite;
  width: max-content;
  will-change: transform;
}
.hover-pause:hover { animation-play-state: paused; }
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

/* --- FONDO AURORA (Colores cambiantes) --- */
.fondo-animado-aurora {
  background: linear-gradient(
    45deg,
    #eff6ff, #bfdbfe, #e0f2fe, #dbeafe 
  );
  background-size: 400% 400%;
  animation: mover-colores 12s ease infinite;
}

@keyframes mover-colores {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- ANIMACIÓN MARIPOSAS AZULES --- */
.mariposa-azul {
  width: 40px; height: 40px; top: 110%;
  animation: vuelo-mariposa linear infinite;
}

.mariposa-azul:nth-child(1) { left: 10%; animation-duration: 15s; width: 30px; }
.mariposa-azul:nth-child(2) { left: 25%; animation-duration: 12s; width: 50px; opacity: 0.5; }
.mariposa-azul:nth-child(3) { left: 45%; animation-duration: 20s; width: 35px; }
.mariposa-azul:nth-child(4) { left: 75%; animation-duration: 14s; width: 45px; opacity: 0.4; }

@keyframes vuelo-mariposa {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  50% { transform: translateY(-50vh) rotate(15deg) translateX(20px); }
  100% { transform: translateY(-110vh) rotate(-10deg) translateX(-20px); opacity: 0; }
}

/* --- FILTROS DE ICONOS --- */
:deep(.icono-azul-grande) {
  width: 55px !important; 
  height: 55px !important;
  filter: brightness(0) saturate(100%) invert(46%) sepia(91%) saturate(1633%) hue-rotate(193deg) brightness(101%) contrast(96%) !important;
}

/* DRESS CODE BLUE */
.dress-code-blue :deep(.w-24) {
  background-color: #eff6ff !important;
  border: 1px solid #dbeafe !important;
}
</style>

<style>
body.scroll-royal::-webkit-scrollbar { width: 8px; }
body.scroll-royal::-webkit-scrollbar-track { background: #f1f5f9; } /* Color pizarra muy claro */
body.scroll-royal::-webkit-scrollbar-thumb { 
  background: linear-gradient(to bottom, #60a5fa, #3b82f6); /* Degradado azul */
  border-radius: 4px; 
  border: 2px solid #f1f5f9;
}
</style>