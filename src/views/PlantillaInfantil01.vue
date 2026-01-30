<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, 
    PhMusicNotes, PhConfetti, PhX, PhPause, PhPlay, // Agregado PhPlay
    PhClock, PhSparkle, PhCrown, PhRainbow, PhBalloon, PhQuotes, PhHeart, PhHandHeart,
    PhCloud, PhCloudSun, PhImages, PhStar // Agregados PhImages y PhStar para la galería
  } from '@phosphor-icons/vue'
  
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import confetti from 'canvas-confetti'
  import ImagenSegura from '../components/ImagenSegura.vue'
  
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ModalRegalosInfantil from '../components/ModalRegalosInfantil.vue' 
  import CronogramaInfantil from '../components/CronogramaInfantil.vue'
  import DemoSwitcherInfantil from '../components/DemoSwitcherInfantil.vue'

  const props = defineProps({ datos: { type: Object, required: true } })
  const route = useRoute()
  const modalRegalosOpen = ref(false)
  
  // --- VARIABLES CONFETI ---
  const canvasConfeti = ref(null)
  let myConfetti = null 
  let timerConfeti = null

  // --- LÓGICA DE PLANES ---
  const planVisualizado = ref(props.datos.esDemo ? 'magico' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }
  
  const esArcoiris = computed(() => ['arcoiris', 'magico'].includes(planVisualizado.value))
  const esMagico = computed(() => ['magico'].includes(planVisualizado.value))

  const nombreInvitado = computed(() => {
    // 1. Si no es plan mágico, nunca mostramos nada
    if (!esMagico.value) return null

    // 2. Si viene el nombre en la URL (Real), usamos ese
    if (route.query.invitado) return route.query.invitado

    // 3. ¡TRUCO! Si es modo DEMO y no hay nombre, inventamos uno para presumir la función
    if (props.datos.esDemo) return 'Familia Pérez' 

    // 4. Si es invitación real pero sin nombre, no mostramos nada
    return null
  })

  // --- AUDIO ---
  const audioPlayer = ref(null)
  const reproduciendo = ref(false)
  const toggleAudio = () => {
    if(!audioPlayer.value) return
    if(reproduciendo.value) audioPlayer.value.pause()
    else audioPlayer.value.play()
    reproduciendo.value = !reproduciendo.value
  }

  // --- GALERÍA (LÓGICA UNIFICADA) ---
  const fotoEnGrande = ref(null)
  
  // 1. Computed ÚNICO para las fotos visibles
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    
    // Lógica de Planes:
    // Si es Mágico (Premium) -> Hasta 12 fotos
    // Si es Arcoíris (Gold) -> Solo 6 fotos
    const limite = esMagico.value ? 12 : 6
    
    return props.datos.galeria.slice(0, limite)
  })

  // 2. Funciones auxiliares
  const obtenerUrlFoto = (item) => {
    return typeof item === 'string' ? item : item.url
  }
  
  const obtenerDescFoto = (item) => {
    return typeof item === 'string' ? '' : item.descripcion
  }

  // 3. Control del Modal de foto
  const abrirFoto = (fotoUrl) => { 
    fotoEnGrande.value = fotoUrl; 
    document.body.style.overflow = 'hidden' 
  }
  const cerrarFoto = () => { 
    fotoEnGrande.value = null; 
    document.body.style.overflow = '' 
  }

  // --- FUNCIÓN CONFETI ---
  const lanzarConfetiExplosion = () => {
    if (!myConfetti) return

    const coloresFiesta = ['#F9A8D4', '#A78BFA', '#FDE047', '#6EE7B7', '#93C5FD', '#FCA5A5'];

    myConfetti({
      origin: { y: -0.1, x: 0.5 }, 
      spread: 160,                
      startVelocity: 60,          
      particleCount: 250,         
      colors: coloresFiesta,
      gravity: 1.2, 
      ticks: 300,   
      scalar: 1.0,                
      disableForReducedMotion: true
    });
  }

  const iniciarBucleConfeti = () => {
    lanzarConfetiExplosion()
    const tiempoAleatorio = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000)
    timerConfeti = setTimeout(iniciarBucleConfeti, tiempoAleatorio)
  }

  // --- LIFECYCLE HOOKS ---
  onMounted(() => {
    document.title = `Cumpleaños de ${props.datos.nombre}`
    document.body.classList.add('scroll-kids-soft-pink')

    if (canvasConfeti.value) {
      myConfetti = confetti.create(canvasConfeti.value, {
        resize: true,
        useWorker: true
      })
      
      timerConfeti = setTimeout(iniciarBucleConfeti, 500)
    }
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-kids-soft-pink')
    if (timerConfeti) clearTimeout(timerConfeti)
    if (myConfetti) myConfetti.reset()
  })


</script>

<template>
  <div class="min-h-screen bg-rose-50 text-slate-700 font-fredoka overflow-x-hidden selection:bg-rose-100 selection:text-rose-500">

    <header class="relative min-h-screen w-full flex flex-col items-center justify-center py-12 px-6 overflow-hidden">
      
      <canvas 
        ref="canvasConfeti" 
        class="absolute inset-0 w-full h-full pointer-events-none z-50"
      ></canvas>

      <div class="absolute inset-0 z-0 bg-rose-50">
         <div 
          class="absolute inset-0" 
          :style="{ 
            backgroundImage: `url('${datos.imgFondoPattern}')`, 
            backgroundSize: '300px', 
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-rose-100/40"></div>
      </div>

      <div class="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div class="absolute bottom-[-100px] left-[10%] animate-balloon-rise-1 opacity-90">
           <PhBalloon weight="fill" class="text-pink-300 text-[80px] drop-shadow-xl" />
        </div>
        <div class="absolute bottom-[-100px] left-[30%] animate-balloon-rise-2 opacity-90">
           <PhBalloon weight="fill" class="text-yellow-300 text-[60px] drop-shadow-xl" />
        </div>
        <div class="absolute bottom-[-100px] left-[60%] animate-balloon-rise-3 opacity-90">
           <PhBalloon weight="fill" class="text-purple-300 text-[90px] drop-shadow-xl" />
        </div>
        <div class="absolute bottom-[-100px] left-[85%] animate-balloon-rise-1 opacity-90">
           <PhBalloon weight="fill" class="text-blue-300 text-[70px] drop-shadow-xl" />
        </div>
        <div class="absolute bottom-[-100px] left-[45%] animate-balloon-rise-2 opacity-80" style="animation-delay: 2s;">
           <PhBalloon weight="fill" class="text-teal-300 text-[50px] drop-shadow-lg" />
        </div>
      </div>

      <transition name="fade">
        <div v-if="esMagico && nombreInvitado" class="relative z-40 mb-24 animate-bounce-slow">
           <div class="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-8 py-2 rounded-full shadow-lg border-2 border-white transform rotate-[-2deg]">
             <p class="font-bold text-sm uppercase tracking-wider flex items-center gap-2 drop-shadow-md">
               <PhCrown weight="fill" class="text-yellow-200" /> Para {{ nombreInvitado }}
             </p>
           </div>
        </div>
      </transition>

      <div class="relative z-40 w-full max-w-xs md:max-w-4xl flex flex-col md:flex-row items-center justify-center animate-fade-in-up">
        <div class="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-rose-200/50 p-6 pt-24 pb-12 text-center border-[5px] border-white relative transform hover:scale-[1.02] transition-transform duration-500 ease-in-out md:order-2">
           <div class="absolute inset-3 border-2 border-dashed border-rose-100 rounded-[2rem] pointer-events-none"></div>
           <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-44 h-44">
             <div class="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-lg bg-white relative z-20">
               <img :src="datos.fotoPortada" class="w-full h-full object-cover" />
             </div>
             <div class="absolute bottom-2 -right-2 text-rose-300 text-4xl drop-shadow-md animate-spin-slow z-30">
                <PhSparkle weight="fill" />
             </div>
          </div>
          <div class="relative z-10 space-y-2 mt-2">
            <p class="font-pacifico text-3xl text-rose-300 transform -rotate-2">Mi primer añito</p>
            <h1 class="text-5xl font-fredoka font-black text-rose-400 tracking-wide uppercase drop-shadow-sm leading-none break-words">{{ datos.nombre }}</h1>
            <div class="w-16 h-1.5 bg-rose-100 mx-auto rounded-full mt-4"></div>
          </div>
        </div>

        <div class="relative z-20 -mt-10 md:mt-0 md:-mr-12 animate-float-delayed md:order-1">
           <div class="w-40 h-40 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full border-[6px] border-white shadow-xl flex flex-col items-center justify-center text-white text-center p-2 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <PhCalendarCheck weight="fill" class="text-white/30 text-4xl absolute top-2 right-6" />
              <p class="font-bold text-3xl uppercase leading-none font-fredoka drop-shadow-md">
                 {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric' }) }}
              </p>
              <p class="text-sm uppercase tracking-widest font-bold mb-1 opacity-90">
                 {{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'short' }) }}
              </p>
              <div class="w-10 h-0.5 bg-white/50 rounded-full mb-1"></div>
              <p class="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                 {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
              </p>
           </div>
        </div>

      </div>
    </header>

    <section class="py-14 relative bg-rose-50 overflow-hidden border-y-4 border-white">
       
       <div class="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
          
          <div class="relative inline-block px-4">
             <PhQuotes weight="fill" class="absolute -top-6 -left-2 md:-left-8 text-rose-200 text-4xl md:text-5xl transform -scale-x-100" />
             
             <p class="font-pacifico text-2xl md:text-4xl text-slate-600 leading-relaxed drop-shadow-sm rotate-[-1deg]">
               "{{ datos.frase }}"
             </p>
             
             <PhQuotes weight="fill" class="absolute -bottom-6 -right-2 md:-right-8 text-rose-200 text-4xl md:text-5xl" />
          </div>

          <div class="w-24 h-1 bg-rose-200/50 rounded-full mx-auto"></div>

          <div class="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-rose-100 shadow-sm">
             <PhClock weight="fill" class="text-rose-400 animate-pulse" />
             <p class="font-bold text-sm md:text-base text-slate-500 uppercase tracking-widest font-fredoka">
               ¡Falta muy poco!
             </p>
          </div>

          <div class="flex justify-center">
            <CuentaRegresiva 
              :fechaObjetivo="datos.fecha"
              colorCaja="bg-white shadow-lg rounded-2xl border border-rose-100 w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
              colorNumero="text-rose-400 font-black text-2xl md:text-4xl leading-none font-fredoka"
              colorEtiqueta="text-slate-400 text-[9px] md:text-[11px] uppercase font-bold mt-1 tracking-wide"
              colorSeparador="text-rose-300 font-black text-2xl mt-2 hidden md:block opacity-50" 
            />
          </div>
       </div>
    </section>

    <section class="py-20 px-4 bg-white relative overflow-hidden">
      
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <PhHeart weight="fill" class="absolute top-10 -left-6 text-rose-50 text-9xl rotate-[-12deg]" />
         <PhHeart weight="fill" class="absolute bottom-10 -right-6 text-rose-50 text-9xl rotate-[12deg]" />
      </div>

      <div class="max-w-4xl mx-auto relative z-10">
         
         <div class="text-center mb-12">
            <h2 class="font-pacifico text-3xl md:text-4xl text-rose-400 mb-2">Con la bendición de</h2>
            <div class="w-16 h-1 bg-rose-200 mx-auto rounded-full"></div>
         </div>

         <div class="grid gap-8" :class="datos.padrinos ? 'md:grid-cols-2' : 'grid-cols-1 max-w-lg mx-auto'">
            
            <div class="bg-rose-50 rounded-[2.5rem] p-8 text-center border-4 border-white shadow-xl shadow-rose-100 hover:-translate-y-2 transition-transform duration-300 group">
               
               <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-rose-400 shadow-md border-2 border-rose-100 group-hover:scale-110 transition-transform">
                  <PhHeart weight="fill" size="32" class="animate-pulse-slow" />
               </div>

               <h3 class="font-pacifico text-2xl text-rose-400 mb-4">Mis Papitos</h3>
               
               <div class="space-y-1">
                 <p class="font-fredoka font-bold text-slate-600 text-lg md:text-xl">{{ datos.padres.padre }}</p>
                 <p class="font-fredoka font-bold text-rose-300 text-lg">&</p>
                 <p class="font-fredoka font-bold text-slate-600 text-lg md:text-xl">{{ datos.padres.madre }}</p>
               </div>
            </div>

            <div v-if="datos.padrinos" class="bg-white rounded-[2.5rem] p-8 text-center border-2 border-dashed border-rose-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
               
               <div class="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400 shadow-sm group-hover:scale-110 transition-transform">
                  <PhHandHeart weight="fill" size="32" />
               </div>

               <h3 class="font-pacifico text-2xl text-purple-400 mb-4">Mis Padrinos</h3>
               
               <p class="font-fredoka font-bold text-slate-600 text-lg md:text-xl px-4 leading-relaxed">
                 {{ datos.padrinos.nombres }}
               </p>
            </div>

         </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-rose-100/50 relative overflow-hidden">
      
      <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-50 to-transparent"></div>
      <PhCloudSun weight="duotone" class="absolute top-10 left-[-20px] text-white/60 text-9xl" />
      <PhCloud weight="fill" class="absolute bottom-20 right-[-20px] text-white/60 text-8xl" />

      <div class="max-w-4xl mx-auto space-y-10 text-center relative z-10">
        
        <div class="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-rose-200/50 border-4 border-white relative">
          
          <div class="relative inline-block mb-12">
             <PhRainbow weight="duotone" class="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl text-rose-100 opacity-60" />
             <h2 class="relative text-3xl md:text-5xl font-black text-rose-400 font-pacifico drop-shadow-sm z-10">
               ¿Cuándo y Dónde?
             </h2>
          </div>
          
          <div class="grid md:grid-cols-2 gap-12 items-start">
            
            <div class="relative bg-rose-50 rounded-3xl p-6 border-2 border-dashed border-rose-200 group hover:bg-rose-100 transition-colors">
              
              <div class="absolute -top-16 -left-6 w-24 h-24 md:w-32 md:h-32 z-20 animate-bounce-slow">
                 <ImagenSegura 
                    src="/assets/infantil/unicornio-sentado.png" 
                    clase="w-full h-full object-contain drop-shadow-md"
                  />
                 <PhSparkle weight="fill" class="absolute bottom-0 right-0 text-yellow-300 text-4xl animate-spin-slow" />
              </div>

              <div class="flex flex-col items-center gap-2 pt-4 relative z-10">
                <div class="w-14 h-14 rounded-full bg-white text-rose-400 flex items-center justify-center text-2xl shadow-sm mb-2">
                  <PhCalendarCheck weight="fill" />
                </div>
                <div>
                  <p class="font-fredoka font-bold text-2xl text-slate-700 capitalize leading-tight">
                    {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long' }) }}
                  </p>
                  <p class="font-fredoka font-black text-4xl text-rose-500 my-1">
                     {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric' }) }}
                  </p>
                  <p class="font-fredoka font-bold text-xl text-slate-500 capitalize">
                     {{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'long' }) }}
                  </p>
                  
                  <div class="w-full h-[2px] bg-rose-200 my-3"></div>

                  <p class="text-lg font-bold text-slate-500 bg-white px-4 py-1 rounded-full inline-block shadow-sm">
                    {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }} hrs
                  </p>

                  <a v-if="esArcoiris" :href="datos.linkCalendario" target="_blank" class="block mt-4 text-xs font-bold text-purple-400 uppercase tracking-wider hover:text-purple-600 underline cursor-pointer">
                    + Agregar al Calendario
                  </a>
                </div>
              </div>
            </div>

            <div class="relative bg-purple-50 rounded-3xl p-6 border-2 border-dashed border-purple-200 group hover:bg-purple-100 transition-colors h-full flex flex-col justify-center">
               
               <PhCloud weight="fill" class="absolute -top-6 -right-6 text-purple-200 text-6xl opacity-50" />

               <div class="flex flex-col items-center gap-3">
                  <div class="w-16 h-16 rounded-full bg-white text-purple-400 flex items-center justify-center text-3xl mb-2 shadow-sm animate-float-slow">
                    <PhMapPin weight="fill" />
                  </div>
                  <div>
                    <h3 class="font-fredoka font-bold text-2xl text-slate-700 mb-2">{{ datos.ubicacion.nombreLugar }}</h3>
                    <p class="text-base text-slate-500 px-2 leading-relaxed font-medium">
                      {{ datos.ubicacion.direccion }}
                    </p>
                  </div>
                  
                  <div class="mt-6 w-full">
                    <BotonAccion 
                      texto="Ver Mapa" 
                      :icono="PhMapPin" 
                      :url="datos.ubicacion.linkGps" 
                      color="w-full bg-white text-purple-500 border-2 border-purple-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-xl font-bold py-3 uppercase tracking-wide text-sm" 
                    />
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <section v-if="esArcoiris && datos.agenda" class="py-16 px-4 bg-white relative overflow-hidden">
        <PhCloud weight="fill" class="absolute top-5 -left-10 text-rose-50 text-9xl opacity-40" />
        <PhSparkle weight="fill" class="absolute bottom-10 -right-5 text-rose-100 text-6xl animate-pulse" />

        <div class="max-w-2xl mx-auto relative z-10">
          <div class="text-center mb-12">
              <h2 class="text-4xl font-black text-rose-400 font-pacifico">Momentos Mágicos</h2>
              <div class="w-20 h-1 bg-rose-200 mx-auto rounded-full mt-2"></div>
              <p class="text-slate-400 mt-3 font-medium uppercase tracking-widest text-xs">No te pierdas de nada</p>
          </div>

          <CronogramaInfantil 
            :eventos="datos.agenda"
            colorPunto="bg-white border-rose-300" 
            colorCardBg="bg-white border border-rose-100"
            colorIcono="text-rose-400"
            tamanoCirculo="w-16 h-16"
          />
        </div>
    </section>

    <section v-if="esArcoiris && datos.galeria" class="py-20 px-4 bg-white relative overflow-hidden">
      
      <div class="absolute top-0 right-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <PhImages weight="duotone" class="absolute top-10 left-4 text-rose-200 text-6xl rotate-[-12deg] opacity-50 animate-pulse-slow" />
      <PhStar weight="fill" class="absolute bottom-20 right-4 text-yellow-200 text-5xl rotate-[12deg] opacity-50 animate-spin-slow" />

      <div class="max-w-6xl mx-auto text-center relative z-10">
        
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-black mb-2 font-pacifico text-rose-400 drop-shadow-sm">Mis Aventuras</h2>
          <div class="w-24 h-1.5 bg-rose-200 mx-auto rounded-full rotate-[-2deg]"></div>
          <p class="text-slate-400 mt-4 font-fredoka text-lg">¡Mira cuánto he crecido!</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-12 px-2">
          
          <div 
            v-for="(foto, index) in fotosVisibles" 
            :key="index"
            class="group relative cursor-pointer"
            @click="abrirFoto(obtenerUrlFoto(foto))"
          >
            <div 
              class="bg-white p-3 pb-10 shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:z-20 relative"
              :class="index % 2 === 0 ? 'rotate-[-2deg] hover:rotate-0' : 'rotate-[2deg] hover:rotate-0'"
            >
              
              <div 
                 class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-200/40 backdrop-blur-sm z-10 shadow-sm"
                 :class="index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'"
              ></div>

              <div class="aspect-square w-full overflow-hidden bg-slate-100 border border-slate-100">
                <ImagenSegura 
                  :src="obtenerUrlFoto(foto)" 
                  clase="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div v-if="obtenerDescFoto(foto)" class="absolute bottom-2 left-0 w-full text-center px-2">
                 <p class="font-pacifico text-rose-400 text-lg leading-none truncate opacity-80 group-hover:opacity-100 transition-opacity">
                   {{ obtenerDescFoto(foto) }}
                 </p>
              </div>

              <div class="absolute -bottom-4 -right-2 text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                 <PhHeart weight="fill" size="32" class="drop-shadow-md" />
              </div>

            </div>
          </div>

        </div>

        <div v-if="!esMagico && datos.galeria.length > 6" class="mt-12">
           <div class="inline-block relative group">
             <div class="absolute inset-0 bg-rose-200 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <p class="relative bg-white text-rose-400 text-sm font-bold px-6 py-3 rounded-full border-2 border-rose-100 shadow-sm flex items-center gap-2">
               <PhImages weight="bold" />
               + {{ datos.galeria.length - 6 }} fotitos más en el Plan Mágico
             </p>
           </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-rose-50 relative overflow-hidden">
      
      <div class="absolute inset-0 z-0 opacity-30" 
           style="background-image: radial-gradient(#fecdd3 1px, transparent 1px); background-size: 20px 20px;">
      </div>

      <div class="max-w-4xl mx-auto space-y-16 relative z-10">
        
        <div v-if="esMagico && datos.videoYoutube" class="text-center">
           
           <h3 class="font-pacifico text-3xl text-rose-400 mb-6 flex items-center justify-center gap-2">
             <PhPlayCircle weight="fill" class="text-rose-300" />
             Un pedacito de mi historia
           </h3>

           <div class="bg-white p-3 rounded-[2rem] shadow-2xl shadow-rose-200/50 relative inline-block w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-500">
              
              <PhStar weight="fill" class="absolute -top-4 -right-4 text-yellow-300 text-5xl animate-spin-slow z-20 drop-shadow-sm" />
              <PhHeart weight="fill" class="absolute -bottom-4 -left-4 text-rose-400 text-4xl animate-bounce-slow z-20 drop-shadow-sm" />

              <div class="aspect-video w-full rounded-[1.5rem] overflow-hidden bg-black relative z-10">
                <iframe 
                  class="w-full h-full" 
                  :src="`https://www.youtube.com/embed/${datos.videoYoutube}`" 
                  title="Video Invitación" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
           </div>
        </div>

        <div v-if="datos.regalos" class="relative max-w-lg mx-auto mt-10">
           
           <div class="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
              <div class="bg-white p-3 rounded-full shadow-md">
                 <PhGift weight="duotone" class="text-rose-400 text-5xl animate-wiggle" />
              </div>
           </div>

           <div class="bg-white rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl shadow-rose-100 border-4 border-rose-100 relative overflow-hidden">
              
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-rose-50/50 -z-0"></div>

              <div class="relative z-10">
                <h3 class="text-3xl font-bold text-slate-700 mb-4 font-pacifico">Mesa de Regalos</h3>
                
                <p class="text-slate-500 text-sm md:text-base mb-8 leading-relaxed font-fredoka">
                  El mejor regalo es tu presencia ✨<br>
                  Pero si deseas tener un detalle especial conmigo, aquí te dejo algunas opciones que me harían muy feliz.
                </p>

                <button 
                  @click="modalRegalosOpen = true"
                  class="w-full md:w-auto px-8 py-4 rounded-full font-bold text-white shadow-lg shadow-rose-200 transform transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center gap-2 group"
                >
                  <PhGift weight="fill" class="group-hover:rotate-12 transition-transform" />
                  Ver Opciones
                </button>
              </div>
           </div>
           
           <div class="w-3/4 h-4 bg-rose-900/5 mx-auto rounded-[100%] blur-md mt-4"></div>

        </div>

      </div>
    </section>

    <footer class="bg-gradient-to-br from-rose-400 to-pink-500 text-white py-20 px-4 text-center rounded-t-[3rem] relative z-20 overflow-hidden -mt-8">
       
       <div class="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
            :style="{ backgroundImage: `url(${datos.imgFondoPattern || '/assets/pattern-dots.png'})`, backgroundSize: '100px' }">
       </div>

       <PhSparkle weight="fill" class="absolute top-10 left-10 text-yellow-200 text-4xl animate-pulse-slow opacity-60" />
       <PhHeart weight="fill" class="absolute top-20 right-8 text-rose-200 text-5xl rotate-12 opacity-40" />

       <div class="max-w-md mx-auto space-y-10 relative z-10">
          
          <div>
            <div class="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1 mb-4 border border-white/30">
               <p class="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                 <PhWhatsappLogo weight="fill" /> RSVP
               </p>
            </div>
            
            <h3 class="text-3xl md:text-4xl font-bold mb-4 font-pacifico leading-tight">
               ¡Espero verte ahí!
            </h3>
            <p class="text-rose-100 text-base mb-8 font-fredoka leading-relaxed px-4">
               Por favor avísanos si podrás venir para tener lista tu sorpresita. 🎁
            </p>
            
            <BotonAccion 
               texto="Confirmar por WhatsApp" 
               :icono="PhWhatsappLogo" 
               :url="`https://wa.me/${datos.contacto.whatsapp}?text=${encodeURIComponent('¡Hola! 🦄 Quiero confirmar mi asistencia al cumpleaños de ' + datos.nombre + '. ¡Gracias por la invitación!')}`" 
               color="bg-white text-rose-500 w-full justify-center rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.1)] hover:translate-y-[2px] hover:shadow-[0_3px_0_rgba(0,0,0,0.1)] font-bold py-4 text-lg border-2 border-white/50 active:scale-95 transition-all" 
             />
          </div>

          <div class="pt-10 border-t border-white/20">
             <p class="text-sm font-bold text-white mb-2">
               Celebrando a {{ datos.nombre }}
             </p>
             
             <a href="#" class="inline-flex items-center gap-2 text-[10px] text-rose-100 opacity-80 hover:opacity-100 hover:text-white transition-all bg-black/10 px-3 py-1.5 rounded-full">
               <span>Hecho con magia por</span>
               <span class="font-black uppercase tracking-wide">Yupa Studio</span>
               <PhSparkle weight="fill" class="text-yellow-300" />
             </a>
          </div>

       </div>
    </footer>

    <div v-if="datos.musica" class="fixed bottom-6 right-6 z-50">
       <button 
         @click="toggleAudio" 
         class="w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 animate-bounce-slow border-2 border-white"
         :class="reproduciendo ? 'bg-pink-400 rotate-0' : 'bg-rose-400 rotate-12'"
       >
         <PhPause v-if="reproduciendo" weight="fill" size="20" />
         <PhMusicNotes v-else weight="fill" size="20" />
       </button>
       <audio ref="audioPlayer" :src="datos.musica" loop></audio>
    </div>

    <ModalRegalosInfantil 
      :isOpen="modalRegalosOpen"
      :listaRegalos="datos.regalos || []" 
      @close="modalRegalosOpen = false"
    />

    <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
      <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" @click="cerrarFoto">
        <button class="absolute top-4 right-4 text-white bg-white/20 p-2 rounded-full" @click.stop="cerrarFoto">
          <PhX size="32" />
        </button>
        <img :src="fotoEnGrande" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl border-4 border-white" @click.stop />
      </div>
    </Transition>

    <DemoSwitcherInfantil v-if="datos.esDemo" @cambioPlan="actualizarPlan" />

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&family=Pacifico&display=swap');

.font-fredoka { font-family: 'Fredoka', sans-serif; }
.font-pacifico { font-family: 'Pacifico', cursive; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.animate-float-slow { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }

.animate-bounce-slow { animation: bounce 3s infinite; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

/* Flotar suavemente (Para el círculo de fecha) */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float-delayed {
  animation: float 5s ease-in-out infinite 1s; /* Retraso para que no vaya igual que otros */
}

/* Giro muy lento para la estrellita */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

/* Variante 1: Sube oscilando a la derecha */
@keyframes balloonRise1 {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
  50% { transform: translateY(-50vh) translateX(20px) rotate(5deg); }
  100% { transform: translateY(-120vh) translateX(-10px) rotate(-5deg); opacity: 0; }
}
.animate-balloon-rise-1 {
  animation: balloonRise1 8s ease-in infinite;
}

/* Variante 2: Sube oscilando a la izquierda, más lento */
@keyframes balloonRise2 {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
  50% { transform: translateY(-60vh) translateX(-30px) rotate(-5deg); }
  100% { transform: translateY(-130vh) translateX(10px) rotate(5deg); opacity: 0; }
}
.animate-balloon-rise-2 {
  animation: balloonRise2 12s ease-in infinite 1s; /* Retraso de 1s */
}

/* Variante 3: Sube más recto y rápido */
@keyframes balloonRise3 {
  0% { transform: translateY(0) translateX(0); opacity: 0.9; }
  100% { transform: translateY(-110vh) translateX(10px); opacity: 0; }
}
.animate-balloon-rise-3 {
  animation: balloonRise3 7s linear infinite 0.5s; /* Retraso de 0.5s */
}
</style>

<style>
body.scroll-kids-soft-pink::-webkit-scrollbar { width: 12px; }
body.scroll-kids-soft-pink::-webkit-scrollbar-track { background: #fff1f2; } /* rose-50 */
body.scroll-kids-soft-pink::-webkit-scrollbar-thumb { 
  background-color: #fb7185; /* rose-400 */
  border-radius: 10px; 
  border: 3px solid #fff1f2;
}
</style>