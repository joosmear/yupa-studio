// Pastel Dreams

<script setup>
  import { PhMapPin, PhCalendarCheck, PhGift, PhHeart, PhWhatsappLogo, PhMusicNotes } from '@phosphor-icons/vue'
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
    document.body.classList.add('scroll-pastel')
    document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-pastel')
    document.title = 'Yupa Studio' 
  })
</script>

<template>
  <div class="min-h-screen bg-[#FFF5F5] text-stone-700 overflow-x-hidden font-sans">

    <header class="relative h-screen flex flex-col justify-end pb-10 overflow-hidden">
       <div class="absolute inset-0 z-0">
          <img :src="datos.fotoPortada" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-b from-[#FFF5F5]/30 via-[#FFF5F5]/60 to-[#FFF5F5]"></div>
          <div class="absolute inset-0 bg-rose-500/10 mix-blend-screen"></div>
       </div>

       <div class="confeti-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <img v-for="n in 20" :key="n" src="/assets/petalo.png" class="confeti absolute" alt="confeti" />
       </div>

       <div class="absolute bottom-0 left-0 w-full leading-none z-10 text-[#FFF5F5]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
             <path fill="currentColor" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
       </div>

       <div class="relative z-20 text-center px-4 mb-10">
          <div class="inline-block bg-white/60 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white shadow-lg shadow-rose-100/50">
             <p class="text-xs font-bold tracking-[0.3em] uppercase text-rose-500">Nuestra Boda</p>
          </div>
          <h1 class="font-elegante text-6xl md:text-8xl text-stone-800 drop-shadow-sm mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 pb-2">
            {{ nombreMostrado }}
          </h1>
          <p class="text-xl text-stone-600 font-medium tracking-widest">
            {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
       </div>
    </header>

    <section class="py-16 px-8 text-center max-w-xl mx-auto relative z-20 -mt-10">
       <PhHeart weight="fill" class="text-rose-300 mx-auto text-3xl mb-4 animate-bounce" />
       <p class="font-serif text-2xl italic text-stone-600 leading-relaxed bg-white/50 p-6 rounded-3xl shadow-sm border border-white">
         "{{ datos.frase }}"
       </p>
    </section>

    <section class="py-10 px-4">
       <CuentaRegresiva 
         :fechaObjetivo="datos.fecha" 
         colorCaja="bg-white border-2 border-rose-100 shadow-lg rounded-2xl"
         colorNumero="text-stone-800 font-bold"
         colorEtiqueta="text-rose-400 font-bold uppercase text-[10px]"
         colorSegundos="text-rose-500" 
       />
    </section>

    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl shadow-rose-100 overflow-hidden relative border border-rose-50">
         <div class="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -z-0 opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
         
         <div class="flex flex-col md:flex-row relative z-10">
             <div class="w-full md:w-1/2 h-96 md:h-auto overflow-hidden">
                <img :src="datos.fotoSegunda" class="w-full h-full object-cover hover:scale-105 transition duration-700" />
             </div>

             <div class="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-8 text-center md:text-left">
                <h2 class="font-elegante text-4xl text-stone-800">Ceremonia</h2>
                
                <div class="space-y-6">
                   <div class="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center shrink-0 text-rose-500">
                         <PhMapPin size="24" weight="fill" />
                      </div>
                      <div>
                         <p class="font-bold text-lg text-stone-800">{{ datos.ubicacion.nombreLugar }}</p>
                         <p class="text-stone-500 text-sm">{{ datos.ubicacion.direccion }}</p>
                      </div>
                   </div>

                   <div class="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-orange-500">
                         <PhCalendarCheck size="24" weight="fill" />
                      </div>
                      <div>
                         <p class="font-bold text-lg text-stone-800 capitalize">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
                         <p class="text-stone-500 text-sm">{{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}</p>
                      </div>
                   </div>
                </div>

                <div class="flex flex-col gap-3 pt-4">
                    <BotonAccion texto="Ver Ubicación" :icono="PhMapPin" :url="datos.ubicacion.linkGps" color="bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full shadow-lg shadow-rose-200" />
                    <BotonAccion texto="Agendar" :icono="PhCalendarCheck" :url="datos.linkCalendario" color="bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 rounded-full" />
                </div>
             </div>
         </div>
      </div>
    </section>

    <section v-if="esGold" class="py-10 px-4">
       <div class="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-sm border border-white max-w-3xl mx-auto">
          <Cronograma 
            v-if="datos.agenda" 
            :eventos="datos.agenda" 
            colorTitulo="text-stone-800 font-elegante"
            colorLinea="border-rose-200"
            colorPunto="bg-gradient-to-br from-rose-300 to-orange-300 shadow-md border-white"
            colorCardBg="bg-white shadow-sm hover:shadow-md transition rounded-2xl"
            colorHora="text-rose-500 font-bold"
            colorIcono="text-orange-400"
            colorTexto="text-stone-600"
          />
       </div>

       <div class="my-16 flex justify-center">
          <div class="w-full max-w-xs h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
       </div>

       <CodigoVestimenta 
         v-if="datos.vestimenta" 
         :tipo="datos.vestimenta.tipo" 
         :nota="datos.vestimenta.nota"
         colorFondo="bg-transparent"
         colorBorde="border-rose-200"
         colorCirculo="bg-white shadow-md border border-rose-50"
         colorIcono="text-rose-400"
         colorTitulo="text-stone-800 font-elegante"
         colorResalte="text-rose-500 font-bold"
         colorNotaBg="bg-white rounded-2xl shadow-sm"
         colorNotaTexto="text-stone-500 italic"
       />
    </section>

    <GaleriaFotos 
      v-if="esGold && datos.galeria" 
      :fotos="datos.galeria" 
      colorFondo="bg-[#FFF5F5]" 
      colorIcono="text-rose-400"
      colorTitulo="text-stone-800"
      @cambioEstado="galeriaAbierta = $event"
    />

    <SeccionPadrinos 
      v-if="esPremium && datos.cortejo" 
      :padrinos="datos.cortejo"
      colorIcono="text-rose-400"
      colorTitulo="text-stone-800"
      colorTexto="text-stone-600"
    />
    
    <section class="py-24 text-center bg-white rounded-t-[4rem] relative shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
       <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <PhGift :size="32" weight="fill" class="text-white" />
       </div>
       
       <div class="mt-10">
         <h3 class="font-elegante text-4xl mb-4 text-stone-800">Regalo</h3>
         <p class="text-stone-500 mb-8 max-w-xs mx-auto">Tu presencia es el mejor regalo.</p>
         <button @click="modalAbierto = true" class="px-8 py-3 bg-rose-100 text-rose-600 font-bold rounded-full hover:bg-rose-200 transition">
            Ver Datos Bancarios
         </button>
       </div>
    </section>

    <footer class="bg-gradient-to-b from-rose-50 to-rose-100 py-12 text-center pb-24">
       <div class="max-w-xs mx-auto w-full px-4 mb-8">
         <BotonAccion 
           texto="Confirmar Asistencia" 
           :icono="PhWhatsappLogo" 
           :url="`https://wa.me/${datos.contacto.whatsapp}`" 
           color="bg-[#25D366] text-white hover:brightness-110 shadow-lg shadow-green-200 rounded-full font-bold"
         />
       </div>
       <p class="text-[10px] text-rose-400 uppercase tracking-widest font-bold">Yupa Studio · Pastel Collection</p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-white/90 border border-rose-100 text-rose-500 backdrop-blur-md shadow-lg"
      colorIcono="text-rose-500 animate-pulse"
    />
    
    <ModalRegalos 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      colorAcento="text-rose-500" 
      colorBoton="bg-rose-500 hover:bg-rose-600 text-white"
    />

    <MenuNavegacion v-show="!modalAbierto && !galeriaAbierta" />
  </div>
</template>

<style>
body.scroll-pastel::-webkit-scrollbar { width: 12px; }
body.scroll-pastel::-webkit-scrollbar-track { background: #FFF5F5; }
body.scroll-pastel::-webkit-scrollbar-thumb { background-color: #FDA4AF; border-radius: 20px; border: 3px solid #FFF5F5; }

/* === EFECTO CONFETI === */
.confeti {
  position: absolute;
  top: -10%;
  opacity: 0;
  width: 12px;
  animation: caerConfeti linear infinite;
}

@keyframes caerConfeti {
  0% { transform: translateY(0) rotate(0deg) skew(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg) skew(20deg); opacity: 0; }
}

/* Variedad en movimiento */
.confeti:nth-child(even) { background-color: #FDA4AF; border-radius: 50%; width: 8px; height: 8px; } /* Círculos rosas */
.confeti:nth-child(odd) { background-color: #FDBA74; width: 6px; height: 10px; } /* Rectángulos naranjas */

/* Simulación de imagen (si usas imagen png, borra los background-color de arriba) */
.confeti:nth-child(1) { left: 5%; animation-duration: 5s; animation-delay: 0s; }
.confeti:nth-child(2) { left: 15%; animation-duration: 7s; animation-delay: 1s; }
.confeti:nth-child(3) { left: 25%; animation-duration: 6s; animation-delay: 2s; }
.confeti:nth-child(4) { left: 35%; animation-duration: 8s; animation-delay: 0.5s; }
.confeti:nth-child(5) { left: 45%; animation-duration: 5.5s; animation-delay: 3s; }
.confeti:nth-child(6) { left: 55%; animation-duration: 7.5s; animation-delay: 1.5s; }
.confeti:nth-child(7) { left: 65%; animation-duration: 6.5s; animation-delay: 4s; }
.confeti:nth-child(8) { left: 75%; animation-duration: 8.5s; animation-delay: 2.5s; }
.confeti:nth-child(9) { left: 85%; animation-duration: 5s; animation-delay: 0.2s; }
.confeti:nth-child(10) { left: 95%; animation-duration: 7s; animation-delay: 1s; }
/* ... puedes añadir más */
</style>