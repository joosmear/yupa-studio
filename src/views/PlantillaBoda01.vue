<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, PhHeart, PhStar, PhCrown,
    PhLockKey, PhMagicWand, PhMagnifyingGlassPlus, PhX, PhMusicNotes
  } from '@phosphor-icons/vue'
  
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'

  // Componentes
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos from '../components/ModalRegalos.vue'
  import Cronograma from '../components/Cronograma.vue'
  import CodigoVestimenta from '../components/CodigoVestimenta.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'
  import Navbar from '../components/Navbar.vue' // <--- Navbar agregado
  
  // Componentes Nuevos
  import DemoSwitcherBoda from '../components/DemoSwitcherBoda.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  const route = useRoute()
  const modalAbierto = ref(false)

  // --- LÓGICA DE PLANES (BODA) ---
  // Planes: 'esencial', 'gold', 'premium'
  const planVisualizado = ref(props.datos.esDemo ? 'premium' : props.datos.plan) 

  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }

  // Variables computadas de permisos
  const esGold = computed(() => ['gold', 'premium'].includes(planVisualizado.value))
  const esPremium = computed(() => planVisualizado.value === 'premium')

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    // Premium ve todo, Gold ve 6, Esencial no ve nada (seccion oculta)
    if (esPremium.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 6)
  })

  // --- NOMBRE PERSONALIZADO (Solo Premium) ---
  const nombreInvitado = computed(() => {
    if (!esPremium.value) return null
    if (route.query.invitado) return route.query.invitado
    if (props.datos.esDemo) return 'Familia Pérez' 
    return null
  })

  // --- LÓGICA MODO ANFITRIÓN ---
  const showGenerador = ref(false)
  const esAdmin = computed(() => route.query.admin === 'true' || props.datos.esDemo)
  const urlActual = computed(() => typeof window !== 'undefined' ? window.location.href : '')

  // --- OTRAS LÓGICAS ---
  const fotoEnGrande = ref(null)
  const abrirFoto = (f) => { fotoEnGrande.value = f; document.body.style.overflow = 'hidden' }
  const cerrarFoto = () => { fotoEnGrande.value = null; document.body.style.overflow = '' }

  const fechaLimiteConfirmacion = computed(() => {
    if (!props.datos.fecha) return ''
    const fecha = new Date(props.datos.fecha)
    fecha.setMonth(fecha.getMonth() - 1)
    return fecha.toLocaleDateString('es-BO', { day: 'numeric', month: 'long' })
  })

  // Efecto Escritura
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)
  let intervaloEscritura = null

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombres || "Novio & Novia"
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
    document.body.classList.add('scroll-clasico') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-clasico')
    if (intervaloEscritura) clearInterval(intervaloEscritura)
  })
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 overflow-x-hidden font-serif selection:bg-rose-200 selection:text-rose-900">
    
    <Navbar />

    <header class="relative min-h-[100dvh] w-full flex flex-col justify-center items-center text-center overflow-hidden">
      
      <div class="absolute inset-0 z-0">
        <img :src="datos.fotoPortada" class="w-full h-full object-cover grayscale-[30%] brightness-[0.85]" />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <div class="petalos-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <img v-for="n in 12" :key="n" src="/assets/petalo.webp" class="petalo absolute opacity-80" alt="pétalo"/>
      </div>

      <div class="absolute top-[12vh] z-30 w-full flex justify-center px-4">
         <transition name="fade" mode="out-in">
            <div v-if="esPremium && nombreInvitado" key="vip" class="animate-fade-in-up">
               <div class="bg-white/20 backdrop-blur-md border border-white/40 px-8 py-2 rounded-full shadow-lg">
                 <p class="text-white text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                   <PhCrown weight="fill" class="text-yellow-200" /> 
                   <span>Para {{ nombreInvitado }}</span>
                 </p>
               </div>
            </div>
            
            <div v-else-if="!esPremium && esGold" key="upgrade">
               <p class="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 shadow-sm cursor-pointer hover:bg-black/60 transition-colors">
                  <PhLockKey weight="fill" class="text-rose-300" />
                  Personaliza con <span class="text-rose-200 font-black uppercase ml-1">Plan Premium</span>
               </p>
            </div>
         </transition>
      </div>

      <div class="relative z-20 text-white space-y-6 px-4 pt-10">
        <p class="uppercase tracking-[0.5em] text-xs md:text-sm opacity-90 animate-fade-in-up font-sans">
          Nos casamos
        </p>
        
        <h1 class="font-elegante text-5xl md:text-7xl lg:text-8xl drop-shadow-lg leading-tight py-2">
          {{ nombreMostrado }}<span v-if="cursorVisible" class="font-light animate-pulse">|</span>
        </h1>
        
        <div class="animate-fade-in-up delay-500">
          <p class="text-lg md:text-xl font-light tracking-widest border-t border-b border-white/30 py-3 inline-block px-10 backdrop-blur-[2px] font-sans">
            {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-10 z-20 animate-bounce opacity-70">
        <div class="flex flex-col items-center gap-2">
           <span class="text-[10px] text-white uppercase tracking-[0.2em]">Desliza</span>
           <div class="w-[1px] h-12 bg-white/50 mx-auto"></div>
        </div>
      </div>
    </header>

    <section class="py-20 px-6 max-w-3xl mx-auto text-center space-y-10">
      <div class="w-16 h-px bg-stone-300 mx-auto"></div>
      <p class="font-elegante text-2xl md:text-3xl italic text-stone-600 leading-relaxed font-light">
        "{{ datos.frase }}"
      </p>
      <div class="w-16 h-px bg-stone-300 mx-auto"></div>
      
      <div class="py-4">
        <p class="uppercase tracking-widest text-xs font-bold mb-8 text-stone-400 font-sans">Cuenta Regresiva</p>
        <CuentaRegresiva :fechaObjetivo="datos.fecha" />
      </div>
    </section>

    <section v-if="datos.ubicacion" class="py-20 bg-white shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
      <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <div v-if="datos.fotoSegunda" class="relative group">
           <div class="absolute -inset-2 bg-rose-100 rounded-t-full rounded-b-2xl transform rotate-2 transition-transform group-hover:rotate-0"></div>
           <div class="relative rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-xl h-[500px]">
             <img :src="datos.fotoSegunda" class="w-full h-full object-cover" alt="Pareja">
           </div>
        </div>

        <div class="space-y-8 text-center md:text-left">
          <div>
             <h2 class="font-elegante text-4xl md:text-5xl text-rose-600 mb-4">Ceremonia</h2>
             <p class="text-stone-500 leading-relaxed">
               Tenemos el honor de invitarte a nuestra unión sagrada.
             </p>
          </div>
          
          <div class="space-y-6">
             <div class="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                   <PhMapPin :size="24" />
                </div>
                <div>
                   <strong class="block text-xl text-stone-800 font-serif">{{ datos.ubicacion.nombreLugar }}</strong>
                   <span class="text-sm text-stone-500 block mt-1">{{ datos.ubicacion.direccion }}</span>
                </div>
             </div>

             <div class="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                   <PhCalendarCheck :size="24" />
                </div>
                <div>
                   <strong class="block text-xl text-stone-800 font-serif capitalize">
                     {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                   </strong>
                   <span class="text-sm text-stone-500 block mt-1">
                     Recepción: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                   </span>
                </div>
             </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <BotonAccion 
              texto="Ver Mapa" 
              :icono="PhMapPin" 
              :url="datos.ubicacion.linkGps" 
              color="bg-stone-800 text-white hover:bg-stone-900 border-none shadow-lg px-8"
            />
            <BotonAccion 
              v-if="esGold"
              texto="Agendar" 
              :icono="PhCalendarCheck" 
              :url="datos.linkCalendario" 
              color="bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 shadow-md px-8"
            />
          </div>
        </div>
      </div>
    </section>

    <transition name="fade">
      <section v-if="esGold" class="bg-stone-50 py-20 border-t border-stone-200">
        <div class="max-w-4xl mx-auto px-4">
           <Cronograma v-if="datos.agenda" :eventos="datos.agenda" />
           <div class="my-16 h-px bg-stone-200 w-1/2 mx-auto"></div>
           <CodigoVestimenta v-if="datos.vestimenta" :tipo="datos.vestimenta.tipo" :nota="datos.vestimenta.nota" />
        </div>
      </section>
    </transition>
    
    <div v-if="!esGold" class="py-16 bg-white text-center border-t border-stone-100">
       <div class="inline-flex items-center gap-2 bg-stone-100 px-6 py-3 rounded-full text-stone-500 text-sm">
         <PhStar weight="fill" class="text-amber-400" /> 
         <span>El Plan <strong class="text-stone-700">Gold</strong> incluye Cronograma y Dress Code</span>
       </div>
    </div>

    <section v-if="esGold && datos.galeria" class="py-20 bg-white">
       <div class="text-center mb-12">
          <h2 class="font-elegante text-4xl md:text-5xl text-stone-800 mb-2">Nuestra Historia</h2>
          <p class="text-stone-400 uppercase tracking-widest text-xs">Momentos Inolvidables</p>
       </div>

       <div class="max-w-6xl mx-auto px-4 columns-2 md:columns-4 gap-4 space-y-4">
          <div 
            v-for="(foto, index) in fotosVisibles" 
            :key="index"
            class="relative group cursor-pointer overflow-hidden rounded-lg break-inside-avoid"
            @click="abrirFoto(foto)"
          >
             <img :src="foto" class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
             <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <PhMagnifyingGlassPlus size="32" />
             </div>
          </div>
       </div>

       <div v-if="!esPremium && datos.galeria.length > 6" class="text-center mt-12">
          <p class="text-stone-500 text-xs italic border border-stone-200 inline-block px-8 py-3 rounded-full bg-stone-50 flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <PhLockKey weight="fill" class="text-stone-400"/>
            <span>+ {{ datos.galeria.length - 6 }} fotos más en <strong class="text-stone-700">Plan Premium</strong></span>
          </p>
       </div>
    </section>

    <Transition name="fade">
        <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" @click="cerrarFoto">
          <button class="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition" @click.stop="cerrarFoto">
            <PhX size="32" />
          </button>
          <img :src="fotoEnGrande" class="max-w-full max-h-[90vh] object-contain rounded shadow-2xl" @click.stop />
        </div>
    </Transition>

    <SeccionPadrinos 
      v-if="datos.cortejo" 
      :padrinos="datos.cortejo" 
    />

    <section class="py-24 px-4 bg-stone-100">
      <div class="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative border border-stone-200">
        <div class="h-1.5 w-full bg-gradient-to-r from-rose-400 to-rose-600"></div>

        <div class="p-10 space-y-10">
          
          <div class="text-center space-y-4">
             <div class="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-2">
               <PhGift :size="32" />
             </div>
             <h3 class="font-elegante text-3xl text-stone-800">Mesa de Regalos</h3>
             <p class="text-stone-500 text-sm leading-relaxed px-4">
               Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros:
             </p>
             <button
               @click="modalAbierto = true"
               class="px-8 py-3 border border-rose-300 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-rose-50 transition-colors"
             >
               Ver Opciones
             </button>
          </div>

          <div class="border-t border-stone-100"></div>

          <div class="text-center space-y-4">
             <h3 class="font-elegante text-3xl text-stone-800">Confirmación</h3>
             <p class="text-stone-500 text-sm">
               Esperamos contar contigo. <br> Confirma antes del:
               <span class="font-bold text-rose-600 block mt-1 text-base">{{ fechaLimiteConfirmacion }}</span>
             </p>
             
             <div class="pt-2 w-full">
               <BotonAccion 
                 texto="Confirmar por WhatsApp" 
                 :icono="PhWhatsappLogo" 
                 :url="`https://wa.me/${datos.contacto.whatsapp}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${datos.nombres}`" 
                 color="bg-rose-600 text-white hover:bg-rose-700 w-full shadow-lg shadow-rose-200 py-4"
               />
             </div>
          </div>

        </div>
      </div>
    </section>

    <footer class="bg-stone-900 text-stone-400 py-12 text-center text-xs">
      <p class="mb-2 tracking-widest uppercase">Enlace {{ props.datos.nombres }}</p>
      <p>Diseño exclusivo por <span class="text-white font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica v-if="datos.musica" :songUrl="datos.musica" colorBoton="bg-white text-stone-800 border-stone-200" />

    <ModalRegalos 
      v-if="datos.regalos"
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
    />
    
    <DemoSwitcherBoda 
      v-if="datos.esDemo" 
      @cambioPlan="actualizarPlan" 
    />

    <div v-if="esAdmin && esPremium" class="fixed bottom-24 left-4 z-[90]">
       <button 
         @click="showGenerador = true"
         class="bg-stone-800 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-stone-600 hover:scale-105 transition-transform group"
       >
         <div class="bg-stone-600 rounded-full p-1 group-hover:animate-spin-slow">
            <PhMagicWand weight="fill" />
         </div>
         <div class="text-left leading-none pr-2">
            <p class="text-[9px] text-stone-300 font-bold uppercase tracking-wider">Modo Anfitrión</p>
            <p class="text-sm font-bold">Crear Invitación</p>
         </div>
       </button>
    </div>

    <ModalGeneradorLinks 
        :isOpen="showGenerador"
        :urlBase="urlActual"
        :nombreFestejado="datos.nombres"
        tipoEvento="boda" 
        colorHeader="bg-gradient-to-r from-stone-400 to-stone-600" 
        @close="showGenerador = false"
    />

  </div>
</template>

<style scoped>
.font-elegante { font-family: 'Great Vibes', cursive; }

.petalo {
  top: -10%;
  animation: caer linear infinite;
}
.petalo:nth-child(1) { left: 10%; animation-duration: 15s; width: 20px; }
.petalo:nth-child(2) { left: 30%; animation-duration: 22s; width: 15px; animation-delay: 2s; }
.petalo:nth-child(3) { left: 70%; animation-duration: 18s; width: 25px; animation-delay: 5s; }
.petalo:nth-child(4) { left: 50%; animation-duration: 25s; width: 18px; animation-delay: 1s; }

@keyframes caer {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>