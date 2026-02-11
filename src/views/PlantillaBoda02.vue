<script setup>
  import { 
    PhMapPin, PhCalendarCheck, PhGift, PhStar, PhWhatsappLogo, 
    PhCrown, PhLockKey, PhMagicWand, PhMagnifyingGlassPlus, PhX, PhMusicNotes
  } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'

  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos from '../components/ModalRegalos.vue'
  import Cronograma from '../components/Cronograma.vue'
  import CodigoVestimenta from '../components/CodigoVestimenta.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'
  import Navbar from '../components/Navbar.vue' // <--- Navbar
  import DemoSwitcherBoda from '../components/DemoSwitcherBoda.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  const route = useRoute()
  const modalAbierto = ref(false)

  // --- LÓGICA DE PLANES (Gala Luxury) ---
  const planVisualizado = ref(props.datos.esDemo ? 'premium' : props.datos.plan) 

  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }

  const esGold = computed(() => ['gold', 'premium'].includes(planVisualizado.value))
  const esPremium = computed(() => planVisualizado.value === 'premium')

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    // Premium ve todas, Gold ve 8, Esencial oculta la sección
    if (esPremium.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 8)
  })

  // --- NOMBRE PERSONALIZADO (Solo Premium) ---
  const nombreInvitado = computed(() => {
    if (!esPremium.value) return null
    if (route.query.invitado) return route.query.invitado
    if (props.datos.esDemo) return 'Familia Pérez' 
    return null
  })

  // --- MODO ANFITRIÓN ---
  const showGenerador = ref(false)
  const esAdmin = computed(() => route.query.admin === 'true' || props.datos.esDemo)
  const urlActual = computed(() => typeof window !== 'undefined' ? window.location.href : '')

  // --- OTRAS UTILIDADES ---
  const fechaLimiteConfirmacion = computed(() => {
    if (!props.datos.fecha) return ''
    const fecha = new Date(props.datos.fecha)
    fecha.setMonth(fecha.getMonth() - 1)
    return fecha.toLocaleDateString('es-BO', { day: 'numeric', month: 'long' })
  })

  const fotoEnGrande = ref(null)
  const abrirFoto = (f) => { fotoEnGrande.value = f; document.body.style.overflow = 'hidden' }
  const cerrarFoto = () => { fotoEnGrande.value = null; document.body.style.overflow = '' }

  // Efecto Escritura
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)
  let intervaloEscritura = null

  const iniciarEfectoEscritura = () => {
    if (!props.datos.nombres) return
    const nombreCompleto = props.datos.nombres 
    let i = 0
    nombreMostrado.value = ""
    intervaloEscritura = setInterval(() => {
      if (i < nombreCompleto.length) {
        nombreMostrado.value += nombreCompleto.charAt(i)
        i++
      } else {
        clearInterval(intervaloEscritura)
        cursorVisible.value = false
      }
    }, 100)
  }

  onMounted(() => {
    document.title = `Boda de ${props.datos.nombres} | Invitación`
    document.body.classList.add('scroll-gala')
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-gala')
    if (intervaloEscritura) clearInterval(intervaloEscritura)
  })
</script>

<template>
  <div class="min-h-screen bg-[#0B0F19] text-slate-200 overflow-x-hidden font-sans font-light selection:bg-amber-500/30">

    <Navbar />

    <header class="relative min-h-[100dvh] w-full flex flex-col justify-center items-center text-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="datos.fotoPortada" :alt="'Portada de la invitación de ' + datos.nombre" class="w-full h-full object-cover grayscale-[20%]" alt="Portada" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/40 to-[#0B0F19]"></div>
        <div class="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      <div class="absolute inset-6 md:inset-12 border border-amber-200/10 z-10 pointer-events-none rounded-sm"></div>

      <div class="estrellas-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <img v-for="n in 15" :key="n" src="/assets/estrella.webp" class="estrella absolute" alt="estrella" />
      </div>

      <div class="absolute top-[12vh] z-30 w-full flex justify-center px-4">
         <transition name="fade" mode="out-in">
            <div v-if="esPremium && nombreInvitado" key="vip" class="animate-pulse delay-700">
               <div class="bg-amber-900/40 backdrop-blur-md border border-amber-500/30 px-8 py-2 rounded-full shadow-[0_0_20px_rgba(180,83,9,0.3)]">
                 <p class="text-amber-100 text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                   <PhCrown weight="fill" class="text-amber-400" />
                   <span>Para {{ nombreInvitado }}</span>
                 </p>
               </div>
            </div>
            
            <div v-else-if="!esPremium && esGold" key="upgrade">
               <p class="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-amber-100 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-amber-500/30 shadow-lg cursor-pointer hover:border-amber-400/50 transition-colors">
                  <PhLockKey weight="fill" class="text-amber-500" />
                  Personaliza con <span class="text-amber-400 font-black uppercase ml-1">Plan Premium</span>
               </p>
            </div>
         </transition>
      </div>

      <div class="relative z-20 space-y-8 px-4 pt-10">
        <p class="uppercase tracking-[0.5em] text-xs text-amber-100/80 animate-fade-in-up font-medium">
          Nuestra Boda
        </p>
        
        <h1 class="font-elegante text-5xl md:text-7xl lg:text-8xl text-gold drop-shadow-2xl py-2 min-h-[1.2em]">
          {{ nombreMostrado }}<span v-if="cursorVisible" class="text-amber-200 animate-pulse font-light">|</span>
        </h1>
        
        <div class="flex items-center justify-center gap-4 opacity-80">
          <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-200"></div>
          <div class="w-2 h-2 rotate-45 border border-amber-200"></div>
          <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-200"></div>
        </div>
        
        <p class="text-xl tracking-[0.3em] text-slate-300 uppercase font-medium animate-fade-in-up delay-500">
          {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>
      </div>
    </header>

    <section class="py-24 px-6 max-w-3xl mx-auto text-center relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
      <PhStar :size="24" class="text-amber-300/80 mx-auto mb-8 animate-pulse" weight="fill" />
      
      <p class="font-elegante text-2xl md:text-4xl text-amber-50/90 leading-relaxed italic font-light">
        "{{ datos.frase }}"
      </p>
    </section>

    <section class="py-16 bg-[#0F1420] border-y border-white/5 relative overflow-hidden">
       <div class="text-center mb-10">
        <p class="uppercase tracking-[0.3em] text-[10px] font-bold text-amber-400/80">El gran día se acerca</p>
       </div>
       <CuentaRegresiva :fechaObjetivo="datos.fecha" />
    </section>

    <section v-if="datos.ubicacion" class="py-24 px-4 bg-gradient-to-b from-[#0B0F19] to-[#131926]">
      <div class="max-w-4xl mx-auto bg-[#131926] rounded-sm p-10 md:p-16 shadow-2xl border border-white/5 text-center relative">
        <div class="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-500/30 m-4"></div>
        <div class="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-amber-500/30 m-4"></div>

        <h2 class="font-elegante text-4xl md:text-5xl text-gold mb-12">Ceremonia</h2>

        <div class="flex flex-col md:flex-row gap-12 mb-12 justify-center">
          <div class="flex flex-col items-center gap-4 flex-1">
             <div class="w-16 h-16 rounded-full bg-[#0B0F19] border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-900/10">
               <PhMapPin :size="32" weight="thin" class="text-amber-200" />
             </div>
             <div>
                <p class="text-xl text-amber-50 font-medium tracking-wide mb-1">{{ datos.ubicacion.nombreLugar }}</p>
                <p class="text-slate-400 text-sm tracking-wide uppercase opacity-80">{{ datos.ubicacion.direccion }}</p>
             </div>
          </div>

          <div class="flex flex-col items-center gap-4 flex-1">
             <div class="w-16 h-16 rounded-full bg-[#0B0F19] border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-900/10">
                <PhCalendarCheck :size="32" weight="thin" class="text-amber-200" />
             </div>
             <div>
                <p class="text-xl text-amber-50 font-medium tracking-wide mb-1 capitalize">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </p>
                <p class="text-slate-400 text-sm tracking-wide uppercase opacity-80">
                  Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                </p>
             </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center gap-6">
           <BotonAccion 
             texto="Ver Mapa GPS" 
             :icono="PhMapPin" 
             :url="datos.ubicacion.linkGps" 
             color="bg-transparent border border-white/10 text-slate-300 hover:text-amber-200 hover:border-amber-500/50 hover:bg-[#0B0F19] transition-all rounded-md px-8"
           />
           <BotonAccion 
             v-if="esGold"
             texto="Agendar Fecha" 
             :icono="PhCalendarCheck" 
             :url="datos.linkCalendario" 
             color="bg-transparent border border-white/10 text-slate-300 hover:text-amber-200 hover:border-amber-500/50 hover:bg-[#0B0F19] transition-all rounded-md px-8"
           />
        </div>
      </div>
    </section>

    <transition name="fade">
      <section v-if="esGold" class="py-16 bg-[#0B0F19] relative">
        <Cronograma 
          v-if="datos.agenda" 
          :eventos="datos.agenda" 
          colorTitulo="text-gold font-elegante text-3xl" 
          colorLinea="border-amber-500/20"
          colorPunto="bg-amber-500 border-none shadow-[0_0_10px_#f59e0b]" 
          colorCardBg="bg-[#161C2C] border border-white/5 hover:border-amber-500/30 hover:bg-[#1A2030]"
          colorHora="text-amber-200 font-normal font-sans tracking-widest text-sm"
          colorIcono="text-amber-400"
          colorTexto="text-slate-300 font-light"
        />

        <div class="my-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-3/4 mx-auto"></div>

        <CodigoVestimenta 
          v-if="datos.vestimenta" 
          :tipo="datos.vestimenta.tipo" 
          :nota="datos.vestimenta.nota"
          colorFondo="bg-transparent"
          colorBorde="border-none"
          colorCirculo="bg-[#161C2C] border border-amber-500/20 shadow-lg"
          colorIcono="text-amber-300"
          colorTitulo="text-amber-50 font-elegante text-3xl"
          colorResalte="text-amber-300 font-medium"
          colorNotaBg="bg-[#161C2C] border border-white/5"
          colorNotaTexto="text-slate-400 italic font-light"
        />
      </section>
    </transition>
    
    <div v-if="!esGold" class="py-16 bg-[#0B0F19] text-center border-y border-white/5">
       <div class="inline-flex items-center gap-2 bg-[#161C2C] px-6 py-3 rounded-full border border-white/5">
         <PhStar weight="fill" class="text-amber-600" /> 
         <span class="text-slate-400 text-xs uppercase tracking-widest">El Plan <strong class="text-amber-500">Gold</strong> incluye Cronograma</span>
       </div>
    </div>

    <section v-if="esGold && datos.galeria" class="py-24 bg-[#0F1420]">
        <div class="text-center mb-16">
           <h2 class="font-elegante text-5xl text-gold mb-2">Nuestra Historia</h2>
           <div class="w-16 h-px bg-amber-500/30 mx-auto"></div>
        </div>

        <div class="max-w-6xl mx-auto px-4 columns-2 md:columns-4 gap-4 space-y-4">
           <div 
             v-for="(foto, index) in fotosVisibles" 
             :key="index"
             class="relative group cursor-pointer overflow-hidden rounded-sm border border-white/5 hover:border-amber-500/50 break-inside-avoid transition-all duration-300"
             @click="abrirFoto(foto)"
           >
              <img :src="foto" :alt="'Foto ' + (index + 1) + ' de la celebración de ' + datos.nombre" class="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" loading="lazy" />
              
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-400">
                 <PhMagnifyingGlassPlus size="32" weight="thin" />
              </div>
           </div>
        </div>

        <div v-if="!esPremium && datos.galeria.length > 8" class="text-center mt-12">
           <p class="text-slate-400 text-xs italic border border-white/10 inline-block px-8 py-3 rounded-full bg-[#131926] flex items-center justify-center gap-2 shadow-lg hover:border-amber-500/30 transition-colors cursor-pointer">
             <PhLockKey weight="fill" class="text-amber-600"/>
             <span>+ {{ datos.galeria.length - 8 }} fotos más en <strong class="text-amber-400">Plan Premium</strong></span>
           </p>
        </div>
    </section>

    <Transition name="fade">
        <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" @click="cerrarFoto">
          <button class="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition hover:text-amber-400" @click.stop="cerrarFoto">
            <PhX size="32" />
          </button>
          <img :src="fotoEnGrande" class="max-w-full max-h-[90vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10" @click.stop />
        </div>
    </Transition>
    
    <SeccionPadrinos 
      v-if="datos.cortejo" 
      :padrinos="datos.cortejo"
      colorIcono="text-amber-200"
      colorTitulo="text-amber-50 font-elegante"
      colorTexto="text-slate-400 font-light"
    />

    <section class="py-24 text-center bg-gradient-to-t from-[#0B0F19] to-[#0F1420] border-t border-white/5">
      <div class="w-20 h-20 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 bg-[#131926] shadow-2xl shadow-amber-900/10">
        <PhGift :size="40" weight="thin" class="text-amber-200" />
      </div>
      
      <h3 class="font-elegante text-4xl text-amber-50 mb-4">Mesa de Regalos</h3>
      
      <p class="text-slate-400 text-sm mb-8 max-w-sm mx-auto font-light leading-relaxed px-4">
        Su presencia es nuestro mayor regalo. <br> Si desean tener un detalle con nosotros:
      </p>
      
      <button @click="modalAbierto = true" class="px-8 py-3 border border-amber-500/30 text-amber-200 rounded-sm text-xs uppercase tracking-[0.2em] hover:bg-amber-500/10 transition mb-16 font-bold hover:border-amber-500/60">
        Ver Opciones
      </button>

      <div class="max-w-xs mx-auto w-full mt-8 border-t border-white/5 pt-12">
         <div class="text-slate-500 text-[10px] uppercase tracking-widest mb-4">
           Confirmar antes del <span class="text-amber-500">{{ fechaLimiteConfirmacion }}</span>
         </div>
         <BotonAccion 
           texto="Confirmar Asistencia" 
           :icono="PhWhatsappLogo" 
           :url="`https://wa.me/${datos.contacto.whatsapp}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${datos.nombres}`" 
           color="bg-transparent border border-amber-500/30 text-amber-100 hover:bg-amber-500/20 hover:text-white transition-colors rounded-sm w-full py-4 shadow-lg shadow-amber-900/20"
         />
      </div>
    </section>

    <footer class="text-center text-slate-600 text-[10px] uppercase tracking-widest py-12 border-t border-white/5 font-medium bg-[#080b12]">
      <p class="mb-1">Enlace Nupcial {{ props.datos.nombres }}</p>
      <p>Diseño exclusivo <span class="text-amber-600/50">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica
      v-if="datos.musica"
      :songUrl="datos.musica"
      colorBoton="bg-amber-500 hover:bg-amber-400 border-amber-300 shadow-2xl shadow-amber-500/40"
      colorIcono="text-[#0B0F19]"
    />
    
    <ModalRegalos 
      v-if="datos.regalos"
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      colorAcento="text-amber-400" 
      colorBoton="bg-[#131926] border border-amber-500/30 text-amber-100"
    />

    <DemoSwitcherBoda 
      v-if="datos.esDemo" 
      @cambioPlan="actualizarPlan" 
    />

    <div v-if="esAdmin && esPremium" class="fixed bottom-24 left-4 z-[90]">
       <button 
         @click="showGenerador = true"
         class="bg-[#1c1917] text-amber-100 px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-amber-900/50 hover:scale-105 transition-transform group"
       >
         <div class="bg-amber-900/50 rounded-full p-1 group-hover:animate-spin-slow text-amber-400">
            <PhMagicWand weight="fill" />
         </div>
         <div class="text-left leading-none pr-2">
            <p class="text-[9px] text-amber-500/80 font-bold uppercase tracking-wider">Modo Anfitrión</p>
            <p class="text-sm font-bold">Crear Invitación</p>
         </div>
       </button>
    </div>

    <ModalGeneradorLinks 
        :isOpen="showGenerador"
        :urlBase="urlActual"
        :nombreFestejado="datos.nombres"
        tipoEvento="boda" 
        colorHeader="bg-gradient-to-r from-[#bf953f] via-[#b38728] to-[#aa771c]" 
        @close="showGenerador = false"
    />

  </div>
</template>

<style scoped>
/* FADE TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease, max-height 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* EFECTO ORO REALISTA */
.text-gold {
  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: shine 5s linear infinite;
}

@keyframes shine {
  to { background-position: 200% center; }
}

/* ANIMACIÓN ESTRELLAS */
.estrella {
  position: absolute;
  top: -10%;
  opacity: 0;
  animation: caerEstrella linear infinite;
  width: 15px;
}
@keyframes caerEstrella {
  0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
  20% { opacity: 1; transform: scale(1); }
  80% { opacity: 0.8; }
  100% { transform: translateY(95vh) rotate(180deg) scale(0.5); opacity: 0; }
}
/* Posiciones Random Estrellas */
.estrella:nth-child(1) { left: 10%; animation-duration: 8s; animation-delay: 0s; width: 12px; }
.estrella:nth-child(2) { left: 25%; animation-duration: 12s; animation-delay: 2s; width: 18px; filter: drop-shadow(0 0 5px gold); }
.estrella:nth-child(3) { left: 50%; animation-duration: 10s; animation-delay: 4s; width: 10px; }
.estrella:nth-child(4) { left: 75%; animation-duration: 15s; animation-delay: 1s; width: 14px; }
.estrella:nth-child(5) { left: 90%; animation-duration: 9s; animation-delay: 3s; width: 16px; opacity: 0.5; }
.estrella:nth-child(6) { left: 5%;  animation-duration: 11s; animation-delay: 5s; width: 11px; }
.estrella:nth-child(7) { left: 35%; animation-duration: 13s; animation-delay: 0.5s; width: 15px; filter: drop-shadow(0 0 3px gold); }
.estrella:nth-child(8) { left: 60%; animation-duration: 14s; animation-delay: 6s; width: 9px; }
.estrella:nth-child(9) { left: 80%; animation-duration: 16s; animation-delay: 2.5s; width: 13px; }
.estrella:nth-child(10) { left: 20%; animation-duration: 9.5s; animation-delay: 4.5s; width: 17px; }
.estrella:nth-child(11) { left: 45%; animation-duration: 12.5s; animation-delay: 1.5s; width: 12px; }
.estrella:nth-child(12) { left: 70%; animation-duration: 10.5s; animation-delay: 7s; width: 14px; }
.estrella:nth-child(13) { left: 95%; animation-duration: 8.5s; animation-delay: 0.2s; width: 10px; }
.estrella:nth-child(14) { left: 30%; animation-duration: 11.5s; animation-delay: 3.5s; width: 15px; }
.estrella:nth-child(15) { left: 55%; animation-duration: 14.5s; animation-delay: 5.5s; width: 12px; }
</style>

<style>
/* Scroll Negro y Dorado */
body.scroll-gala::-webkit-scrollbar { width: 12px; }
body.scroll-gala::-webkit-scrollbar-track { background: #0B0F19; }
body.scroll-gala::-webkit-scrollbar-thumb { 
  background-color: #b38728; 
  border-radius: 20px; 
  border: 3px solid #0B0F19; 
}
body.scroll-gala::-webkit-scrollbar-thumb:hover {
  background-color: #fcf6ba; 
}
</style>