<script setup>
  import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhSparkle, PhMagnifyingGlassPlus, PhX, PhMusicNotes, PhCrown } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // Componentes
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos15 from '../components/ModalRegalos15.vue'
  import Cronograma15 from '../components/Cronograma15.vue'
  import CodigoVestimenta15 from '../components/CodigoVestimenta15.vue'
  import MenuNavegacion from '../components/MenuNavegacion.vue'
  import IconoAnimado from '../components/IconoAnimado.vue'
  import DemoSwitcher from '../components/DemoSwitcher.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  const modalAbierto = ref(false)

  // --- LOGICA DE PLANES ---
  const planVisualizado = ref(props.datos.esDemo ? 'queen' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }
  
  const esGold = computed(() => ['gold', 'premium', 'glow', 'queen'].includes(planVisualizado.value))
  const esPremium = computed(() => ['premium', 'queen'].includes(planVisualizado.value))

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    if (esPremium.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 6)
  })

  // Efecto de escritura
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombre || props.datos.nombres 
    let i = 0
    nombreMostrado.value = ""
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

  onMounted(() => {
    document.title = `XV Años Real | ${props.datos.nombre}`
    document.body.classList.add('scroll-royal') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-royal')
    document.title = 'Invitación Digital'
  })

  // Lightbox
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

    <header class="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-4 bg-[#0f172a]">
      
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-slate-900/40 z-10"></div>
        <img :src="datos.fotoPortada" class="w-full h-full object-cover opacity-60" />
        <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0f172a] to-transparent z-10"></div>
      </div>

      <div class="destellos-container absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div v-for="n in 20" :key="n" class="destello absolute text-[#fbbf24] animate-pulse">✦</div>
      </div>

      <div class="absolute inset-4 md:inset-8 border border-[#fbbf24]/30 z-20 pointer-events-none rounded-tr-[50px] rounded-bl-[50px]"></div>
      <div class="absolute inset-6 md:inset-10 border border-[#fbbf24]/20 z-20 pointer-events-none"></div>

      <transition name="fade">
        <div v-if="esPremium" class="absolute top-20 z-30 animate-fade-in-up delay-700">
           <div class="bg-[#0f172a]/80 backdrop-blur-md border border-amber-500/50 px-8 py-2 rounded-full shadow-lg shadow-amber-500/10">
             <p class="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
               <PhCrown weight="fill" /> Invitación Real: Familia Pérez
             </p>
           </div>
        </div>
      </transition>

      <div class="relative z-30 space-y-6 animate-fade-in-up w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full mt-10"> 
        
        <div class="text-amber-400 opacity-90 drop-shadow-lg mb-2">
           <PhCrown weight="light" class="w-16 h-16 md:w-20 md:h-20 mx-auto" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-center gap-4 text-amber-200/80 uppercase tracking-[0.3em] text-xs md:text-sm font-cinzel">
             <span class="border-b border-amber-500/50 pb-1">Mis Quince</span>
          </div>
          
          <h1 class="font-great-vibes text-6xl md:text-8xl lg:text-9xl text-gold-gradient py-2 leading-tight drop-shadow-xl">
            {{ nombreMostrado }}
            <span v-if="cursorVisible" class="animate-pulse text-amber-200">|</span>
          </h1>
          
          <p class="text-slate-300 font-cinzel text-sm md:text-lg tracking-widest uppercase mt-4">
            {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-10 z-30 animate-bounce text-amber-500/70">
         <div class="w-[1px] h-16 bg-gradient-to-b from-transparent via-amber-500 to-transparent mx-auto"></div>
      </div>
    </header>

    <section class="py-24 px-6 w-full text-center space-y-12 relative bg-[#f8fafc] text-slate-800">
      
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0f172a] via-[#fbbf24] to-[#0f172a]"></div>

      <div class="relative z-10 space-y-10 max-w-3xl mx-auto">
        <IconoAnimado 
          src="/assets/iconos/heart.gif"
          class="w-20 h-20 mx-auto opacity-60 grayscale brightness-50 sepia"
        />
        
        <p class="font-cinzel text-xl md:text-3xl text-slate-700 italic leading-relaxed px-6 font-medium border-l-4 border-amber-400 pl-6 md:pl-10 text-left md:text-center md:border-l-0 md:border-t-0">
          "{{ datos.frase }}"
        </p>

        <div class="py-8 bg-white shadow-xl rounded-xl border border-slate-100 p-8 max-w-2xl mx-auto relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
          <p class="uppercase tracking-[0.2em] text-xs font-bold mb-8 text-slate-400">Tiempo Restante</p>
          <CuentaRegresiva 
            :fechaObjetivo="datos.fecha" 
            colorCaja="bg-slate-50 border border-slate-200"
            colorNumero="text-slate-800 font-cinzel"
            colorEtiqueta="text-slate-400 uppercase text-[10px]"
            colorSegundos="text-amber-600" 
          />
        </div>
      </div>
    </section>

    <section v-if="datos.padres" class="py-24 px-6 bg-[#0f172a] text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div class="relative z-10 w-full max-w-4xl mx-auto text-center space-y-16">
        <div class="space-y-4">
          <h3 class="font-cinzel text-3xl md:text-5xl text-amber-400 leading-tight">
            Con la bendición de Dios
          </h3>
          <p class="text-slate-400 italic font-playfair text-xl">y el amor de mis padres</p>
        </div>
      
        <div class="border border-amber-500/30 p-2 rounded-lg inline-block">
          <div class="border border-amber-500/30 p-8 md:p-14 rounded-lg bg-[#1e293b]/50 backdrop-blur-sm">
            <div class="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
               <div class="space-y-2">
                  <p class="font-playfair italic text-3xl md:text-4xl text-white">
                    {{ datos.padres.padre }}
                  </p>
                  <div class="h-[1px] w-12 bg-amber-500 mx-auto"></div>
                  <p class="text-xs uppercase tracking-widest text-amber-500/80">Padre</p>
               </div>

               <div class="text-amber-500 text-2xl">❦</div>

               <div class="space-y-2">
                  <p class="font-playfair italic text-3xl md:text-4xl text-white">
                    {{ datos.padres.madre }}
                  </p>
                  <div class="h-[1px] w-12 bg-amber-500 mx-auto"></div>
                  <p class="text-xs uppercase tracking-widest text-amber-500/80">Madre</p>
               </div>
            </div>
          </div>
        </div>

        <div v-if="datos.padrinos" class="space-y-4 pt-4">
            <p class="text-sm uppercase tracking-widest text-slate-400">Mis Padrinos de Honor</p>
            <p class="font-playfair text-2xl md:text-3xl text-amber-100">
               {{ datos.padrinos.nombres }}
            </p>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-white relative overflow-hidden">       
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">      
        
        <div class="order-1 md:order-2 relative p-4">
          <div class="absolute inset-0 border-2 border-amber-400 transform translate-x-2 translate-y-2 rounded-t-[5rem]"></div>
          <div class="h-[500px] w-full rounded-t-[5rem] overflow-hidden relative shadow-2xl border-4 border-white z-10">
            <img 
              :src="datos.fotoSegunda" 
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
              alt="Recepción"
            />
          </div>
        </div>

        <div class="order-2 md:order-1 text-center md:text-left space-y-10">
          <div class="space-y-4">
            <h2 class="font-cinzel text-5xl md:text-6xl text-[#0f172a]">
              Recepción
            </h2>
            <p class="text-amber-600 text-lg font-playfair italic">
              Una noche mágica para celebrar
            </p>
          </div>
        
          <div class="space-y-8 border-l-2 border-slate-100 pl-6 md:border-none md:pl-0">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div class="w-14 h-14 bg-slate-50 text-[#0f172a] rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                 <PhMapPin :size="28" weight="light" />
              </div>
              <div>
                <strong class="block text-xl text-slate-800 font-cinzel mb-1">
                  {{ datos.ubicacion.nombreLugar }}
                </strong>
                <span class="text-base text-slate-500 font-light block max-w-xs mx-auto md:mx-0">
                  {{ datos.ubicacion.direccion }}
                </span>
                <a :href="datos.ubicacion.linkGps" target="_blank" class="text-amber-600 text-xs font-bold uppercase tracking-widest mt-2 inline-block border-b border-amber-200 pb-1">Ver Ubicación</a>
              </div>
            </div>
          
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5">
              <div class="w-14 h-14 bg-slate-50 text-[#0f172a] rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                 <PhCalendarCheck :size="28" weight="light" />
              </div>
              <div>
                <strong class="block text-xl text-slate-800 font-cinzel capitalize mb-1">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </strong>
                <span class="text-base text-slate-500 font-light">
                  Hora: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                </span>
                <br>
                <a v-if="esGold" :href="datos.linkCalendario" target="_blank" class="text-amber-600 text-xs font-bold uppercase tracking-widest mt-2 inline-block border-b border-amber-200 pb-1 cursor-pointer">Agendar Fecha</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="esGold && datos.galeria" class="py-24 bg-[#0f172a] relative overflow-hidden">
      
      <div class="text-center mb-16 relative z-10 px-4">
        <h3 class="font-great-vibes text-6xl text-amber-400 mb-2">Galería de Fotos</h3>
        <p class="font-cinzel text-slate-400 text-sm uppercase tracking-widest">Mis mejores momentos</p>
      </div>

      <div class="relative w-full overflow-hidden py-8">
        <div class="flex animate-marquee hover-pause">
          <div class="flex shrink-0 gap-8 px-4">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'orig-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full p-2 bg-white shadow-lg rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div class="w-full h-full overflow-hidden bg-slate-200 relative">
                   <img :src="foto" class="w-full h-full object-cover" loading="lazy" />
                   <div class="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <PhMagnifyingGlassPlus size="32" />
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex shrink-0 gap-8 px-4" aria-hidden="true">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'clon-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full p-2 bg-white shadow-lg rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div class="w-full h-full overflow-hidden bg-slate-200 relative">
                   <img :src="foto" class="w-full h-full object-cover" loading="lazy" />
                   <div class="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <PhMagnifyingGlassPlus size="32" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!esPremium && datos.galeria.length > 6" class="text-center pt-8 relative z-30">
         <p class="text-slate-400 text-xs italic border border-slate-700 inline-block px-4 py-2 rounded-full uppercase tracking-wider">
           + {{ datos.galeria.length - 6 }} fotos más en Plan Queen
         </p>
      </div>

      <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-[#0f172a]/95 backdrop-blur-md flex items-center justify-center p-4" @click="cerrarFoto">
          <button class="absolute top-6 right-6 text-white p-3 bg-white/10 rounded-full" @click.stop="cerrarFoto"><PhX size="32" /></button>
          <img :src="fotoEnGrande" class="max-w-5xl max-h-[90vh] shadow-2xl border-8 border-white" @click.stop />
        </div>
      </Transition>
    </section>

    <transition name="fade">
      <section v-if="esGold" class="bg-slate-50 py-24 relative border-t border-slate-200">
          <div class="text-center mb-16 relative z-10">
            <h2 class="font-cinzel text-4xl md:text-5xl text-[#0f172a] mb-2">Itinerario</h2>
            <div class="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>

          <Cronograma15 
            :eventos="datos.agenda"
            colorCardBg="bg-white shadow-sm border border-slate-100"
            colorLinea="border-amber-200"
            colorHora="text-amber-600 font-bold font-cinzel"
            colorTitulo="text-slate-800 font-bold"
            colorIcono="text-[#0f172a]"
          />
        
          <div class="mt-20"></div>

          <div class="text-center mb-8">
             <h3 class="font-cinzel text-3xl text-[#0f172a]">Código de Vestimenta</h3>
          </div>

          <CodigoVestimenta15 
            v-if="datos.vestimenta"
            :nota="datos.vestimenta.nota"
            :tipo="datos.vestimenta.tipo"
            :labelHombres="datos.vestimenta.etiquetaHombres || 'Traje Formal'"
            :labelMujeres="datos.vestimenta.etiquetaMujeres || 'Vestido Largo'"
            imgHombres="/assets/iconos/suit.png"
            imgMujeres="/assets/iconos/dress.png"
          />
      </section>
    </transition>

    <div v-if="!esGold" class="py-12 bg-slate-100 text-center border-t border-slate-200">
       <p class="text-slate-500 text-xs italic flex items-center justify-center gap-2 uppercase tracking-widest">
         <PhSparkle weight="fill" class="text-amber-500" /> Plan Glow: Desbloquea Fotos y Cronograma
       </p>
    </div>

    <section class="py-24 px-6 bg-[#0f172a] text-white relative overflow-hidden">
      <div class="max-w-lg mx-auto relative z-10 text-center space-y-12">
        
        <div class="bg-[#1e293b] border border-amber-500/20 p-10 rounded-t-[3rem] rounded-b-xl relative shadow-2xl">
           <div class="w-20 h-20 mx-auto bg-[#0f172a] rounded-full flex items-center justify-center border border-amber-500/50 mb-6 text-amber-400">
              <IconoAnimado src="/assets/iconos/gift.gif" class="w-12 h-12 grayscale brightness-200" />
           </div>
           
           <h3 class="font-cinzel text-2xl text-white mb-4">Mesa de Regalos</h3>
           <p class="text-slate-300 text-sm mb-8 leading-relaxed font-playfair italic">
             "El mejor regalo es tu presencia, pero si deseas tener un detalle conmigo..."
           </p>
           
           <button 
             @click="modalAbierto = true" 
             class="px-8 py-3 border border-amber-500 text-amber-400 font-bold uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-[#0f172a] transition-all duration-300"
           >
             Ver Datos Bancarios
           </button>
        </div>

        <div class="space-y-6">
           <h3 class="font-cinzel text-3xl text-white">Confirmación</h3>
           <p class="text-slate-400">Favor de confirmar asistencia antes del {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long' }) }}</p>
           
           <BotonAccion 
             texto="Confirmar por WhatsApp" 
             :icono="PhWhatsappLogo" 
             :url="`https://wa.me/${datos.contacto.whatsapp}`" 
             color="bg-white text-[#0f172a] font-bold hover:bg-slate-200 w-full justify-center shadow-lg" 
           />
        </div>
      </div>
    </section>

    <footer class="bg-[#020617] text-slate-600 py-10 text-center text-[10px] uppercase tracking-[0.2em] pb-32">
      <p class="mb-2">XV Años • {{ nombreMostrado }}</p>
      <p>Diseño por <span class="text-amber-600 font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-[#0f172a] border-amber-500/50 text-amber-400"
      colorIcono="text-amber-400"
    />
    
    <ModalRegalos15 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      claseColorPrincipal="text-[#0f172a] border-[#0f172a]"
      claseOverlay="bg-[#0f172a]/95 backdrop-blur-md"
    />

    <MenuNavegacion v-show="!modalAbierto && !fotoEnGrande" />
    <DemoSwitcher v-if="datos.esDemo" @cambioPlan="actualizarPlan" />

  </div>
</template>

<style scoped>
/* FUENTES ROYAL (Importar en index.html si no las tienes) */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Playfair+Display:ital@0;1&display=swap');

.font-cinzel { font-family: 'Cinzel', serif; }
.font-great-vibes { font-family: 'Great Vibes', cursive; }
.font-playfair { font-family: 'Playfair Display', serif; }

/* GRADIENTE DORADO TEXTO */
.text-gold-gradient {
  background: linear-gradient(to bottom, #fcd34d, #fbbf24, #d97706);
  -webkit-background-clip: text;
  color: transparent;
}

/* DESTELLOS */
.destello { font-size: 20px; opacity: 0; animation: brillar 3s infinite ease-in-out; }
.destello:nth-child(even) { color: #fef3c7; animation-duration: 4s; }
.destello:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.destello:nth-child(2) { top: 30%; right: 15%; animation-delay: 1s; }
.destello:nth-child(3) { bottom: 20%; left: 10%; animation-delay: 2s; }
/* ... puedes agregar más posiciones ... */

@keyframes brillar {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.8; transform: scale(1.2); text-shadow: 0 0 5px #fbbf24; }
}

/* ANIMACIONES */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-marquee {
  animation: marquee 40s linear infinite;
  width: max-content;
}
.hover-pause:hover { animation-play-state: paused; }
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

/* SCROLLBAR ROYAL */
body.scroll-royal::-webkit-scrollbar { width: 8px; }
body.scroll-royal::-webkit-scrollbar-track { background: #0f172a; }
body.scroll-royal::-webkit-scrollbar-thumb { background: #d97706; border-radius: 4px; border: 1px solid #0f172a; }
</style>