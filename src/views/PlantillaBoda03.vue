<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, PhLeaf, 
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
  import GaleriaFotos from '../components/GaleriaFotos.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'
  import Navbar from '../components/Navbar.vue' // <--- Navbar
  import DemoSwitcherBoda from '../components/DemoSwitcherBoda.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'

  const props = defineProps({ datos: { type: Object, required: true } })

  const route = useRoute()
  const modalAbierto = ref(false)

  // --- LÓGICA DE PLANES ---
  const planVisualizado = ref(props.datos.esDemo ? 'premium' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }

  const esGold = computed(() => ['gold', 'premium'].includes(planVisualizado.value))
  const esPremium = computed(() => planVisualizado.value === 'premium')

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    if (esPremium.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 8)
  })

  // --- NOMBRE PERSONALIZADO (Premium) ---
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
  let observer = null

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombres || "Novios"
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
    document.body.classList.add('scroll-boho')
    document.title = `Boda de ${props.datos.nombres} | Invitación`
    iniciarEfectoEscritura()
    
    // Observer para animaciones scroll
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target) 
        }
      });
    }, { threshold: 0.5 });
    
    setTimeout(() => {
      const iconos = document.querySelectorAll('.icon-draw')
      iconos.forEach(icono => { observer.observe(icono) })
    }, 100)
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-boho')
    if (intervaloEscritura) clearInterval(intervaloEscritura)
    if (observer) observer.disconnect()
  })
</script>

<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#4A5D4F] overflow-x-hidden font-sans">

    <header class="relative min-h-screen flex flex-col justify-end pb-20 px-6 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-[70vh] bg-stone-200 rounded-b-[50%] overflow-hidden z-0 shadow-xl">
         <img :src="datos.fotoPortada" class="w-full h-full object-cover" />
         <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <div class="hojas-container absolute top-0 left-0 w-full h-[80vh] z-5 pointer-events-none overflow-hidden rounded-b-[50%]">
        <img v-for="n in 12" :key="n" src="/assets/hoja-verde.png" class="hoja absolute" alt="hoja cayendo" />
      </div>

      <div class="absolute top-8 w-full left-0 z-30 flex justify-center pointer-events-none">
        <transition name="fade" mode="out-in" type="transition">
          
          <div v-if="esPremium && nombreInvitado" key="vip" class="pointer-events-auto">
             <div class="animate-pulse delay-700">
                <div class="bg-[#4A5D4F]/90 backdrop-blur-md border border-white/20 px-8 py-2 rounded-full shadow-lg">
                  <p class="text-[#FDFBF7] text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                    <PhCrown weight="fill" class="text-[#D4AF37]" />
                    <span>Para {{ nombreInvitado }}</span>
                  </p>
                </div>
             </div>
          </div>
          
          <div v-else-if="!esPremium && esGold" key="upgrade" class="pointer-events-auto">
             <p class="inline-flex items-center gap-2 text-[10px] font-bold text-[#4A5D4F] bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#4A5D4F]/20 shadow-md cursor-pointer hover:scale-105 transition-transform">
                <PhLockKey weight="fill" class="text-[#8A9A5B]" />
                Personaliza con <span class="text-[#2C3E30] font-black uppercase ml-1">Plan Premium</span>
             </p>
          </div>
        
        </transition>
      </div>

      <div class="relative z-10 text-center bg-white/80 backdrop-blur-md p-8 rounded-t-[3rem] -mt-20 shadow-lg max-w-lg mx-auto border border-[#4A5D4F]/10">
           <p class="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#8A9A5B]">Save the Date</p>
           <h1 class="font-elegante text-6xl text-[#2C3E30] mb-2">{{ nombreMostrado }}<span v-if="cursorVisible">|</span></h1>
           <p class="text-lg text-[#4A5D4F]">
             {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
           </p>
        </div>
    </header>

    <section class="py-16 px-8 text-center max-w-xl mx-auto">
       <PhLeaf :size="24" class="mx-auto text-[#8A9A5B] mb-4" weight="duotone" />
       <p class="font-serif text-xl italic leading-loose">
         "{{ datos.frase }}"
       </p>
    </section>

    <section class="py-12 bg-[#E8ECE9] border-y border-[#4A5D4F]/10">
       <div class="text-center mb-8">
         <span class="text-xs uppercase tracking-[0.2em] font-bold text-[#4A5D4F]">Faltan pocos días</span>
       </div>
       <CuentaRegresiva 
          :fechaObjetivo="datos.fecha" 
          colorCaja="bg-white border border-[#8A9A5B]/30 shadow-sm"
          colorNumero="text-[#2C3E30]"
          colorEtiqueta="text-[#8A9A5B]"
          colorSegundos="text-[#4A5D4F]" 
       />
    </section>

    <section class="py-20 px-6">
       <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
         
         <div class="h-80 w-full rounded-t-full border-8 border-white shadow-lg overflow-hidden">
            <img :src="datos.fotoSegunda" class="w-full h-full object-cover" />
         </div>

         <div class="text-center md:text-left space-y-8">
            
            <h2 class="font-elegante text-4xl text-[#2C3E30]">Ceremonia Religiosa</h2>
             <p class="text-stone-600 mb-2">
               Acompáñanos a celebrar nuestro enlace matrimonial, que se llevará a cabo en:
             </p>
            
            <div class="flex flex-col md:flex-row items-center md:items-start gap-3">
               <PhMapPin :size="32" weight="thin" class="text-[#8A9A5B] shrink-0" />
               <div>
                  <strong class="block text-lg text-[#2C3E30] leading-tight">
                    {{ datos.ubicacion.nombreLugar }}
                  </strong>
                  <span class="text-sm text-[#4A5D4F] opacity-80">
                    {{ datos.ubicacion.direccion }}
                  </span>
               </div>
            </div>

            <div class="flex flex-col md:flex-row items-center md:items-start gap-3">
               <PhCalendarCheck :size="32" weight="thin" class="text-[#8A9A5B] shrink-0" />
               <div>
                  <strong class="block text-lg text-[#2C3E30] leading-tight capitalize">
                    {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                  </strong>
                  <span class="text-sm text-[#4A5D4F] opacity-80">
                    Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                  </span>
               </div>
            </div>
            
            <div class="flex flex-col gap-3 pt-2">
               <BotonAccion texto="Ver Ubicación GPS" :icono="PhMapPin" :url="datos.ubicacion.linkGps" color="bg-[#4A5D4F] text-white hover:bg-[#2C3E30]" />
               
               <BotonAccion 
                 v-if="esGold"
                 texto="Agendar Fecha" 
                 :icono="PhCalendarCheck" 
                 :url="datos.linkCalendario" 
                 color="bg-[#8A9A5B] text-white hover:bg-[#6e7d48]" 
               />
            </div>

         </div>
      </div>
    </section>

    <transition name="fade">
      <section v-if="esGold" class="bg-white py-16 rounded-[3rem] mx-4 shadow-sm border border-[#E8ECE9] my-10">
         <div class="max-w-3xl mx-auto">
           <Cronograma 
              v-if="datos.agenda" 
              :eventos="datos.agenda" 
              colorTitulo="text-[#2C3E30]"
              colorLinea="border-[#8A9A5B]/40"
              colorPunto="bg-[#8A9A5B] border-[#FDFBF7]"
              colorCardBg="bg-[#FDFBF7] border-[#8A9A5B]/10 hover:border-[#8A9A5B]/30"
              colorHora="text-[#8A9A5B] font-bold"
              colorIcono="text-[#4A5D4F]"
              colorTexto="text-[#4A5D4F]"
            />

            <div class="my-16 flex items-center justify-center opacity-50">
               <div class="h-px w-24 bg-[#8A9A5B]"></div>
               <PhLeaf class="mx-4 text-[#8A9A5B]" />
               <div class="h-px w-24 bg-[#8A9A5B]"></div>
            </div>
            
            <CodigoVestimenta 
              v-if="datos.vestimenta" 
              :tipo="datos.vestimenta.tipo" 
              :nota="datos.vestimenta.nota"
              colorFondo="bg-transparent"
              colorBorde="border-none"
              colorCirculo="bg-[#E8ECE9] text-[#2C3E30]"
              colorIcono="text-[#4A5D4F]"
              colorTitulo="text-[#2C3E30]"
              colorResalte="text-[#8A9A5B]"
              colorNotaBg="bg-[#FDFBF7] border border-[#8A9A5B]/20"
              colorNotaTexto="text-[#4A5D4F] italic"
            />
         </div>
      </section>
    </transition>
    
    <div v-if="!esGold" class="py-16 bg-[#FDFBF7] text-center border-y border-[#4A5D4F]/10">
       <div class="inline-flex items-center gap-2 bg-[#E8ECE9] px-6 py-3 rounded-full text-[#4A5D4F]">
         <PhLeaf weight="fill" class="text-[#8A9A5B]" /> 
         <span class="text-xs uppercase tracking-widest font-bold">El Plan Gold incluye Agenda y Detalles</span>
       </div>
    </div>

    <transition name="fade">
      <div v-if="esGold">
        <GaleriaFotos 
          v-if="datos.galeria" 
          :fotos="fotosVisibles" 
          colorFondo="bg-[#FDFBF7]" 
          colorIcono="text-[#8A9A5B]"
          colorTitulo="text-[#2C3E30]"
          @cambioEstado="galeriaAbierta = $event"
        />
      </div>
    </transition>

    <SeccionPadrinos 
      v-if="datos.cortejo" 
      :padrinos="datos.cortejo"
      colorIcono="text-[#8A9A5B]"
      colorTitulo="text-[#2C3E30]"
      colorTexto="text-[#4A5D4F]"
    />
      
    <section class="py-20 text-center">
       <PhGift :size="48" weight="thin" class="text-[#8A9A5B] mx-auto mb-4 icon-draw" />
       <h3 class="font-elegante text-3xl mb-2">Detalles</h3>
       <p class="text-sm opacity-60 mb-8 max-w-xs mx-auto">Tu presencia es lo más importante.</p>
       <button @click="modalAbierto = true" class="px-8 py-3 border border-[#4A5D4F] rounded-full hover:bg-[#4A5D4F] hover:text-white transition uppercase text-xs tracking-widest">
         Ver Datos Bancarios
       </button>
    </section>

    <footer class="bg-[#2C3E30] text-[#E8ECE9] py-16 text-center rounded-t-[3rem] pb-32 relative -mt-6">
       <h2 class="font-elegante text-5xl mb-8">¡Los Esperamos!</h2>
       
       <div class="max-w-xs mx-auto w-full px-4 mb-12">
           <div class="text-[#8A9A5B] text-[10px] uppercase tracking-widest mb-3 opacity-80 font-bold">
             Confirmar antes del {{ fechaLimiteConfirmacion }}
           </div>
           <BotonAccion 
             texto="Confirmar Asistencia" 
             :icono="PhWhatsappLogo" 
             :url="`https://wa.me/${datos.contacto.whatsapp}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${datos.nombres}`" 
             color="bg-[#FDFBF7] text-[#2C3E30] hover:bg-[#8A9A5B] hover:text-white shadow-lg py-4 w-full"
           />
       </div>

       <p class="text-[10px] mt-12 opacity-40 uppercase tracking-widest">Diseñado con 🍃 por Yupa Studio</p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-[#FDFBF7] border-[#8A9A5B]/50"
      colorIcono="text-[#8A9A5B]"
    />
    
    <ModalRegalos 
      v-if="datos.regalos"
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      colorAcento="text-[#4A5D4F]" 
      colorBoton="bg-[#4A5D4F]"
    />
    
    <DemoSwitcherBoda v-if="datos.esDemo" @cambioPlan="actualizarPlan" />

    <div v-if="esAdmin && esPremium" class="fixed bottom-24 left-4 z-[90]">
       <button 
         @click="showGenerador = true"
         class="bg-[#2C3E30] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#8A9A5B] hover:scale-105 transition-transform group"
       >
         <div class="bg-[#4A5D4F] rounded-full p-1 group-hover:animate-spin-slow text-[#8A9A5B]">
            <PhMagicWand weight="fill" />
         </div>
         <div class="text-left leading-none pr-2">
            <p class="text-[9px] text-[#E8ECE9] font-bold uppercase tracking-wider">Modo Anfitrión</p>
            <p class="text-sm font-bold">Crear Invitación</p>
         </div>
       </button>
    </div>

    <ModalGeneradorLinks 
        :isOpen="showGenerador"
        :urlBase="urlActual"
        :nombreFestejado="datos.nombres"
        tipoEvento="boda" 
        colorHeader="bg-gradient-to-r from-[#8A9A5B] to-[#4A5D4F]" 
        @close="showGenerador = false"
    />

    <Navbar />
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

.icon-draw path, .icon-draw line { stroke-dasharray: 1000; stroke-dashoffset: 1000; opacity: 0; transition: opacity 0.5s; }
.icon-draw.visible path, .icon-draw.visible line { opacity: 1; animation: dibujar 2s ease-out forwards; }
@keyframes dibujar { to { stroke-dashoffset: 0; } }
</style>

<style>
/* Scroll Boho */
body.scroll-boho::-webkit-scrollbar { width: 12px; }
body.scroll-boho::-webkit-scrollbar-track { background: #FDFBF7; }
body.scroll-boho::-webkit-scrollbar-thumb { background-color: #8A9A5B; border-radius: 20px; border: 3px solid #FDFBF7; }

/* HOJAS CAYENDO (Igual que original) */
.hoja {
  position: absolute;
  top: -15%; 
  opacity: 0;
  animation: caerHoja linear infinite;
}
@keyframes caerHoja {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.9; } 
  90% { opacity: 0.7; }
  100% { transform: translateY(90vh) rotate(360deg) translateX(40px); opacity: 0; } 
}
.hoja:nth-child(1) { left: 5%; animation-duration: 9s; animation-delay: 0s; width: 25px; }
.hoja:nth-child(2) { left: 15%; animation-duration: 13s; animation-delay: 2s; width: 32px; filter: blur(1px); }
.hoja:nth-child(3) { left: 25%; animation-duration: 10s; animation-delay: 4s; width: 28px; }
.hoja:nth-child(4) { left: 35%; animation-duration: 15s; animation-delay: 1s; width: 20px; filter: blur(0.5px);}
.hoja:nth-child(5) { left: 45%; animation-duration: 11s; animation-delay: 3s; width: 35px; opacity: 0.7; }
.hoja:nth-child(6) { left: 55%; animation-duration: 12s; animation-delay: 5s; width: 24px; }
.hoja:nth-child(7) { left: 65%; animation-duration: 14s; animation-delay: 0.5s; width: 30px; filter: blur(1.5px); }
.hoja:nth-child(8) { left: 75%; animation-duration: 8s; animation-delay: 1.5s; width: 22px; }
.hoja:nth-child(9) { left: 85%; animation-duration: 16s; animation-delay: 6s; width: 26px; opacity: 0.8; }
.hoja:nth-child(10) { left: 92%; animation-duration: 10.5s; animation-delay: 2.5s; width: 18px; }
.hoja:nth-child(11) { left: 10%; animation-duration: 12s; animation-delay: 7s; width: 29px; filter: blur(1px);}
.hoja:nth-child(12) { left: 60%; animation-duration: 13.5s; animation-delay: 3.5s; width: 31px; }
</style>