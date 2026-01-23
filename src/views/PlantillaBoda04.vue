// Plantilla Gala Ligth Korean style

<script setup>
  import { PhMapPin, PhCalendarCheck, PhGift, PhSparkle, PhHeart, PhWhatsappLogo } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos from '../components/ModalRegalos.vue'
  import Cronograma from '../components/Cronograma.vue'
  import CodigoVestimenta from '../components/CodigoVestimenta.vue'
  import GaleriaFotos from '../components/GaleriaFotos.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'
  import MenuNavegacion from '../components/MenuNavegacion.vue'

  const props = defineProps({ datos: { type: Object, required: true } })
  const modalAbierto = ref(false)
  const esGold = computed(() => ['gold', 'premium'].includes(props.datos.plan))
  const esPremium = computed(() => props.datos.plan === 'premium')
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)
  const galeriaAbierta = ref(false)

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombres 
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
    }, 100)
  }

  onMounted(() => {
    document.body.classList.add('scroll-korean') // Scrollbar minimalista
    document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-korean')
    document.title = 'Yupa Studio' 
  })
</script>

<template>
  <div class="min-h-screen bg-white text-stone-900 overflow-x-hidden font-sans font-light">

    <header class="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      <div class="absolute inset-0 z-0">
         <img :src="datos.fotoPortada" class="w-full h-full object-cover grayscale-[10%] contrast-[1.05]" />
         <div class="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div> <div class="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </div>

      <div class="petalos-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <img v-for="n in 15" :key="n" src="/assets/petalo.png" class="petalo absolute" alt="pétalo" />
      </div>

      <div class="relative z-20 space-y-6 px-6 border-y border-stone-800/80 py-12 max-w-sm mx-auto">
         <p class="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-600">Nos Casamos</p>
         <h1 class="font-elegante text-5xl md:text-7xl text-stone-900 leading-none">{{ nombreMostrado }}</h1>
         <div class="w-[1px] h-12 bg-stone-800 mx-auto"></div>
         <p class="text-xl tracking-[0.2em] uppercase font-medium">
           {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
         </p>
      </div>
    </header>

    <section class="py-24 px-8 text-center max-w-2xl mx-auto relative">
       <PhSparkle :size="32" class="mx-auto text-stone-400 mb-6 animate-pulse" weight="thin" />
       <p class="font-serif text-2xl md:text-3xl italic text-stone-600 leading-relaxed">
         "{{ datos.frase }}"
       </p>
    </section>

    <section class="py-16 border-y border-stone-100 bg-white">
       <div class="text-center mb-8">
          <p class="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Tiempo Restante</p>
       </div>

       <CuentaRegresiva 
         :fechaObjetivo="datos.fecha" 
         colorCaja="bg-[#F5F5F4] rounded-2xl w-20 md:w-24 py-4 mx-1 md:mx-2 border border-stone-100"
         colorNumero="text-stone-800 font-normal text-3xl md:text-4xl"
         colorEtiqueta="text-stone-500 uppercase text-[10px] tracking-widest mt-1 font-medium"
         colorSegundos="text-stone-600" 
       />
    </section>

    <section class="py-24 px-4">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
         
         <div class="w-full md:w-1/2 aspect-[4/5] relative p-3 border border-stone-200">
            <img :src="datos.fotoSegunda" class="w-full h-full object-cover grayscale-[10%]" />
            <div class="absolute -bottom-6 -right-6 bg-white p-6 border border-stone-100 shadow-xl max-w-[200px] text-left hidden md:block">
               <p class="font-elegante text-2xl">Ceremonia</p>
               <p class="text-xs text-stone-400 uppercase tracking-wide">Religiosa</p>
            </div>
         </div>

         <div class="w-full md:w-1/2 space-y-10 text-center md:text-left pl-0 md:pl-8">
            
            <div>
               <h2 class="font-elegante text-5xl text-stone-900 mb-4">Ceremonia</h2>
               <p class="text-stone-500 font-light leading-relaxed max-w-md mx-auto md:mx-0">
                  Tenemos el honor de invitarlos a celebrar nuestra unión matrimonial, la cual se llevará a cabo en:
               </p>
            </div>
            
            <div class="space-y-10">
               
               <div class="flex flex-col md:flex-row gap-5 items-center md:items-start">
                  <div class="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center shrink-0 border border-stone-100">
                     <PhMapPin :size="24" weight="light" class="text-stone-800" />
                  </div>
                  <div class="w-full">
                     <p class="text-xl font-serif mb-1">{{ datos.ubicacion.nombreLugar }}</p>
                     <p class="text-stone-500 font-light text-sm mb-4">{{ datos.ubicacion.direccion }}</p>
                     
                     <div class="flex justify-center md:justify-start">
                        <BotonAccion 
                           texto="Ver Mapa" 
                           :icono="PhMapPin" 
                           :url="datos.ubicacion.linkGps" 
                           color="bg-white border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300 rounded-none px-8 py-2 text-xs uppercase tracking-widest shadow-sm" 
                        />
                     </div>
                  </div>
               </div>

               <div class="w-full h-[1px] bg-stone-100"></div>

               <div class="flex flex-col md:flex-row gap-5 items-center md:items-start">
                  <div class="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center shrink-0 border border-stone-100">
                     <PhCalendarCheck :size="24" weight="light" class="text-stone-800" />
                  </div>
                  <div class="w-full">
                     <p class="text-xl font-serif mb-1 capitalize">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
                     <p class="text-stone-500 font-light text-sm mb-4">Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}</p>
                     
                     <div class="flex justify-center md:justify-start">
                        <BotonAccion 
                           texto="Agendar" 
                           :icono="PhCalendarCheck" 
                           :url="datos.linkCalendario" 
                           color="bg-white border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300 rounded-none px-8 py-2 text-xs uppercase tracking-widest shadow-sm" 
                        />
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </section>

    <section v-if="esGold" class="py-16 bg-stone-50">
       <div class="max-w-3xl mx-auto px-4">
          <Cronograma 
             v-if="datos.agenda" 
             :eventos="datos.agenda" 
             colorTitulo="text-stone-900 font-elegante"
             colorLinea="border-stone-300"
             colorPunto="bg-stone-800 border-white"
             colorCardBg="bg-white border-none shadow-sm"
             colorHora="text-stone-500 font-medium"
             colorIcono="text-stone-400"
             colorTexto="text-stone-600 font-light"
           />
           
           <div class="my-16"></div>

           <CodigoVestimenta 
             v-if="datos.vestimenta" 
             :tipo="datos.vestimenta.tipo" 
             :nota="datos.vestimenta.nota"
             colorFondo="bg-stone-50"
             colorBorde="border-stone-300"
             colorCirculo="bg-white border border-stone-200"
             colorIcono="text-stone-900"
             colorTitulo="text-stone-900 font-elegante"
             colorResalte="text-stone-600 font-bold"
             colorNotaBg="bg-white"
             colorNotaTexto="text-stone-500 italic"
           />
       </div>
    </section>

    <GaleriaFotos 
      v-if="esGold && datos.galeria" 
      :fotos="datos.galeria" 
      colorFondo="bg-white" 
      colorIcono="text-stone-900"
      colorTitulo="text-stone-900"
      @cambioEstado="galeriaAbierta = $event"
    />

    <SeccionPadrinos 
      v-if="esPremium && datos.cortejo" 
      :padrinos="datos.cortejo"
      colorIcono="text-stone-900"
      colorTitulo="text-stone-900"
      colorTexto="text-stone-500"
    />
    
    <section class="py-24 text-center border-t border-stone-100">
       <div class="w-16 h-16 border border-stone-200 flex items-center justify-center mx-auto mb-6 rotate-45">
          <PhGift :size="48" weight="thin" class="text-stone-800 -rotate-45" />
       </div>
       <h3 class="font-elegante text-4xl mb-4">Regalo</h3>
       <p class="text-stone-500 font-light text-sm mb-8">El mejor regalo es tu presencia.</p>
       <button @click="modalAbierto = true" class="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-700 transition">
          Ver Datos Bancarios
       </button>
    </section>

    <footer class="bg-white border-t border-stone-100 text-stone-600 py-12 text-center">
       <div class="max-w-xs mx-auto w-full px-4 mb-12">
          <BotonAccion 
            texto="Confirmar Asistencia" 
            :icono="PhWhatsappLogo" 
            :url="`https://wa.me/${datos.contacto.whatsapp}`" 
            color="bg-stone-900 text-white hover:bg-stone-700 rounded-none h-14"
          />
       </div>
       <p class="text-[10px] uppercase tracking-widest opacity-40">Yupa Studio · Minimal Collection</p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-white/80 border border-stone-200 text-stone-900 backdrop-blur-sm shadow-xl"
      colorIcono="text-stone-900"
    />
    
    <ModalRegalos 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      colorAcento="text-stone-900" 
      colorBoton="bg-stone-900"
    />

    <MenuNavegacion v-show="!modalAbierto && !galeriaAbierta" />
  </div>
</template>

<style>
/* Scrollbar super fina para estilo minimalista */
body.scroll-korean::-webkit-scrollbar { width: 6px; }
body.scroll-korean::-webkit-scrollbar-track { background: #fff; }
body.scroll-korean::-webkit-scrollbar-thumb { background-color: #d6d3d1; }

/* === EFECTO PÉTALOS === */
.petalo {
  position: absolute;
  top: -10%;
  opacity: 0;
  width: 15px; /* Más pequeños que las hojas */
  animation: caerPetalo linear infinite;
}

@keyframes caerPetalo {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  50% { opacity: 1; transform: translateY(50vh) rotate(180deg) translateX(20px); }
  100% { transform: translateY(100vh) rotate(360deg) translateX(-20px); opacity: 0; }
}

/* Tiempos aleatorios para naturalidad */
.petalo:nth-child(1) { left: 10%; animation-duration: 8s; animation-delay: 0s; width: 12px; }
.petalo:nth-child(2) { left: 20%; animation-duration: 12s; animation-delay: 2s; width: 18px; filter: blur(1px); }
.petalo:nth-child(3) { left: 35%; animation-duration: 10s; animation-delay: 4s; width: 14px; }
.petalo:nth-child(4) { left: 50%; animation-duration: 14s; animation-delay: 1s; width: 10px; }
.petalo:nth-child(5) { left: 65%; animation-duration: 9s; animation-delay: 3s; width: 16px; opacity: 0.6; }
.petalo:nth-child(6) { left: 80%; animation-duration: 11s; animation-delay: 5s; width: 13px; }
.petalo:nth-child(7) { left: 90%; animation-duration: 13s; animation-delay: 0.5s; width: 15px; filter: blur(0.5px); }
.petalo:nth-child(8) { left: 5%; animation-duration: 7s; animation-delay: 1.5s; width: 11px; }
.petalo:nth-child(9) { left: 25%; animation-duration: 15s; animation-delay: 6s; width: 17px; }
.petalo:nth-child(10) { left: 45%; animation-duration: 9.5s; animation-delay: 2.5s; width: 12px; }
</style>