<script setup>
  import { 
    PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, 
    PhMusicNotes, PhConfetti, PhX, PhPause,
    PhClock, PhSparkle, PhCrown, PhRainbow, PhBalloon, PhQuotes, PhHeart, PhHandHeart,
    PhCloud, PhCloudSun, PhImages, PhStar, PhPlayCircle,  PhLockKey, PhVideo, PhMagicWand,
    PhLightning, PhMicrophone, PhMicrophoneStage
  } from '@phosphor-icons/vue'
  
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  // import confetti from 'canvas-confetti' // YA NO LO NECESITAMOS PARA ESTO
  import ImagenSegura from '../components/ImagenSegura.vue'
  
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ModalRegalosInfantil from '../components/ModalRegalosInfantil.vue' 
  import CronogramaInfantil from '../components/CronogramaInfantil.vue'
  import DemoSwitcherInfantil from '../components/DemoSwitcherInfantil.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalGeneradorLinks from '../components/ModalGeneradorLinks.vue'
  import Navbar from '../components/Navbar.vue'

  const props = defineProps({ datos: { type: Object, required: true } })
  const route = useRoute()
  const modalRegalosOpen = ref(false)
  
  // --- LÓGICA DE PLANES ---
  const planVisualizado = ref(props.datos.esDemo ? 'magico' : props.datos.plan) 
  const actualizarPlan = (nuevoPlan) => { planVisualizado.value = nuevoPlan }
  
  const esArcoiris = computed(() => ['arcoiris', 'magico'].includes(planVisualizado.value))
  const esMagico = computed(() => ['magico'].includes(planVisualizado.value))

  const nombreInvitado = computed(() => {
    if (!esMagico.value) return null
    if (route.query.invitado) return route.query.invitado
    if (props.datos.esDemo) return 'Familia Pérez' 
    return null
  })

  // --- GALERÍA ---
  const fotoEnGrande = ref(null)
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    const limite = esMagico.value ? 12 : 6
    return props.datos.galeria.slice(0, limite)
  })

  const obtenerUrlFoto = (item) => typeof item === 'string' ? item : item.url
  const obtenerDescFoto = (item) => typeof item === 'string' ? '' : item.descripcion

  const abrirFoto = (fotoUrl) => { 
    fotoEnGrande.value = fotoUrl; 
    document.body.style.overflow = 'hidden' 
  }
  const cerrarFoto = () => { 
    fotoEnGrande.value = null; 
    document.body.style.overflow = '' 
  }

  // --- VARIABLES LLUVIA PNG ---
  const contenedorLluvia = ref(null) // Referencia al div contenedor
  let intervaloLluvia = null

  // TUS IMÁGENES PNG (Asegúrate que las rutas sean correctas)
  const misImagenesPng = [
      '/assets/infantil/nota-1.png', 
      '/assets/infantil/nota-2.png'
  ];

  // --- FUNCIÓN: CREAR UNA GOTA DE IMAGEN ---
  const crearGotaImagen = () => {
      if (!contenedorLluvia.value) return;

      const img = document.createElement('img');
      
      // 1. Elegir imagen aleatoria
      const rutaRandom = misImagenesPng[Math.floor(Math.random() * misImagenesPng.length)];
      img.src = rutaRandom;
      
      // 2. Clases base
      img.classList.add('gota-img');
      
      // 3. Posición Aleatoria
      img.style.left = Math.random() * 100 + '%';
      
      // 4. Tamaño Aleatorio
      const tamano = 15 + Math.random() * 15; // Ajusté un poco el tamaño
      img.style.width = `${tamano}px`;

      // --- NUEVO: EFECTO NEÓN ALEATORIO ---
      // Colores Huntrix: Fucsia, Cian, Amarillo
      const coloresNeon = ['rgba(217, 70, 239, 0.8)', 'rgba(34, 211, 238, 0.8)', 'rgba(250, 204, 21, 0.8)'];
      const colorRandom = coloresNeon[Math.floor(Math.random() * coloresNeon.length)];
      // drop-shadow es lo que permite que el brillo siga la forma del PNG (la nota) y no sea un cuadrado
      img.style.filter = `drop-shadow(0 0 8px ${colorRandom}) brightness(1.2)`;
      // ------------------------------------
      
      // 5. Velocidad Aleatoria
      const duracion = 6 + Math.random() * 10; 
      img.style.animation = `caer-y-rotar ${duracion}s linear infinite`;
      
      // 6. Agregar al DOM
      contenedorLluvia.value.appendChild(img);

      // 7. Limpieza
      setTimeout(() => {
          if (img && img.parentNode) {
              img.parentNode.removeChild(img);
          }
      }, duracion * 1000);
  }

  // --- LIFECYCLE HOOKS ---
  onMounted(() => {
    document.title = `Cumpleaños de ${props.datos.nombre}`
    document.body.classList.add('scroll-kids-pop-purple')

    // INICIAR LA LLUVIA
    // Creamos una gota cada 600ms (ajusta esto para más o menos lluvia)
    intervaloLluvia = setInterval(crearGotaImagen, 600);
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-kids-pop-purple')
    if (intervaloLluvia) clearInterval(intervaloLluvia);
    // Limpiar el contenedor
    if (contenedorLluvia.value) contenedorLluvia.value.innerHTML = '';
  })

  // ... Resto de tu código (Generador, Admin, UrlActual) ...
  const showGenerador = ref(false)
  const esAdmin = computed(() => route.query.admin === 'true' || props.datos.esDemo)
  const urlActual = computed(() => typeof window !== 'undefined' ? window.location.href : '')
</script>

<template>
  <div class="min-h-screen bg-purple-50 text-slate-800 font-fredoka overflow-x-hidden selection:bg-fuchsia-200 selection:text-fuchsia-700">
    <Navbar />
    <header class="relative h-screen min-h-screen w-full overflow-hidden flex items-center justify-center">

      <div ref="contenedorLluvia" class="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden"></div>

      <div class="absolute inset-0 z-0 bg-slate-950">
         <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse-slow"
          :style="{ backgroundImage: `url('/assets/infantil/bg-huntrix.png')` }"
        >
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-slate-900/80 to-slate-950/90"></div>

        <div class="absolute inset-0 z-30 pointer-events-none overflow-hidden">
    
    <div class="spotlight left-[-5%] bg-gradient-to-t from-cyan-400 via-cyan-500/40 to-transparent" 
         style="animation: spotlight-sweep 6s infinite ease-in-out alternate;"></div>

    <div class="spotlight left-[15%] bg-gradient-to-t from-fuchsia-500 via-purple-500/40 to-transparent" 
         style="animation: spotlight-sweep 7s infinite ease-in-out alternate-reverse; animation-delay: 1s;"></div>

    <div class="spotlight left-[30%] bg-gradient-to-t from-white via-yellow-200/30 to-transparent" 
         style="animation: spotlight-sweep 8s infinite ease-in-out alternate; animation-delay: 2s;"></div>

    <div class="spotlight right-[30%] bg-gradient-to-t from-cyan-400 via-blue-500/40 to-transparent" 
         style="animation: spotlight-sweep 6.5s infinite ease-in-out alternate-reverse; animation-delay: 0.5s;"></div>

    <div class="spotlight right-[15%] bg-gradient-to-t from-fuchsia-500 via-pink-500/40 to-transparent" 
         style="animation: spotlight-sweep 7.5s infinite ease-in-out alternate; animation-delay: 1.5s;"></div>

    <div class="spotlight right-[-5%] bg-gradient-to-t from-purple-500 via-violet-500/40 to-transparent" 
         style="animation: spotlight-sweep 5.5s infinite ease-in-out alternate-reverse;"></div>

</div>    
    
      </div>

    <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <PhMusicNotes weight="fill" class="absolute top-[10%] left-[5%] text-fuchsia-400/60 text-4xl animate-float-slow rotate-[-12deg]" />
        <PhMicrophoneStage weight="fill" class="absolute top-[30%] right-[8%] text-cyan-400/50 text-5xl animate-float-delayed rotate-[12deg]" />
        <PhMusicNotes weight="fill" class="absolute bottom-[20%] left-[15%] text-yellow-300/40 text-3xl animate-bounce-slow" />
        <PhSparkle weight="fill" class="absolute top-[15%] left-[45%] text-white/40 text-2xl animate-pulse" />
        <PhMusicNotes weight="fill" class="absolute bottom-[30%] right-[20%] text-purple-400/50 text-6xl animate-float-slow rotate-[45deg] blur-[1px]" />
    </div>
    
      <div class="absolute bottom-0 left-0 w-full md:w-3/5 h-[100%] md:h-[100%] z-10 flex items-end justify-start pointer-events-none overflow-hidden">

          <div class="absolute bottom-0 left-10 w-full h-3/4 bg-fuchsia-500/40 blur-[80px] rounded-full"></div>
      
          <img 
            src="/assets/infantil/singer-huntrix.png" 
            class="h-auto w-full object-contain object-bottom transform translate-y-20 translate-x-[0%] md:translate-x-10 md:scale-125 scale-150 origin-bottom drop-shadow-[0_0_60px_rgba(217,70,239,0.7)] filter brightness-100 contrast-110 saturate-100"
            alt="Huntrix Girls"
          />
      </div>
    
      <div class="relative z-40 w-full h-full flex flex-col md:flex-row items-center md:items-center justify-start md:justify-end px-4 pt-24 md:pt-0 md:px-12">

        <div class="hidden md:block w-1/2"></div> 
      
        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 animate-fade-in-up md:-ml-20">

          <div class="min-h-[3rem] mb-2 w-full flex items-center justify-center md:justify-start">
          
            <transition name="fade" mode="out-in" type="transition">

              <div v-if="esMagico && nombreInvitado" key="vip" class="animate-bounce-slow">
                  <div class="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-8 py-2 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.6)] border-2 border-white/80 transform rotate-[-2deg]">
                      <p class="font-bold text-sm uppercase tracking-wider flex items-center gap-2 drop-shadow-md">
                          <PhCrown weight="fill" class="text-yellow-300 animate-pulse" /> Para {{ nombreInvitado }}
                      </p>
                  </div>
              </div>

              <div v-else-if="esArcoiris" key="upgrade">
                  <p class="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white bg-slate-900/60 backdrop-blur-md px-5 py-2 rounded-full border border-fuchsia-500/30 shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:scale-105 transition-transform cursor-pointer">
                      <PhLockKey weight="fill" class="text-fuchsia-400 text-sm" />
                      Personaliza con el <span class="text-cyan-300 font-black uppercase tracking-wide">Plan Mágico</span>
                  </p>
              </div>

            </transition>
        </div>

            <div class="relative group mb-4">
            <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 rounded-full blur-2xl opacity-70 animate-pulse"></div>
            
            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full p-[4px] bg-gradient-to-tr from-white via-cyan-300 to-fuchsia-500 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <div class="w-full h-full rounded-full overflow-hidden border-2 border-white/80 bg-slate-800">
                    <img :src="datos.fotoPortada" class="w-full h-full object-cover filter brightness-110 contrast-110" />
                </div>
            </div>

            <div v-if="esMagico" class="absolute -bottom-2 -right-4 bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-sm border-2 border-white shadow-[0_0_15px_rgba(250,204,21,0.6)] transform -rotate-6 z-20">
                VIP ACCESS
            </div>
        </div>
      
        <div class="relative">
            <div class="inline-block bg-fuchsia-600/40 backdrop-blur-md border border-fuchsia-400/60 px-5 py-1.5 rounded-full mb-2 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                  <p class="font-pacifico text-lg text-yellow-300 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">¡Mis 5 añitos!</p>
            </div>

            <div class="relative">
                <h1 class="absolute inset-0 text-6xl md:text-8xl font-black text-fuchsia-600 blur-lg opacity-100 uppercase leading-[0.85] tracking-tighter select-none">
                    {{ datos.nombre }}
                </h1>
                
                <h1 class="relative z-10 text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-cyan-100 uppercase leading-[0.85] tracking-tighter filter drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]">
                    {{ datos.nombre }}
                </h1>
            </div>
          
            <div class="flex items-center justify-center md:justify-start gap-4 mt-4">
                <div class="h-[3px] w-10 bg-cyan-400 shadow-[0_0_15px_cyan] rounded-full"></div>
                <p class="text-cyan-300 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Huntrix World Tour</p>
                <div class="h-[3px] w-10 bg-cyan-400 shadow-[0_0_15px_cyan] rounded-full"></div>
            </div>
        </div>
      
        <div class="relative z-30 mb-32 md:mb-0 bg-slate-900/60 backdrop-blur-xl border border-white/30 rounded-2xl p-1 flex items-stretch shadow-[0_0_25px_rgba(139,92,246,0.3)] mt-6 hover:border-cyan-400/80 hover:bg-slate-800/80 transition-all duration-300 group cursor-default">
    
    <div class="bg-white text-slate-900 px-5 py-2 rounded-xl flex flex-col justify-center items-center min-w-[75px] shadow-inner">
        <span class="text-3xl font-black leading-none group-hover:scale-110 transition-transform">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric' }) }}</span>
        <span class="text-[9px] font-bold uppercase tracking-wider">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'short' }) }}</span>
    </div>
    
    <div class="px-6 py-2 flex flex-col justify-center text-left">
        <span class="text-white font-mono font-bold text-sm tracking-tight drop-shadow-md">
            {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
        </span>
        <span class="text-fuchsia-300 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Show
        </span>
    </div>
</div>
          
        </div>
      </div>
    </header>

    <section class="py-20 relative bg-white border-y-4 border-dashed border-purple-200 overflow-hidden"> 

        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style="background-image: radial-gradient(#d8b4fe 1px, transparent 1px); background-size: 20px 20px;">
        </div>
      
        <div class="relative z-10 text-center space-y-10 px-6 max-w-4xl mx-auto mt-8">

          <div class="relative inline-block max-w-2xl">

              <div class="absolute -top-20 -right-4 md:-top-10 md:-right-24 w-32 h-32 md:w-44 md:h-44 z-20 animate-bounce-slow transform hover:scale-110 transition-transform duration-300">
                 <ImagenSegura 
                    src="/assets/infantil/huntrix-chibi.png" 
                    clase="w-full h-full object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] filter brightness-110" 
                 />
                 <div class="absolute -top-2 -left-4 bg-white text-fuchsia-600 text-[10px] font-black px-2 py-1 rounded-full border border-fuchsia-200 shadow-sm rotate-[-10deg]">
                    ¡Falta poco!
                 </div>
              </div>
            
              <div class="relative px-10 py-8 bg-fuchsia-50/80 backdrop-blur-sm rounded-[2.5rem] border-4 border-fuchsia-200 shadow-[8px_8px_0px_rgba(232,121,249,0.3)]">
                 <PhQuotes weight="fill" class="absolute -top-5 -left-4 text-fuchsia-400 text-5xl transform -scale-x-100 bg-white rounded-full p-1 border-2 border-fuchsia-100" />

                 <p class="font-pacifico text-2xl md:text-4xl text-fuchsia-600 leading-relaxed rotate-[-1deg] drop-shadow-sm">
                   "{{ datos.frase }}"
                 </p>

                 <PhQuotes weight="fill" class="absolute -bottom-5 -right-4 text-fuchsia-400 text-5xl bg-white rounded-full p-1 border-2 border-fuchsia-100" />
              </div>
          </div>
        
          <div class="space-y-6">
              <div class="flex items-center justify-center gap-3">
                 <PhLightning weight="fill" class="text-yellow-400 text-3xl animate-pulse" />
                 <p class="font-black text-sm md:text-lg text-purple-900 uppercase tracking-[0.2em] bg-purple-100 px-4 py-1 rounded-full">
                   El concierto comienza en
                 </p>
                 <PhLightning weight="fill" class="text-yellow-400 text-3xl animate-pulse" />
              </div>
            
              <div class="flex justify-center pb-4">
                <CuentaRegresiva 
                  :fechaObjetivo="datos.fecha"
                  colorCaja="bg-slate-900 shadow-[0_10px_20px_rgba(147,51,234,0.4)] rounded-2xl border-2 border-cyan-400 w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300"
                  colorNumero="text-white font-black text-2xl md:text-4xl leading-none font-mono"
                  colorEtiqueta="text-cyan-300 text-[8px] md:text-[10px] uppercase font-bold mt-1 tracking-widest"
                  colorSegundos="text-fuchsia-400 font-black text-2xl md:text-4xl leading-none font-mono"
                />
              </div>
          </div>
        
        </div>
    </section>

    <section class="py-24 px-4 bg-purple-50 relative overflow-hidden">
      
      <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-200 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-50"></div>

      <div class="absolute top-10 left-10 text-fuchsia-300 animate-spin-slow">
         <PhStar weight="fill" size="32" />
      </div>

      <div class="max-w-4xl mx-auto relative z-10">
         
         <div class="text-center mb-16 relative">
            <h2 class="font-black text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 uppercase tracking-tight transform -rotate-2 drop-shadow-sm">
               Team Huntrix
            </h2>
            <div class="w-32 h-2 bg-yellow-300 mx-auto mt-2 rounded-full transform rotate-1"></div>
         </div>

         <div class="grid gap-12" :class="datos.padrinos ? 'md:grid-cols-2' : 'grid-cols-1 max-w-lg mx-auto'">
            
            <div class="bg-white rounded-3xl p-8 text-center border-4 border-fuchsia-400 shadow-[8px_8px_0px_rgba(232,121,249,0.4)] hover:-translate-y-2 transition-transform duration-300 relative group">
               
               <div class="absolute -top-16 -right-8 w-32 h-32 z-20 animate-float-slow transform group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/assets/infantil/bobby-huntrix.png" 
                    class="w-full h-full object-contain drop-shadow-xl transform rotate-12" 
                    alt="Bobby Huntrix Manager"
                  />
                  <div class="absolute -bottom-2 -left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full -rotate-6 shadow-md border-2 border-white">
                     The Boss!
                  </div>
               </div>
               <div class="absolute -top-5 -left-5 bg-yellow-300 p-2.5 rounded-full border-2 border-black rotate-[-12deg] shadow-md z-10">
                 <PhHeart weight="fill" size="24" class="text-red-600" />
               </div>

               <h3 class="font-black text-2xl text-fuchsia-500 mb-6 uppercase tracking-wide">Mis Managers</h3>
               
               <div class="space-y-2 relative z-10">
                 <p class="font-fredoka font-bold text-slate-800 text-2xl">{{ datos.padres.padre }}</p>
                 <div class="flex items-center justify-center gap-2 opacity-50">
                    <div class="h-[1px] w-10 bg-slate-400"></div>
                    <PhHeart weight="fill" class="text-fuchsia-400 text-xs" />
                    <div class="h-[1px] w-10 bg-slate-400"></div>
                 </div>
                 <p class="font-fredoka font-bold text-slate-800 text-2xl">{{ datos.padres.madre }}</p>
               </div>
            </div>

            <div v-if="datos.padrinos" class="bg-white rounded-3xl p-8 text-center border-4 border-cyan-400 shadow-[8px_8px_0px_rgba(34,211,238,0.4)] hover:-translate-y-2 transition-transform duration-300 relative mt-8 md:mt-0">
               
               <div class="absolute -top-5 -right-5 bg-purple-600 p-2.5 rounded-full border-2 border-black rotate-[12deg] shadow-md z-10">
                 <PhStar weight="fill" size="24" class="text-yellow-300" />
               </div>

               <h3 class="font-black text-2xl text-cyan-500 mb-6 uppercase tracking-wide">Productores</h3>
               
               <div class="relative z-10 flex flex-col items-center justify-center h-full min-h-[80px]">
                   <p class="font-fredoka font-bold text-slate-700 text-xl px-4 leading-relaxed">
                     {{ datos.padrinos.nombres }}
                   </p>
               </div>
               
               <PhMusicNotes weight="fill" class="absolute bottom-4 right-4 text-cyan-100 text-4xl -rotate-12" />
            </div>

         </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
      
      <div 
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none mix-blend-luminosity md:mix-blend-overlay"
        style="background-image: url('/assets/infantil/bg-huntrix2.jpg');"
      ></div>
      <div class="absolute top-0 left-1/4 w-24 h-full bg-fuchsia-500/20 blur-xl transform -skew-x-12 z-0"></div>
      <div class="absolute top-0 right-1/4 w-24 h-full bg-purple-500/20 blur-xl transform skew-x-12 z-0"></div>

      <div class="max-w-4xl mx-auto space-y-10 text-center relative z-10">
        
        <div class="inline-block relative mb-8">
           <PhMicrophoneStage weight="fill" class="absolute -top-8 -left-8 text-cyan-400 text-6xl animate-bounce-slow" />
           <h2 class="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-fredoka uppercase drop-shadow-md">
             El Escenario
           </h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 items-stretch">
          
          <div class="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-700 relative overflow-hidden group hover:border-fuchsia-500 transition-colors">
            <div class="absolute top-[-20px] left-[-20px] w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity">
                <PhMusicNotes weight="fill" class="w-full h-full text-fuchsia-500" />
            </div>

            <div class="relative z-10">
              <div class="w-12 h-12 mx-auto bg-fuchsia-500 rounded-full flex items-center justify-center mb-4 text-white">
                 <PhCalendarCheck weight="fill" size="24" />
              </div>
              
              <p class="font-bold text-2xl capitalize text-white mb-2">
                 {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long' }) }}
              </p>
              <div class="text-5xl font-black text-fuchsia-400 mb-2">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric' }) }}
              </div>
              <p class="text-xl font-bold uppercase text-slate-400 mb-4">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'long' }) }}
              </p>

              <div class="inline-block bg-slate-900 px-4 py-2 rounded-lg border border-slate-600">
                 <p class="text-xl font-mono text-yellow-300 font-bold">
                   {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }} hrs
                 </p>
              </div>

              <a v-if="esArcoiris" :href="datos.linkCalendario" target="_blank" class="block mt-6 text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 hover:underline cursor-pointer">
                + Add to Tour Dates
              </a>
            </div>
          </div>

          <div class="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-700 relative overflow-hidden group hover:border-cyan-500 transition-colors">
             <div class="w-full h-32 mb-4 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-600">
                <ImagenSegura src="/assets/infantil/mapa-huntrix.jpeg" clase="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                <div class="absolute inset-0 flex items-center justify-center">
                   <PhMapPin weight="fill" class="text-cyan-400 text-4xl animate-bounce" />
                </div>
             </div>

             <h3 class="font-black text-2xl text-white mb-2">{{ datos.ubicacion.nombreLugar }}</h3>
             <p class="text-slate-400 text-sm mb-6 leading-relaxed">
               {{ datos.ubicacion.direccion }}
             </p>
             
             <BotonAccion 
               texto="Ver Ubicación" 
               :icono="PhMapPin" 
               :url="datos.ubicacion.linkGps" 
               color="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 border-none shadow-lg hover:shadow-cyan-500/50 rounded-xl font-black py-3 uppercase tracking-wide text-sm transition-all" 
             />
          </div>

        </div>

      </div>
    </section>

    <div v-if="!esArcoiris" class="bg-purple-100 py-6 text-center">
       <div class="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-purple-200">
          <PhLockKey weight="duotone" class="text-purple-400 text-lg" />
          <span class="text-sm font-bold text-slate-600">Descubre el Setlist con el <strong class="text-fuchsia-500">Plan Arcoíris</strong></span>
       </div>
    </div>

    <section v-if="esArcoiris && datos.agenda" class="py-20 px-4 bg-slate-950 relative overflow-hidden">
      
      <div class="absolute top-0 right-0 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <PhMicrophoneStage weight="fill" class="absolute top-10 left-5 text-cyan-500/20 text-6xl rotate-12 animate-pulse" />
      <PhMusicNotes weight="fill" class="absolute bottom-20 right-5 text-fuchsia-500/20 text-7xl -rotate-12 animate-bounce-slow" />

      <div class="max-w-2xl mx-auto relative z-10">
        
        <div class="text-center mb-16 relative">
            <h2 class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 uppercase tracking-tighter transform -rotate-2 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
               El Setlist
            </h2>
            <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto mt-2 shadow-[0_0_10px_cyan]"></div>
            
            <div class="absolute -top-6 -right-4 md:right-20 bg-yellow-300 text-slate-900 text-[10px] font-black px-2 py-1 rotate-12 rounded-sm shadow-lg">
               OFFICIAL SCHEDULE
            </div>
        </div>

        <CronogramaInfantil 
          :eventos="datos.agenda"
          colorPunto="bg-slate-950 border-none" 
          colorCardBg="bg-slate-900/80 backdrop-blur-md border border-fuchsia-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-cyan-400/50 transition-colors text-white"
          colorIcono="text-yellow-300 drop-shadow-sm"
          colorHora="text-slate-900 font-black text-2xl font-mono"
          tamanoCirculo="w-14 h-14"
        />
        
        <div class="text-center mt-12 opacity-50">
           <p class="text-[10px] text-cyan-200 uppercase tracking-[0.4em] animate-pulse">
              *** Don't miss the show ***
           </p>
        </div>

      </div>
  </section>

    <section v-if="esArcoiris && datos.galeria" class="py-20 px-4 bg-white relative overflow-hidden">
      
      <div class="absolute top-0 right-0 w-80 h-80 bg-fuchsia-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <PhImages weight="duotone" class="absolute top-10 left-4 text-fuchsia-200 text-6xl rotate-[-12deg] opacity-50 animate-pulse-slow" />
      <PhStar weight="fill" class="absolute bottom-20 right-4 text-cyan-200 text-5xl rotate-[12deg] opacity-50 animate-spin-slow" />

      <div class="max-w-[1200px] mx-auto text-center relative z-10">
        
        <div class="mb-16">
          <h2 class="text-4xl md:text-5xl font-black mb-2 font-pacifico text-fuchsia-500 drop-shadow-sm">Mis Aventuras</h2>
          <div class="w-24 h-1.5 bg-cyan-200 mx-auto rounded-full rotate-[-2deg]"></div>
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
              class="bg-white p-3 pb-10 shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:z-20 relative border border-slate-50"
              :class="index % 2 === 0 ? 'rotate-[-2deg] hover:rotate-0' : 'rotate-[2deg] hover:rotate-0'"
            >
              
              <div 
                 class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-fuchsia-200/40 backdrop-blur-sm z-10 shadow-sm"
                 :class="index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'"
              ></div>

              <div class="aspect-square w-full overflow-hidden bg-slate-100 border border-slate-100">
                <ImagenSegura 
                  :src="obtenerUrlFoto(foto)" 
                  clase="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div v-if="obtenerDescFoto(foto)" class="absolute bottom-2 left-0 w-full text-center px-2">
                  <p class="font-pacifico text-fuchsia-500 text-lg leading-none truncate opacity-80 group-hover:opacity-100 transition-opacity">
                    {{ obtenerDescFoto(foto) }}
                  </p>
              </div>

              <div class="absolute -bottom-4 -right-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <PhStar weight="fill" size="32" class="drop-shadow-md" />
              </div>

            </div>
          </div>

        </div>

        <div v-if="!esMagico && datos.galeria.length > 6" class="mt-12">
           <div class="inline-block relative group">
             <div class="absolute inset-0 bg-fuchsia-200 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <p class="relative bg-white text-fuchsia-500 text-sm font-bold px-6 py-3 rounded-full border-2 border-fuchsia-100 shadow-sm flex items-center gap-2">
               <PhImages weight="bold" />
               + {{ datos.galeria.length - 6 }} fotitos más en el Plan Mágico
             </p>
           </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 bg-purple-50 relative overflow-hidden">

      <div class="absolute inset-0 z-0 opacity-30" 
           style="background-image: radial-gradient(#d946ef 1.5px, transparent 1.5px); background-size: 25px 25px;">
      </div>
    
      <div class="max-w-5xl mx-auto relative z-10">
        <div v-if="datos.regalos" class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

          <div class="w-full md:w-1/2 max-w-[350px] animate-float-slow">
            <div class="relative">
              <div class="absolute inset-0 bg-fuchsia-400 blur-3xl opacity-20 rounded-full"></div>

              <img 
                src="/assets/infantil/huntrix-gift.png" 
                class="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(217,70,239,0.3)] transform -rotate-3 hover:rotate-0 transition-transform duration-500" 
                alt="Huntrix Girls"
              />
            </div>
          </div>
        
          <div class="w-full md:w-1/2 max-w-md">
            <div class="bg-white rounded-[2.5rem] p-8 md:p-10 text-center shadow-[0_20px_50px_-15px_rgba(217,70,239,0.3)] border-t-8 border-fuchsia-500 relative overflow-hidden">

              <div class="inline-flex items-center gap-2 bg-fuchsia-100 px-4 py-1.5 rounded-full mb-6 border border-fuchsia-200">
                <PhCrown weight="fill" class="text-fuchsia-500 text-xs" />
                <span class="text-fuchsia-600 text-[10px] font-black uppercase tracking-[0.2em]">Merch & Gifts</span>
              </div>

              <h3 class="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
                Mesa de <span class="text-fuchsia-500">Regalos</span>
              </h3>

              <p class="text-slate-500 text-base mb-8 font-medium leading-relaxed">
                ¡Tu presencia es mi mayor regalo! 💖<br>
                <span class="text-sm italic block mt-2 text-slate-400">Si deseas enviarme un detalle, aquí tienes mis opciones oficiales.</span>
              </p>
            
              <button 
                @click="modalRegalosOpen = true"
                class="group relative w-full overflow-hidden px-8 py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-fuchsia-200"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-fuchsia-600"></div>

                <div class="relative flex items-center justify-center gap-4">
                  <PhGift weight="fill" class="text-2xl" />
                  <span class="drop-shadow-md">Abrir Opciones</span>
                </div>
              </button>
            
              <div class="mt-8 flex items-center gap-2 justify-center opacity-20">
                 <div class="h-2 w-2 rounded-full bg-slate-400"></div>
                 <div class="h-[1px] flex-1 border-t-2 border-dashed border-slate-400"></div>
                 <div class="h-2 w-2 rounded-full bg-slate-400"></div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section>

    <footer class="bg-slate-950 text-white py-24 px-4 text-center relative z-20 overflow-hidden border-t-8 border-fuchsia-600">
        
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-fuchsia-900/20 to-slate-950"></div>
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
            <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[100px]"></div>
        </div>
      
        <div class="max-w-md mx-auto space-y-12 relative z-10">
          
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 bg-slate-900 border-2 border-fuchsia-500 px-4 py-1.5 rounded-md shadow-[0_0_15px_rgba(217,70,239,0.3)] rotate-[-1deg]">
               <span class="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
               <p class="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">Final Show RSVP</p>
            </div>
            
            <h3 class="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              ¡Te <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Esperamos</span>!
            </h3>
            
            <p class="text-slate-400 text-base px-6 leading-relaxed">
              Confirma tu asistencia para asegurar tu pase VIP en esta gira inolvidable. 🎤✨
            </p>
            
            <div class="px-4">
                <BotonAccion 
                  texto="Confirmar Asistencia" 
                  :icono="PhWhatsappLogo" 
                  :url="`https://wa.me/${datos.contacto.whatsapp}?text=${encodeURIComponent('¡Hola! 🎤 Confirmo mi asistencia al cumple de ' + datos.nombre + '. \n\nNombre: \nCantidad: ')}`" 
                  color="bg-[#25D366] text-white w-full justify-center rounded-2xl shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 font-black py-5 text-xl transition-all border-none uppercase tracking-widest" 
                />
            </div>
          </div>
        
          <div class="pt-12 border-t border-slate-800/60 flex flex-col items-center gap-6">
             <div class="flex items-center gap-4 opacity-40">
                <div class="h-[1px] w-8 bg-slate-600"></div>
                <PhStar weight="fill" size="16" class="text-slate-500" />
                <div class="h-[1px] w-8 bg-slate-600"></div>
             </div>
           
             <div class="space-y-4">
                <p class="text-[9px] font-bold text-slate-600 uppercase tracking-[0.5em]">
                  Huntrix Official Tour 2026
                </p>
                
                <a href="#" class="group relative inline-flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-6 py-2.5 rounded-full transition-all hover:border-fuchsia-500/50">
                  <span class="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">Digital Design by</span>
                  <span class="font-black uppercase tracking-widest text-sm text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Yupa Studio</span>
                </a>
             </div>
          </div>
        
        </div>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-purple-600 border-2 border-fuchsia-400 shadow-xl shadow-purple-500/40 animate-bounce-slow hover:bg-purple-500"
      colorIcono="text-white"
      clasesTamano="w-14 h-14"
      :tamanoIcono="24"
      grosorOnda="4px"
    />

    <ModalRegalosInfantil 
      :isOpen="modalRegalosOpen"
      :listaRegalos="datos.regalos || []" 
      
      colorHeader="bg-purple-100 border-purple-200"
      colorTitulo="text-purple-600"
      colorSubtitulo="text-fuchsia-500"
      colorPestanaActiva="text-purple-600"
      colorBarraPestana="bg-fuchsia-500"
      colorBotonActivo="bg-slate-900 text-white"
      colorIconoBanco="bg-purple-100 text-purple-500"
      colorBordeLateral="border-fuchsia-400"
      colorBotonCopiar="bg-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-200"
      colorTextoDestacado="text-purple-600"
      colorBordeDashed="border-purple-300"
      colorFondoOverlay="bg-slate-900/80"

      @close="modalRegalosOpen = false"
    />

    <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
      <div v-if="fotoEnGrande" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" @click="cerrarFoto">
        <button class="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" @click.stop="cerrarFoto">
          <PhX size="32" weight="bold" />
        </button>
        <img :src="fotoEnGrande" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl border-2 border-slate-700" @click.stop />
      </div>
    </Transition>

    <DemoSwitcherInfantil v-if="datos.esDemo" @cambioPlan="actualizarPlan" />

    <div v-if="esAdmin && esMagico" class="fixed bottom-24 left-4 z-[90]">
       <button 
         @click="showGenerador = true"
         class="bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl shadow-fuchsia-500/50 flex items-center gap-3 border-2 border-fuchsia-500 hover:scale-105 transition-transform group"
       >
          <div class="bg-fuchsia-500 rounded-full p-1 group-hover:animate-spin-slow">
             <PhMagicWand weight="fill" />
          </div>
          <div class="text-left leading-none pr-2">
             <p class="text-[9px] text-fuchsia-200 font-bold uppercase tracking-wider">Modo Anfitrión</p>
             <p class="text-sm font-bold">Crear Invitación</p>
          </div>
       </button>
    </div>

    <ModalGeneradorLinks 
       :isOpen="showGenerador"
       :urlBase="urlActual"
       :nombreFestejado="datos.nombre"
       
       tipoEvento="infantil" 
       colorHeader="bg-gradient-to-r from-purple-600 to-fuchsia-500" 
       @close="showGenerador = false"
    />

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;700;900&family=Pacifico&display=swap');

.font-fredoka { font-family: 'Fredoka', sans-serif; }
.font-pacifico { font-family: 'Pacifico', cursive; }

/* Animaciones Personalizadas */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
.animate-float-slow { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }

.animate-bounce-slow { animation: bounce 3s infinite; }
.animate-spin-slow { animation: spin 8s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }

/* Wigle para stickers */
@keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
.animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
</style>

<style>
/* SCROLLBAR VIBRANTE */
body.scroll-kids-pop-purple::-webkit-scrollbar { width: 12px; }
body.scroll-kids-pop-purple::-webkit-scrollbar-track { background: #f3e8ff; } 
body.scroll-kids-pop-purple::-webkit-scrollbar-thumb { 
  background-color: #a855f7; 
  border-radius: 10px; 
  border: 3px solid #f3e8ff;
}
</style>

<style>
@keyframes spotlight-left {
  0%, 100% { transform: rotate(-15deg); opacity: 0.3; }
  50% { transform: rotate(5deg); opacity: 0.6; }
}

@keyframes spotlight-right {
  0%, 100% { transform: rotate(15deg); opacity: 0.3; }
  50% { transform: rotate(-5deg); opacity: 0.6; }
}

.animate-spotlight-left {
  animation: spotlight-left 6s infinite ease-in-out;
}

.animate-spotlight-right {
  animation: spotlight-right 7s infinite ease-in-out;
}
</style>

<style>
/* Animación mejorada: Caída + Rotación + Desaparición Suave */
@keyframes caer-y-rotar {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 1; /* Aparece rápido arriba */
  }
  80% {
    opacity: 1; /* Se mantiene visible casi todo el trayecto */
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0; /* <--- AQUÍ ESTÁ EL TRUCO: Se vuelve transparente al llegar abajo */
  }
}

.gota-img {
  position: absolute;
  top: -100px;
  user-select: none;
  pointer-events: none;
  /* El filtro base lo pondremos dinámico en el JS, pero aquí aseguramos la transición */
  will-change: transform, opacity;
}

/* Animación para los reflectores (Spotlights) */
@keyframes spotlight-sweep {
  0% { transform: rotate(-35deg) scaleY(1); opacity: 0.3; }
  50% { transform: rotate(0deg) scaleY(1.2); opacity: 0.7; } /* Brillan más al centro */
  100% { transform: rotate(35deg) scaleY(1); opacity: 0.3; }
}

.spotlight {
  position: absolute;
  bottom: -20%; /* Nacen desde abajo de la pantalla */
  width: 15%;   /* Ancho del haz de luz */
  height: 160%; /* Muy largos para llegar arriba */
  transform-origin: bottom center; /* Giran desde la base */
  filter: blur(20px); /* Suavizado para parecer luz */
  pointer-events: none;
  mix-blend-mode: screen; /* CLAVE: Se funde con el fondo como luz real */
}
</style>