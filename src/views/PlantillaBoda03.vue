<script setup>
  import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift, PhLeaf } from '@phosphor-icons/vue' // Agregué PhLeaf
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
  
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
    // ... (copiar lógica) ...
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
    document.body.classList.add('scroll-boho')
    // ... (copiar observer) ...
    document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
    iniciarEfectoEscritura()
    const observer = new IntersectionObserver((entries) => {
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
    document.title = 'Yupa Studio' 
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
      <img 
        v-for="n in 12" 
        :key="n" 
        src="/assets/hoja-verde.png" 
        class="hoja absolute"
        alt="hoja cayendo"
      />
    </div>
    <div class="relative z-10 text-center bg-white/80 backdrop-blur-md p-8 rounded-t-[3rem] -mt-20 shadow-lg max-w-lg mx-auto border border-[#4A5D4F]/10">
          <p class="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#8A9A5B]">Save the Date</p>
          <h1 class="font-elegante text-6xl text-[#2C3E30] mb-2">{{ nombreMostrado }}</h1>
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

    <section class="py-8 bg-[#E8ECE9]">
       <CuentaRegresiva 
  :fechaObjetivo="datos.fecha" 
  colorCaja="bg-white border border-[#8A9A5B]/30"
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
            <BotonAccion texto="Ver Ubicación GPS" :icono="PhMapPin" :url="datos.ubicacion.linkGps" color="bg-[#4A5D4F] text-white" />
            <BotonAccion texto="Agendar Fecha" :icono="PhCalendarCheck" :url="datos.linkCalendario" color="bg-[#8A9A5B] text-white" />
         </div>

      </div>
   </div>
</section>

    <section v-if="esGold" class="bg-white py-12 rounded-3xl mx-4 shadow-sm my-10">
       <Cronograma 
  v-if="datos.agenda" 
  :eventos="datos.agenda" 
  colorTitulo="text-[#2C3E30]"
  colorLinea="border-[#8A9A5B]/40"
  colorPunto="bg-[#8A9A5B] border-[#FDFBF7]"
  colorCardBg="bg-white border-[#8A9A5B]/20"
  colorHora="text-[#8A9A5B]"
  colorIcono="text-[#8A9A5B]"
  colorTexto="text-[#4A5D4F]"
/>

       <div class="my-10 border-t border-dashed border-gray-200 w-1/2 mx-auto"></div>
       
<CodigoVestimenta 
  v-if="datos.vestimenta" 
  :tipo="datos.vestimenta.tipo" 
  :nota="datos.vestimenta.nota"
  
  colorFondo="bg-white"
  colorBorde="border-[#8A9A5B]/40"
  colorCirculo="bg-[#E8ECE9]"
  colorIcono="text-[#4A5D4F]"
  colorTitulo="text-[#2C3E30]"
  colorResalte="text-[#8A9A5B]"
  colorNotaBg="bg-[#FDFBF7] border border-[#8A9A5B]/20"
  colorNotaTexto="text-[#4A5D4F]"
/>

    </section>

<GaleriaFotos 
      v-if="esGold && datos.galeria" 
      :fotos="datos.galeria" 
      colorFondo="bg-[#FDFBF7]" 
      colorIcono="text-[#8A9A5B]"
      colorTitulo="text-[#2C3E30]"
      @cambioEstado="galeriaAbierta = $event"
    />

<SeccionPadrinos 
  v-if="esPremium && datos.cortejo" 
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

    <footer class="bg-[#2C3E30] text-[#E8ECE9] py-12 text-center rounded-t-[3rem] pb-24 ">
       <h2 class="font-elegante text-4xl mb-6">¡Te Esperamos!</h2>
       <div class="max-w-xs mx-auto w-full px-4">
       <BotonAccion 
          texto="Confirmar Asistencia" 
          :icono="PhWhatsappLogo" 
          :url="`https://wa.me/${datos.contacto.whatsapp}`" 
          color="bg-[#4A5D4F] text-white hover:bg-[#2C3E30]"
        />
       </div>
       <p class="text-[10px] mt-12 opacity-50 uppercase tracking-widest">Yupa Studio · Boho Collection</p>
    </footer>

    <ReproductorMusica 
  v-if="datos.musica" 
  :songUrl="datos.musica"
  colorBoton="bg-[#FDFBF7] border-[#8A9A5B]/50"
  colorIcono="text-[#8A9A5B]"
/>
    
    <ModalRegalos 
  :mostrar="modalAbierto" 
  :cuentas="datos.regalos" 
  @cerrar="modalAbierto = false"
  colorAcento="text-[#4A5D4F]" 
  colorBoton="bg-[#4A5D4F]"
/>

    <MenuNavegacion v-show="!modalAbierto && !galeriaAbierta" />
  </div>
</template>

<style scoped>
.icon-draw path, .icon-draw line { stroke-dasharray: 1000; stroke-dashoffset: 1000; opacity: 0; transition: opacity 0.5s; }
.icon-draw.visible path, .icon-draw.visible line { opacity: 1; animation: dibujar 2s ease-out forwards; }
@keyframes dibujar { to { stroke-dashoffset: 0; } }
</style>

<style>
body.scroll-boho::-webkit-scrollbar { width: 12px; }
body.scroll-boho::-webkit-scrollbar-track { background: #FDFBF7; }
body.scroll-boho::-webkit-scrollbar-thumb { background-color: #8A9A5B; border-radius: 20px; border: 3px solid #FDFBF7; }

/* === ESTILOS PARA LAS HOJAS === */
.hoja {
  position: absolute;
  top: -15%; /* Empiezan fuera de la pantalla arriba */
  opacity: 0;
  animation: caerHoja linear infinite;
  /* No necesitamos z-index aquí porque lo tiene el contenedor padre */
}

/* Keyframes: Define cómo se mueven (caen y rotan) */
@keyframes caerHoja {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.9; } /* Aparecen rápido */
  90% { opacity: 0.7; }
  100% { transform: translateY(90vh) rotate(360deg) translateX(40px); opacity: 0; } /* Caen hasta el 90% de la altura */
}

/* Personalización de cada una de las 12 hojas para que se vea natural */
/* Variamos posición inicial (left), velocidad (duration), retraso (delay) y tamaño (width) */
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