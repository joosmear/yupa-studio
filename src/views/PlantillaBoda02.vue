<script setup>
  import { PhMapPin, PhCalendarCheck, PhGift, PhStar, PhWhatsappLogo } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // Componentes
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos from '../components/ModalRegalos.vue'
  import Cronograma from '../components/Cronograma.vue'
  import CodigoVestimenta from '../components/CodigoVestimenta.vue'
  import GaleriaFotos from '../components/GaleriaFotos.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'
  import MenuNavegacion from '../components/MenuNavegacion.vue'
  import DemoSwitcher from '../components/DemoSwitcher.vue' // <--- IMPORTANTE

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  // --- ESTADO DEL DEMO SWITCHER ---
  const planVisualizado = ref(props.datos.esDemo ? 'premium' : props.datos.plan) 

  const actualizarPlan = (nuevoPlan) => {
    planVisualizado.value = nuevoPlan
  }

  // --- COMPUTADAS REACTIVAS AL SWITCHER ---
  const esGold = computed(() => ['gold', 'premium'].includes(planVisualizado.value))
  const esPremium = computed(() => planVisualizado.value === 'premium')

  // COMPUTADA DE FECHA LÍMITE (Segura)
  const fechaLimiteConfirmacion = computed(() => {
    if (!props.datos.fecha) return ''
    const fecha = new Date(props.datos.fecha)
    fecha.setMonth(fecha.getMonth() - 1)
    return fecha.toLocaleDateString('es-BO', { day: 'numeric', month: 'long' })
  })

  const galeriaAbierta = ref(false)
  const modalAbierto = ref(false)
  let intervaloEscritura = null

  // Lógica de Escritura
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

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
    document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
    document.body.classList.add('scroll-gala')
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-gala')
    document.title = 'Yupa Studio | Invitaciones Digitales'
    if (intervaloEscritura) clearInterval(intervaloEscritura)
  })
</script>

<template>
  <div class="min-h-screen bg-[#0B0F19] text-slate-200 overflow-x-hidden font-sans font-light selection:bg-amber-500/30 pb-24">

    <header class="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="datos.fotoPortada" class="w-full h-full object-cover grayscale-[20%]" alt="Portada" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/40 to-[#0B0F19]"></div>
        <div class="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
      </div>

      <div class="absolute inset-6 md:inset-12 border border-amber-200/20 z-10 pointer-events-none rounded-sm"></div>

      <div class="estrellas-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <img v-for="n in 15" :key="n" src="/assets/estrella.png" class="estrella absolute" alt="estrella" />
      </div>

      <transition name="fade">
        <div v-if="esPremium" class="absolute top-24 z-20 animate-pulse delay-700">
           <div class="bg-amber-900/40 backdrop-blur-md border border-amber-500/30 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(180,83,9,0.3)]">
             <p class="text-amber-100 text-sm font-bold tracking-wide uppercase text-[10px]">✨ Hola Familia Pérez ✨</p>
           </div>
        </div>
      </transition>

      <div class="relative z-20 space-y-8 px-4">
        <p class="uppercase tracking-[0.5em] text-xs text-amber-100/80 animate-fade-in-up font-medium">
          Nuestra Boda
        </p>
        
        <h1 class="font-elegante text-5xl md:text-7xl lg:text-8xl text-gold drop-shadow-2xl py-2">
          {{ nombreMostrado }}<span v-if="cursorVisible" class="text-amber-200 animate-pulse font-light">|</span>
        </h1>
        
        <div class="flex items-center justify-center gap-4 opacity-80">
          <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-200"></div>
          <div class="w-2 h-2 rotate-45 border border-amber-200"></div>
          <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-200"></div>
        </div>
        
        <p class="text-xl tracking-[0.3em] text-slate-300 uppercase font-medium">
          {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>
      </div>
    </header>

    <section class="py-24 px-6 max-w-3xl mx-auto text-center relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
      <PhStar :size="24" class="text-amber-300/80 mx-auto mb-8 animate-pulse" weight="fill" />
      
      <p class="font-elegante text-2xl md:text-4xl text-amber-50/90 leading-relaxed italic">
        "{{ datos.frase }}"
      </p>
    </section>

    <section class="py-12 bg-[#0F1420] border-y border-white/5 relative overflow-hidden">
       <div class="text-center mb-10">
        <p class="uppercase tracking-[0.3em] text-[10px] font-bold text-amber-400/80">El gran día se acerca</p>
       </div>
       
      <CuentaRegresiva 
        :fechaObjetivo="datos.fecha" 
        colorCaja="bg-[#161C2C] border border-white/5 shadow-xl"
        colorNumero="text-gold font-sans font-light" 
        colorEtiqueta="text-slate-500 uppercase text-[10px] tracking-widest font-sans font-medium"
        colorSegundos="text-amber-100 font-sans" 
      />
    </section>

    <section v-if="datos.ubicacion" class="py-24 px-4">
      <div class="max-w-4xl mx-auto bg-[#131926] rounded-sm p-10 md:p-16 shadow-2xl border border-white/5 text-center relative">
        <div class="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-500/30 m-4"></div>
        <div class="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-amber-500/30 m-4"></div>

        <h2 class="font-elegante text-4xl md:text-5xl text-gold mb-12">Ceremonia</h2>

        <div class="flex flex-col gap-12 mb-12 items-center">
          
          <div class="flex flex-col items-center gap-3">
             <div class="w-12 h-12 rounded-full bg-[#0B0F19] border border-amber-500/20 flex items-center justify-center">
               <PhMapPin :size="24" weight="thin" class="text-amber-200" />
             </div>
             <div>
                <p class="text-xl text-amber-50 font-medium tracking-wide mb-2">
                  {{ datos.ubicacion.nombreLugar }}
                </p>
                <p class="text-slate-400 text-sm tracking-wide uppercase opacity-80">
                  {{ datos.ubicacion.direccion }}
                </p>
             </div>
          </div>

          <div class="flex flex-col items-center gap-3">
             <div class="w-12 h-12 rounded-full bg-[#0B0F19] border border-amber-500/20 flex items-center justify-center">
                <PhCalendarCheck :size="24" weight="thin" class="text-amber-200" />
             </div>
             <div>
                <p class="text-xl text-amber-50 font-medium tracking-wide mb-2 capitalize">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </p>
                <p class="text-slate-400 text-sm tracking-wide uppercase opacity-80">
                  Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                </p>
             </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center gap-6 text-sm font-medium tracking-widest uppercase">
           <BotonAccion 
             texto="Ver Mapa GPS" 
             :icono="PhMapPin" 
             :url="datos.ubicacion.linkGps" 
             color="bg-transparent border border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30 transition-colors rounded-md"
           />
           
           <BotonAccion 
             v-if="esGold"
             texto="Agendar Fecha" 
             :icono="PhCalendarCheck" 
             :url="datos.linkCalendario" 
             color="bg-transparent border border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30 transition-colors rounded-md"
           />
        </div>
      </div>
    </section>

    <transition name="fade">
      <section v-if="esGold" class="py-10">
        <Cronograma 
          v-if="datos.agenda" 
          :eventos="datos.agenda" 
          colorTitulo="text-gold font-elegante" 
          colorLinea="border-amber-500/20"
          colorPunto="bg-gradient-to-b from-amber-300 to-amber-600 border-none shadow-glow" 
          colorCardBg="bg-[#161C2C] border-white/5 hover:border-amber-500/30"
          colorHora="text-amber-200 font-normal"
          colorIcono="text-amber-400"
          colorTexto="text-slate-300 font-light"
        />

        <div class="my-12"></div>

        <CodigoVestimenta 
          v-if="datos.vestimenta" 
          :tipo="datos.vestimenta.tipo" 
          :nota="datos.vestimenta.nota"
          colorFondo="bg-[#0F1420]"
          colorBorde="border-white/5"
          colorCirculo="bg-[#161C2C] border border-amber-500/20"
          colorIcono="text-amber-300"
          colorTitulo="text-amber-50 font-elegante"
          colorResalte="text-amber-300 font-medium"
          colorNotaBg="bg-[#161C2C]"
          colorNotaTexto="text-slate-400 italic font-light"
        />
      </section>
    </transition>
    
    <div v-if="!esGold" class="py-12 bg-[#0F1420] text-center border-y border-white/5">
       <p class="text-slate-500 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
         <PhStar weight="fill" class="text-amber-500/50" /> El Plan Gold incluye Cronograma y Fotos
       </p>
    </div>

    <transition name="fade">
      <div v-if="esGold">
        <GaleriaFotos 
          v-if="datos.galeria" 
          :fotos="datos.galeria" 
          colorIcono="text-[#0B0F19]"
          colorTitulo="text-[#0B0F19]"
          @cambioEstado="galeriaAbierta = $event"
        />
      </div>
    </transition>
    
    <SeccionPadrinos 
      v-if="datos.cortejo" 
      :padrinos="datos.cortejo"
      colorIcono="text-[#0B0F19]"
      colorTitulo="text-[#0B0F19]"
      colorTexto="text-slate-400 font-light"
    />

    <section class="py-24 text-center bg-gradient-to-t from-[#0B0F19] to-[#0F1420]">
      <div class="w-20 h-20 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-8 bg-[#161C2C] shadow-2xl shadow-amber-900/20">
        <PhGift :size="48" weight="thin" class="text-amber-200" />
      </div>
      
      <h3 class="font-elegante text-4xl text-amber-50 mb-4">Regalo de Bodas</h3>
      
      <p class="text-slate-400 text-sm mb-6 max-w-sm mx-auto font-light leading-relaxed">
        Su presencia es nuestro mayor regalo. Si desean tener un detalle con nosotros...
      </p>
      
      <button @click="modalAbierto = true" class="px-6 py-2 border border-amber-500/40 text-amber-300 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-amber-500/10 transition mb-16 font-bold">
        Ver Datos Bancarios
      </button>

      <div class="max-w-xs mx-auto w-full mt-8">
         <div class="text-slate-500 text-[10px] uppercase tracking-widest mb-2">Confirmar antes del {{ fechaLimiteConfirmacion }}</div>
         <BotonAccion 
           texto="Confirmar Asistencia" 
           :icono="PhWhatsappLogo" 
           :url="`https://wa.me/${datos.contacto.whatsapp}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${datos.nombres}`" 
           color="bg-transparent border border-white/10 text-slate-400 hover:text-amber-200 hover:border-amber-500/30 transition-colors rounded-md"
         />
      </div>
    </section>

    <footer class="text-center text-slate-500 text-[10px] uppercase tracking-widest py-12 border-t border-white/5 font-medium">
      <p>Diseñado por <span class="text-slate-300">Yupa Studio</span> · Luxury Collection</p>
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
      colorAcento="text-amber-500" 
      colorBoton="bg-slate-900 border border-amber-500/50"
    />

    <MenuNavegacion v-show="!modalAbierto && !galeriaAbierta" />
    
    <DemoSwitcher v-if="datos.esDemo" @cambioPlan="actualizarPlan" />

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