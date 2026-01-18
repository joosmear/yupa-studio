<script setup>
  import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, PhHeart } from '@phosphor-icons/vue'
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

  const props = defineProps({
    datos: {
      type: Object,
      required: true
    }
  })

  const galeriaAbierta = ref(false)

  const modalAbierto = ref(false)

  const esGold = computed(() => {
    return ['gold', 'premium'].includes(props.datos.plan)
  })
  const esPremium = computed(() => {
    return props.datos.plan === 'premium'
  })

  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

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
    document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
    document.body.classList.add('scroll-clasico') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-clasico')
    document.title = 'Yupa Studio | Invitaciones Digitales'
  })
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 overflow-x-hidden">

    <header class="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="datos.fotoPortada" class="w-full h-full object-cover grayscale-[30%] brightness-[0.85]" />
      </div>

      <div class="petalos-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <img v-for="n in 12" :key="n" src="/assets/petalo.png" class="petalo absolute"alt="pétalo"/>
      </div>

      <div class="relative z-20 text-white space-y-6 px-4">
        <p class="uppercase tracking-[0.5em] text-xs md:text-sm opacity-90 animate-fade-in-up">
          Nos casamos
        </p>
        <h1 class="font-elegante text-5xl md:text-7xl lg:text-8xl drop-shadow-lg min-h-[1.2em]">
          {{ nombreMostrado }}<span v-if="cursorVisible" class="font-light">|</span>
        </h1>
        <div class="animate-fade-in-up delay-500">
          <p class="text-lg md:text-xl font-light tracking-widest border-t border-b border-white/30 py-2 inline-block px-8 backdrop-blur-sm">
            {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-10 z-20 animate-bounce">
        <div class="w-[1px] h-12 bg-white/50 mx-auto"></div>
      </div>
    </header>

    <section class="py-16 px-6 max-w-2xl mx-auto text-center space-y-8">
      <p class="font-elegante text-xl italic text-stone-600 leading-relaxed">
        "{{ datos.frase }}"
      </p>
      
      <div class="py-8">
        <p class="uppercase tracking-widest text-xs font-bold mb-6 text-stone-400">Solo faltan</p>
        <CuentaRegresiva :fechaObjetivo="datos.fecha" />
      </div>
    </section>

    <section class="py-16 bg-white shadow-inner">
      <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div class="rounded-t-full overflow-hidden border-4 border-stone-100 shadow-xl h-96">
          <img :src="datos.fotoSegunda" class="w-full h-full object-cover" alt="Pareja">
        </div>

        <div class="space-y-6 text-center md:text-left">
          <h2 class="font-elegante text-3xl text-rose-600">Ceremonia Religiosa</h2>
          <p class="text-stone-600 mb-2">
            Acompáñanos a celebrar nuestro enlace matrimonial, que se llevará a cabo en:
          </p>
          
          <div class="flex flex-col md:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
     <PhMapPin :size="32" weight="thin" class="text-rose-600 shrink-0" />
     
     <div class="text-stone-600">
        <strong class="block text-lg text-stone-800 leading-tight">
          {{ datos.ubicacion.nombreLugar }}
        </strong>
        <span class="text-sm opacity-80">{{ datos.ubicacion.direccion }}</span>
     </div>
  </div>

  <div class="flex flex-col md:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
     <PhCalendarCheck :size="32" weight="thin" class="text-rose-600 shrink-0" />
     
     <div class="text-stone-600">
        <strong class="block text-lg text-stone-800 leading-tight capitalize">
          {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
        </strong>
        <span class="text-sm opacity-80">
          Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
        </span>
     </div>
  </div>

          <div class="flex flex-col gap-3">
            <BotonAccion 
              texto="Ver Ubicación GPS" 
              :icono="PhMapPin" 
              :url="datos.ubicacion.linkGps" 
              color="bg-stone-800"
            />
            <BotonAccion 
              texto="Agendar Fecha" 
              :icono="PhCalendarCheck" 
              :url="datos.linkCalendario" 
              color="bg-rose-600"
            />
          </div>
        </div>
      </div>
    </section>

    <section v-if="esGold" class="bg-white py-10">
      
      <Cronograma 
        v-if="datos.agenda" 
        :eventos="datos.agenda" 
      />

      <CodigoVestimenta 
        v-if="datos.vestimenta" 
        :tipo="datos.vestimenta.tipo" 
        :nota="datos.vestimenta.nota" 
      />
    </section>

    <GaleriaFotos
      v-if="esGold && datos.galeria" 
      :fotos="datos.galeria"
      @cambioEstado="galeriaAbierta = $event"
    />

    <SeccionPadrinos 
      v-if="esPremium && datos.cortejo" 
      :padrinos="datos.cortejo" 
    />

    <section class="py-24 px-4 bg-stone-50">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden relative">
        
        <div class="h-2 w-full bg-rose-600"></div>

        <div class="p-8 md:p-10">
          <div class="border-2 border-dashed border-rose-200 rounded-lg p-6 space-y-8 relative">
            
            <div class="text-center space-y-4">
              <div class="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
                <PhGift :size="48" weight="thin" />
              </div>

              <h3 class="font-elegante text-3xl text-stone-800">Regalo de Bodas</h3>
              
              <p class="text-stone-500 text-sm leading-relaxed px-2">
                Su presencia es nuestro mayor regalo. Si desean tener un detalle con nosotros, ponemos a su disposición:
              </p>

              <button
                @click="modalAbierto = true"
                class="px-6 py-2 border border-rose-400 text-rose-600 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-rose-50 transition-colors mt-2"
              >
                Ver Datos Bancarios
              </button>
            </div>

            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-rose-100"></div>
              <span class="flex-shrink-0 mx-4 text-rose-300">
                 <PhHeart :size="20" weight="fill" />
              </span>
              <div class="flex-grow border-t border-rose-100"></div>
            </div>

            <div class="text-center space-y-4">
              <h3 class="font-elegante text-3xl text-stone-800">Confirmación</h3>
              
              <p class="text-stone-500 text-sm">
                Agradecemos confirmar su asistencia antes del:
                <br>
                <span class="font-bold text-rose-600 text-lg">
                  {{ new Date(new Date(datos.fecha).setMonth(new Date(datos.fecha).getMonth() - 1)).toLocaleDateString('es-BO', { day: 'numeric', month: 'long' }) }}
                </span>
              </p>
              
              <div class="pt-2">
                <BotonAccion 
                  texto="Confirmar Asistencia" 
                  :icono="PhWhatsappLogo" 
                  :url="`https://wa.me/${datos.contacto.whatsapp}`" 
                  color="bg-rose-600 text-white hover:bg-rose-700 w-full shadow-lg shadow-rose-200"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <footer class="bg-stone-900 text-stone-400 py-8 text-center text-xs pb-24">
      <p>Invitación creada con ❤️ por <span class="text-white font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica :songUrl="datos.musica" />

    <ModalRegalos 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
    />

  </div>

    <MenuNavegacion v-show="!modalAbierto && !galeriaAbierta" />
</template>

<style scoped>
.petalo {
  position: absolute;
  top: -15%;
  opacity: 0;
  animation: caer linear infinite;
  z-index: 10;
}
.petalo:nth-child(1) { left: 10%; animation-duration: 8s; animation-delay: 0s; width: 20px; }
.petalo:nth-child(2) { left: 20%; animation-duration: 12s; animation-delay: 2s; width: 35px; filter: blur(1.5px); }
.petalo:nth-child(3) { left: 70%; animation-duration: 10s; animation-delay: 4s; width: 28px;}
.petalo:nth-child(4) { left: 40%; animation-duration: 15s; animation-delay: 1s; width: 15px; filter: blur(0.5px);}
.petalo:nth-child(5) { left: 85%; animation-duration: 9s; animation-delay: 3s; width: 30px; filter: blur(2px);}
.petalo:nth-child(6) { left: 5%; animation-duration: 11s; animation-delay: 5s; width: 22px;}
.petalo:nth-child(7) { left: 50%; animation-duration: 13s; animation-delay: 7s; width: 18px; opacity: 0.8}
.petalo:nth-child(8) { left: 95%; animation-duration: 7s; animation-delay: 1.5s; width: 25px;}
.petalo:nth-child(9) { left: 30%; animation-duration: 14s; animation-delay: 6s; width: 38px; filter: blur(3px);}
.petalo:nth-child(10) { left: 60%; animation-duration: 9.5s; animation-delay: 2.5s; width: 24px;}
.petalo:nth-child(11) { left: 15%; animation-duration: 10s; animation-delay: 8s; width: 16px;}
.petalo:nth-child(12) { left: 75%; animation-duration: 12.5s; animation-delay: 0.5s; width: 28px; filter: blur(1px);}
/* --- Animation --- */
@keyframes caer {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: translateY(110vh) rotate(360deg) translateX(50px); opacity: 0; }
}
</style>

<style>
body.scroll-clasico::-webkit-scrollbar { width: 12px; }
body.scroll-clasico::-webkit-scrollbar-track { background: #ffffff; }
body.scroll-clasico::-webkit-scrollbar-thumb { background-color: #fb7185; border-radius: 20px; border: 3px solid #ffffff; }
</style>